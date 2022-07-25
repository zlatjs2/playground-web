// 필수 모듈 가져오기 및 앱 초기화
const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert(
    './vangvang-log-dev-firebase-adminsdk-af2lq-35cde54295.json',
  ),
  databaseURL: '',
})

// env 파일 사용을 위한 모듈 추가
const dotenv = require('dotenv')
dotenv.config()

// Nuxt App 실행 함수
const functions = require('firebase-functions')
const { Nuxt } = require('nuxt-start')
const nuxtConfig = require('./nuxt.config.js')
const config = {
  ...nuxtConfig,
  dev: false,
  buildDir: 'nuxt',
}
const nuxt = new Nuxt(config)

// 공통 기능별 함수 가져오기
const kakao = require('./kakao.js')
const naver = require('./naver.js')

module.exports = {
  kakao,
  naver,
  ssrapp: functions.https.onRequest(async (req, res) => {
    await nuxt.ready()
    nuxt.render(req, res)
  }),
}
