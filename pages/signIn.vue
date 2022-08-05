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
import { mapState } from 'vuex'
import { GoogleAuthProvider } from 'firebase/auth'

export default {
  name: 'SigninPage',
  layout: 'memberLayout',
  middleware({ store, redirect }) {
    const { userInfo } = store.state
    console.log('### 로그인 컴포넌트:', userInfo)

    if (userInfo) {
      redirect('/')
    }
  },
  async asyncData({ $axios, store, query }) {
    if (query.code) {
      const company = query.state ? 'naver' : 'kakao'

      try {
        const response = await $axios.post(
          `${process.env.API_HOST}/${company}-auth`,
          {
            code: query.code,
            state: query.state,
          },
        )
        if (response.status === 200) {
          store.dispatch('SET_TOKEN', response.data.body)
          return {
            company,
            // token: response.data.body,
          }
        }
      } catch (error) {
        console.log('### error:', error)
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
  async mounted() {
    console.log('### this.token:', this.token)

    if (this.token) {
      try {
        const infos = await this.$fire.auth.signInWithCustomToken(this.token)
        console.log('### infos.data:', infos)
        this.$cookiz.set(`firebase:${this.company}`, infos.user)
        this.$router.push('/')
      } catch (error) {
        console.warn('### 에러:', error)
      }
    }
  },
  computed: {
    ...mapState(['token']),
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
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider()

      try {
        const infos = await this.$fire.auth.signInWithPopup(provider)
        this.$cookiz.set(`firebase:google`, infos.user)
        this.$router.push('/')
      } catch (error) {
        console.log('### error:', error)
      }
    },
    signInWithEmail() {
      console.log('### 준비중:')
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
