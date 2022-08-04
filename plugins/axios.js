/**
  @description 요청 또는 응답 및 API통신시 error 등 핸들링 할 수 있는 기능을 전역 환경으로 세팅
*/
export default ({ $axios, store, redirect, error }) => {
  /*
    @description axios 기본값 세팅
  */
  // $axios.setBaseURL(process.env.VUE_APP_API_HOST)
  // $axios.setHeader('Content-type', 'application/json; charset=utf-8')
  // $axios.setHeader('Access-Control-Allow-Origin', '*')
  // $axios.setHeader(
  //   'Access-Control-Allow-Methods',
  //   'GET, POST, OPTIONS, PUT, DELETE',
  // )

  // res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })

  // $axios.setHeader(
  //   'Access-Control-Allow-Headers',
  //   'Origin, Content-Type, Authorization',
  // )
  // $axios.setToken(route.query.token, 'Bearer')

  /**
  @description 요청시 상황에 따라 로직 작성
*/
  $axios.onRequest(config => {
    console.log('### 요청 :')

    store.dispatch('common/SET_PENDING', true)
    return config
  })

  $axios.onResponse(response => {
    console.log('### 응답 :')
    store.dispatch('common/SET_PENDING', false)
    return response
  })

  /**
    @description 에러시 상태에 따라 로직 작성
    @todo 인터셉트 하는경우, 오류 전파 방지를 위해 resolved promise를 반환
  */
  $axios.onError(error => {
    store.dispatch('common/SET_PENDING', false)
    const statusCode = parseInt(error.response && error.response.status)
    console.log('### statusCode:', statusCode)

    if (statusCode === 404 || statusCode === 500) {
      const { message } = error.response.data
      error({ statusCode, message })
    } else if (statusCode === 400) {
      console.log('### 400 에러임:', error.response.data)

      store.dispatch('common/SET_SNACKBAR', error.response.data)
    } else if (statusCode === 401) {
      console.log('### 401 에러임:', error.response.data)
    }
  })
}
