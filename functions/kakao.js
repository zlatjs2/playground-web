const functions = require('firebase-functions')
const admin = require('firebase-admin')
const axios = require('axios')

const cors = require('cors')({
  origin: true,
})

const { KAKAO_REST_API_KEY, KAKAO_SECRET_KEY, REDIRECT_HOST } = process.env

/**
 * 프론트에서 인가코드를 넘겨 받아 AccessToken을 요청
 * @param  {String} code 프론트에서 넘겨받는 코드값
 * @return {Promiise<Response>}
 */
function requestAccessToken(code) {
  const API_URL = 'https://kauth.kakao.com/oauth/token'
  const url = `${API_URL}?grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_HOST}&client_secret=${KAKAO_SECRET_KEY}&code=${code}`
  const headers = {
    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  }

  return axios.post(url, { headers })
}

/**
 * 파이어베이스 Admin으로 AccessToken을 반환
 * @param  {String} accessToken
 * @return {Promise<String>}
 */
function createFirebaseToken(accessToken) {
  return requestMe(accessToken)
    .then(response => {
      const userId = `kakao:${response.data.id}`
      if (!userId) {
        return response
          .status(404)
          .send({ message: '주어진 액세스 토큰을 가진 사용자가 없습니다.' })
      }

      let nickName = null
      let profileImage = null

      if (response.data.properties) {
        const { nickname, profile_image } = response.data.properties
        nickName = nickname
        profileImage = profile_image
      }

      return updateOrCreateUser(
        userId,
        response.data.kaccount_email,
        nickName,
        profileImage,
      )
    })
    .then(result => {
      return admin.auth().createCustomToken(result.uid, { provider: 'KAKAO' })
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
    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    Authorization: 'Bearer ' + accessToken,
  }

  return axios.get('https://kapi.kakao.com/v2/user/me?secure_resource=true', {
    headers,
  })
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
    provider: 'KAKAO',
    displayName: displayName || email,
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
    console.log('### req.body:', req.body.code)

    if (!code) {
      return res.status(400).send({
        error: '토큰이 없습니다.',
        message: '액세스 토큰은 필수 매개변수입니다.',
      })
    }

    return requestAccessToken(code)
      .then(response => {
        const accessToken = response.data.access_token
        return createFirebaseToken(accessToken)
      })
      .then(jwtToken => {
        return res.status(200).json({
          body: jwtToken,
        })
      })
      .catch(error => {
        if (error.response) {
          return res.status(error.response.status).send(error.response.data)
        }
        return res.status(500).send({ message: 'Server Error.' })
      })
  }),
)
