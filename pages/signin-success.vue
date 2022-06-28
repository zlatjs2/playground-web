<!-- <template>
  <div>login success...</div>
</template>

<script>
import authMixin from '@/mixins/auth.js'

export default {
  name: 'SigninSuccess',
  mixins: [authMixin],
  layout: 'memberLayout',
  async asyncData({ $axios, query }) {
    if (query.code) {
      try {
        const baseUrl = 'https://kauth.kakao.com/oauth'
        const url = '/token'
        const params = {
          grant_type: 'authorization_code',
          client_id: '7f4160adbeb53a4dfe36903119b13966',
          redirect_url: process.env.VUE_APP_REDIRECT_HOST,
          code: query.code,
        }

        const response = await $axios.$post(
          `${baseUrl}${url}?grant_type=${params.grant_type}&client_id=${params.client_id}&redirect_url=${params.redirect_url}&code=${params.code}`,
        )

        const config = {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            Authorization: `Bearer ${response.access_token}`,
          },
        }
        console.log('### config:', config)

        console.log('### response:', response)

        return {
          accessToken: response.access_token,
        }
      } catch (error) {
        console.log('### error.response:', error.response)
      }
    }
  },
  data() {
    return {
      accessToken: null,
    }
  },
  mounted() {
    console.log('### this.accessToken:', this.accessToken)

    window.Kakao.Auth.setAccessToken(this.accessToken)

    window.Kakao.API.request({
      url: '/v1/user/update_profile',
      data: {
        // properties: {
        //   '${CUSTOM_PROPERTY_KEY}': '${CUSTOM_PROPERTY_VALUE}',
        // },
      },
      success(response) {
        console.log(response)
      },
      fail(error) {
        console.log(error)
      },
    })
  },
}
</script>

<style></style> -->
