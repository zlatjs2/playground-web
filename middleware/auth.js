/**
 * 인증 미들웨어
 */
export default ({ store, redirect, $cookiz }) => {
  const { userInfo } = store.state
  const infos = $cookiz.get('__session')

  if (!userInfo) {
    if (infos) {
      store.dispatch('FETCH_USER', infos)
      redirect('/')
    } else {
      console.log('### 111:', 111)

      redirect('/signin')
    }
  }
}
