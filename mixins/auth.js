export default {
  data() {
    return {
      naverLogin: null,
    }
  },
  mounted() {
    // 카카오 로그인 초기화
    this.initialSigninKakao()
    this.watchStateKakao()

    // 네이버 로그인 초기화
    this.initialSigninNaver()
    this.watchStateNaver()
  },
  methods: {
    initialSigninNaver() {
      this.naverLogin = new window.naver.LoginWithNaverId({
        clientId: process.env.VUE_APP_NAVER_CLIENT_ID,
        callbackUrl: `${window.location.origin}/signin-success`,
      })
      this.naverLogin.init()
    },
    watchStateNaver() {
      this.naverLogin.getLoginStatus(status => {
        if (status) {
          const { user } = this.naverLogin
          const params = {
            name: user.name,
            nickName: user.nickname,
            email: user.email,
            profileImage: user.profile_image,
            user,
          }
          this.$store.dispatch('common/setUserInfo', params)
          this.$router.push('/')
        }
      })
    },
    initialSigninKakao() {
      window.Kakao.init(process.env.VUE_APP_KAKAO_CLIENT_ID)
    },
    watchStateKakao() {
      console.log('### 222:', 222)

      const _this = this
      window.Kakao.API.request({
        url: '/v2/user/me',
        success(response) {
          const { properties } = response
          const params = {
            // name: properties.name,
            nickName: properties.nickname,
            // email: properties.email,
            profileImage: properties.profile_image,
            properties,
          }
          _this.$store.dispatch('common/setUserInfo', params)
          _this.$router.push('/')
        },
        fail(error) {
          console.log('### error: ', error)
        },
      })
    },
  },
}
