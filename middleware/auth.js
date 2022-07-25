/**
 * 사용자 인증 미들웨어
 */
export default ({ $cookiz, store, redirect }) => {
  console.log('### 미들웨어:')
  const authCookies =
    $cookiz.get('firebase:kakao') ||
    $cookiz.get('firebase:naver') ||
    $cookiz.get('firebase:google')

  if (authCookies) {
    const { users } = store.state.common
    if (!users) store.dispatch('common/USER_INFO', authCookies)
    // redirect('/')
  } else {
    redirect('/signin')
  }
}
