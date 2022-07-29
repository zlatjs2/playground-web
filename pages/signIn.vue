<template>
  <div>
    <atoms-base-typorgraphy component="h2" variant="title4" getter-bottom>
      로그인
    </atoms-base-typorgraphy>
    <form>
      <molecules-text-field
        v-model="email"
        placeholder="이메일"
        getter-bottom
      />
      <molecules-text-field
        v-model="password"
        type="password"
        placeholder="비밀번호"
        getter-bottom
      />
      <atoms-base-button
        color="primary"
        variant="contained"
        is-full-width
        getter-bottom
        @click="signInWithEmail"
      >
        로그인
      </atoms-base-button>
    </form>

    <div class="signin-etc">
      <atoms-base-link to="/signup" color="secondary">
        회원가입
      </atoms-base-link>
      <atoms-base-link to="/member/find-password" color="secondary">
        비밀번호 찾기
      </atoms-base-link>
    </div>

    <div class="sns-title-bar">
      <atoms-base-divider />
      <atoms-base-typorgraphy
        component="span"
        variant="body2"
        align="center"
        color="secondary"
      >
        SNS 계정으로 로그인
      </atoms-base-typorgraphy>
      <atoms-base-divider />
    </div>
    <section class="sns-group">
      <button type="button" @click="signInWithKakao2">1111</button>

      <button
        id="naverIdLogin"
        type="button"
        class="sns-btn sns-btn__naver"
        @click="signInWithNaver"
      ></button>

      <button
        id="kakao-talk-channel-chat-button"
        type="button"
        class="sns-btn sns-btn__kakao"
        @click="signInWithKakao"
      ></button>

      <button
        type="button"
        class="sns-btn sns-btn__google"
        @click="signInWithGoogle"
      ></button>
    </section>
  </div>
</template>

<script>
// import authMixin from '@/mixins/auth.js'
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithRedirect,
  getAuth,
  getRedirectResult,
} from 'firebase/auth'

export default {
  name: 'SigninPage',
  // mixins: [authMixin],
  layout: 'memberLayout',
  async asyncData({ $axios, $cookiz, $fire, query, redirect }) {
    console.log('### query:', query)

    if (query.code) {
      const company = query.state ? 'naver' : 'kakao'
      console.log('### company:', company)

      try {
        const response = await $axios.post(
          `${process.env.API_HOST}/${company}-auth`,
          {
            code: query.code,
            state: query.state,
          },
        )

        console.log('### 1:', response)

        if (response.status === 200) {
          const { body } = response.data
          const infos = await $fire.auth.signInWithCustomToken(body)

          $cookiz.set(`firebase:${company}`, infos.user)
          redirect('/')
        }
      } catch (error) {
        console.warn('### 에러:', error)
      }
    }
  },
  data() {
    return {
      email: 'admin@gmail.com',
      password: '123456',
      checked: false,
    }
  },
  mounted() {
    console.log('### this.$config:', this.$config)
    console.log('### this.$route.query:', this.$route.query)
  },
  methods: {
    signInWithKakao() {
      const { kakaoRestApiKey, redirectUrl } = this.$config
      const baseUrl = 'https://kauth.kakao.com/oauth/authorize'

      window.location.href = `${baseUrl}?client_id=${kakaoRestApiKey}&redirect_uri=${redirectUrl}&response_type=code`
    },
    signInWithNaver() {
      const { naverClientId, redirectUrl } = this.$config
      const baseUrl = 'https://nid.naver.com/oauth2.0/authorize'

      window.location.href = `${baseUrl}?response_type=code&client_id=${naverClientId}&redirect_uri=${redirectUrl}&state=RAMDOM_STATE`
    },
    signInWithGoogle() {
      const { auth } = this.$fire
      const provider = new GoogleAuthProvider()

      auth
        .signInWithPopup(provider)
        .then(res => {
          console.log('### 1:', 1)

          this.$cookiz.set(`firebase:google`, res.user)
          this.$router.push('/')
        })
        .catch(err => console.log('### err:', err))
    },
    signInWithEmail() {
      console.log('### 준비중:')
    },
    signInWithKakao2() {
      console.log('### 1:', OAuthProvider)
      const provider = new OAuthProvider('oidc.kakao')

      provider.setCustomParameters({
        login_hint: 'user@example.com',
      })

      console.log('### provider:', provider)

      const auth = getAuth()
      // signInWithRedirect(auth, provider)
      console.log('### getRedirectResult:', getRedirectResult)

      signInWithRedirect(auth, provider)
        .then(result => {
          // User is signed in.
          // IdP data available in result.additionalUserInfo.profile.

          // Get the OAuth access token and ID Token
          const credential = OAuthProvider.credentialFromResult(result)
          const accessToken = credential.accessToken
          const idToken = credential.idToken

          console.log('### accessToken, idToken:', accessToken, idToken)
        })
        .catch(error => {
          // Handle error.
          console.log('### error:', error)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.signin-etc {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
}

.sns-title-bar {
  margin: $spacing * 6 0 $spacing * 2;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  .base-typorgraphy {
    flex-grow: 1;
  }
  .base-divider {
    width: 25%;
  }
}
.sns-group {
  text-align: center;
  font-size: 0;
}
.sns-btn {
  margin: 0 $spacing;
  width: 64px;
  height: 64px;
  padding: 0;
  border-radius: 50%;
  overflow: hidden;
  background-repeat: no-repeat;

  &__naver {
    background-image: url('@/assets/images/common/btn__signin-naver.png');
    background-position: 0 center;
    background-size: auto 64px;
  }
  &__kakao {
    background-color: #fee500;
    background-image: url('@/assets/images/common/btn__signin-kakao.png');
    background-size: auto 68px;
    background-position: -2px center;
  }
  &__google {
    background-color: $common-white;
    background-image: url('@/assets/images/common/btn__signin-google.png');
    background-size: auto 78px;
    background-position: -7px center;
  }
}
</style>
