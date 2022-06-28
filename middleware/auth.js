export default ({ store, redirect }) => {
  if (!store.state.common.userInfo) {
    redirect('/signin')
  }
}
