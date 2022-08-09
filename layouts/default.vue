<template>
  <div class="app-wrapper">
    <header class="app-header">
      <section class="app-header__content">
        <atoms-base-typorgraphy
          v-if="$route.name === 'index'"
          component="h1"
          variant="h1"
        >
          <svg width="100px" viewBox="0 0 362 51">
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
              font-family="GmarketSansBold, Gmarket Sans"
              font-size="60"
              font-weight="bold"
              line-spacing="58"
            >
              <g
                id="Header"
                transform="translate(-1647.000000, -82.000000)"
                fill="#101010"
              >
                <text id="APP-NAME">
                  <tspan x="1647" y="128">APP NAME</tspan>
                </text>
              </g>
            </g>
          </svg>
        </atoms-base-typorgraphy>

        <atoms-base-typorgraphy v-else component="h2" variant="body1">
          공지사항
        </atoms-base-typorgraphy>

        <atoms-base-button variant="text" @click="signOut">
          로그아웃
          <!-- <atoms-base-icon name="menu" color="primary" size="20" /> -->
        </atoms-base-button>

        <atoms-base-button variant="text" @click="onDrawer">
          <atoms-base-icon name="menu" color="primary" size="20" />
        </atoms-base-button>
      </section>
    </header>
    <main class="app-container">
      <article class="app-content">
        <Nuxt />
      </article>
    </main>
    <footer class="app-footer">
      <section class="app-footer__content">
        <atoms-base-typorgraphy component="h1" variant="h1">
          <svg
            width="80px"
            viewBox="0 0 362 51"
            :style="{ marginBottom: 8 + 'px' }"
          >
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
              font-family="GmarketSansBold, Gmarket Sans"
              font-size="60"
              font-weight="bold"
            >
              <g transform="translate(-1647.000000, -82.000000)" fill="grey">
                <text id="APP-NAME">
                  <tspan x="1647" y="128">APP NAME</tspan>
                </text>
              </g>
            </g>
          </svg>
        </atoms-base-typorgraphy>

        <atoms-base-typorgraphy
          component="div"
          variant="caption"
          color="secondary"
        >
          (주) 앱 서비스명 | 대표이사 : 홍길동 | 사업자 등록번호 : 000-000-9999
          | 통신판매업신고 : 강남-12345호 | 메일 : help@app-name.com 관광사업자
          등록번호 : 제2022-00호 | 주소 : 서울 중구 어딘가로 | 호스팅서비스
          제공자 : 앱 서비스명 고객센터 : 1234-1234 (오전 10시 - 오후 5시)
        </atoms-base-typorgraphy>
      </section>
    </footer>

    <molecules-app-drawer :is-show="isDrawer" @close="onDrawer">
      <template #content>
        <organisms-user-info />
        <section>
          <molecules-accordion-menu :items="items" />
        </section>

        <section>
          <molecules-accordion-menu :items="etcItems" />
        </section>
      </template>

      <template #footer>
        <atoms-base-typorgraphy
          component="span"
          variant="caption"
          color="secondary"
        >
          문의하기
        </atoms-base-typorgraphy>
        <atoms-base-typorgraphy
          component="span"
          variant="caption"
          color="secondary"
        >
          로그아웃
        </atoms-base-typorgraphy>
      </template>
    </molecules-app-drawer>
    <atoms-base-dimmed v-if="isPending" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DefaultLayout',
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      isPending: state => state.common.isPending,
    }),
  },
  watch: {
    userInfo(state) {
      if (!state) {
        this.$router.push('/signin')
      }
    },
  },
  methods: {
    onDrawer() {
      this.isDrawer = !this.isDrawer
    },
    signOut() {
      const { kakaoRestApiKey, redirectUrl } = this.$config
      const { uid } = this.userInfo
      const providerId = uid.includes('kakao')
        ? 'kakao'
        : uid.includes('naver')
        ? 'naver'
        : 'google'

      if (providerId === 'kakao') {
        const baseUrl = 'https://kauth.kakao.com/oauth/logout'
        window.location.href = `${baseUrl}?client_id=${kakaoRestApiKey}&logout_redirect_uri=${redirectUrl}`
      } else if (providerId === 'google') {
        this.$fire.auth.signOut()
      }
      console.log('### providerId:', providerId)

      this.$cookiz.remove('__session')
      this.$store.dispatch('FETCH_USER', null)
      this.$store.dispatch('SET_TOKEN', null)
    },
  },
  data() {
    return {
      isDrawer: false,
      items: [
        {
          text: '공지사항',
          link: '/board/notice',
        },
        {
          text: '자주묻는질문',
          link: '/board/qna',
        },
        {
          text: '설정',
          link: '/member/setting',
        },
        {
          text: '카카오톡 1:1 문의',
          link: '/',
        },
      ],
      etcItems: [
        {
          text: '개인정보처리방침',
          link: '/policy/privacy',
        },
        {
          text: '서비스 이용약관',
          link: '/policy/service',
        },
        {
          text: '위치정보 이용약관',
          link: '/policy/location',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid $divider;
  background-color: $common-white;
  &__content {
    display: flex;
    align-items: center;
    align-content: center;
    padding: 0 $spacing;
    min-height: 58px;
    .base-typorgraphy {
      flex-grow: 1;
      margin: 0 $spacing;
    }
    .base-typorgraphy--body1 {
      font-weight: 700;
    }
  }
}
.app-container {
  padding-top: 58px;
}
.app-content {
  min-height: calc(100vh - (56px + 155px));
  background-color: $common-white;
}
.app-footer {
  &__content {
    padding: $spacing * 2;
  }
}
</style>
