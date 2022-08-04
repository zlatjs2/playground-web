require('dotenv').config()

module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'playground-web',
    htmlAttrs: {
      lang: 'ko',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      // { src: 'https://developers.kakao.com/sdk/js/kakao.js' },
      { src: 'https://developers.kakao.com/sdk/js/kakao.min.js' },
      {
        hid: 'maps-googleapis',
        src: `https://maps.googleapis.com/maps/api/js?v=weekly&key=${process.env.FIREBASE_API_KEY}&libraries=places`,
        defer: true,
      },
    ],
  },

  // 프론트엔드에 노출되는 환경 변수
  publicRuntimeConfig: {
    appHost: process.env.APP_HOST,
    apiHost: process.env.API_HOST,
    redirectUrl: process.env.REDIRECT_HOST,
    naverClientId: process.env.NAVER_CLIENT_ID,
    naverSecretKey: process.env.NAVER_SECRET_KEY,
    kakaoRestApiKey: process.env.KAKAO_REST_API_KEY,
    kakaoSecretKey: process.env.KAKAO_SECRET_KEY,
  },
  // 프론트엔드에 노출되지 않는 환경 변수
  privateRuntimeConfig: {},

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/index.scss'],
  styleResources: {
    scss: '@/assets/scss/index.scss',
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '@/plugins/axios' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
  ],

  firebase: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
    services: {
      auth: true,
      firestore: true,
      functions: true,
      storage: true,
      database: true,
      analytics: true,
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
