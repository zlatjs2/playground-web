const functions = require('firebase-functions')
const admin = require('firebase-admin')
const axios = require('axios')

const cors = require('cors')({
  origin: true,
})

// 상수 선언
const { NAVER_CLIENT_ID, NAVER_SECRET_KEY, REDIRECT_HOST } = process.env

/**
 * 파이어베이스 Admin으로 AccessToken을 반환
 * @param  {String} accessToken
 * @return {Promise<String>}
 */
function createFirebaseToken(accessToken) {
  return requestMe(accessToken)
    .then(response => {
      const userId = `naver:${response.data.response.id}`
      if (!userId) {
        return response
          .status(404)
          .send({ message: '주어진 액세스 토큰을 가진 사용자가 없습니다.' })
      }

      const { email, nickname, profile_image } = response.data.response
      return updateOrCreateUser(userId, email, nickname, profile_image)
    })
    .then(result => {
      return admin.auth().createCustomToken(result.uid, { provider: 'NAVER' })
    })
    .then(userToken => userToken)
    .catch(error => console.log('### error: ', error))
}

/**
 * 사용자 프로필 가져오기
 * @param  {String} accessToken
 * @return {Promiise<Response>}
 */
function requestMe(accessToken) {
  const headers = {
    Authorization: 'Bearer ' + accessToken,
    'X-Naver-Client-Id': NAVER_CLIENT_ID,
    'X-Naver-Client-Secret': NAVER_SECRET_KEY,
  }

  return axios.get('https://openapi.naver.com/v1/nid/me', { headers })
}

/**
 * 사용자 업데이트 or 생성
 * @param  {String} userId        사용자 UID
 * @param  {String} email         사용자 이메일
 * @param  {String} displayName   사용자 닉네임
 * @param  {String} photoURL      사용자 프로필 이미지
 * @return {Prommise<UserRecord>}
 */
function updateOrCreateUser(userId, email, displayName, photoURL) {
  const updateParams = {
    provider: 'NAVER',
    displayName,
    photoURL,
  }

  return admin
    .auth()
    .updateUser(userId, updateParams)
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        updateParams.uid = userId
        if (email) {
          updateParams.email = email
        }
        return admin.auth().createUser(updateParams)
      }
      throw error
    })
}

exports.auth = functions.https.onRequest((req, res) =>
  cors(req, res, function () {
    const code = req.body.code
    const state = req.body.state
    const url =
      'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' +
      NAVER_CLIENT_ID +
      '&client_secret=' +
      NAVER_SECRET_KEY +
      '&redirect_uri=' +
      REDIRECT_HOST +
      '&code=' +
      code +
      '&state=' +
      state
    const headers = {
      'X-Naver-Client-Id': NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': NAVER_SECRET_KEY,
    }

    if (!code) {
      return res.status(400).send({
        error: '토큰이 없습니다.',
        message: '액세스 토큰은 필수 매개변수입니다.',
      })
    }

    return axios
      .post(url, { headers })
      .then(response => {
        if (!response.data.access_token)
          return res.status(400).json({
            data: response.data,
          })
        const accessToken = response.data.access_token
        return createFirebaseToken(accessToken)
      })
      .then(jwtToken => {
        return res.status(200).json({
          body: jwtToken,
        })
      })
      .catch(error => {
        console.log('### error:', error)
        return res.status(500).send({ message: 'Server Error.' })
      })
  }),
)
