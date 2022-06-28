<template>
  <div>
    <atoms-base-typorgraphy component="h2" variant="title4" getter-bottom>
      로그인
    </atoms-base-typorgraphy>
    <form @submit="onSubmit">
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
        @click="signinNaver"
      ></button>

      <button
        id="kakao-talk-channel-chat-button"
        type="button"
        class="sns-btn sns-btn__kakao"
        @click="signInKakao"
      ></button>

      <button type="button" class="sns-btn sns-btn__google"></button>
    </section>
  </div>
</template>

<script>
import authMixin from '@/mixins/auth.js'

export default {
  name: 'SignIn',
  mixins: [authMixin],
  layout: 'memberLayout',
  data() {
    return {
      email: '',
      password: '',
      checked: false,
    }
  },
  mounted() {
    console.log('### :', this.$store.state)
  },
  methods: {
    onSubmit() {
      console.log('### 1:', 1)
    },
    signinNaver() {
      this.naverLogin.reprompt()
    },
    signInKakao() {
      const _this = this
      window.Kakao.Auth.login({
        success(response) {
          console.log('### response:', response)
          _this.watchStateKakao()
        },
        fail(error) {
          console.log(error)
        },
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
