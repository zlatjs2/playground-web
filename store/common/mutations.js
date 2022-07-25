export default {
  PENDING(state, payload) {
    state.isPending = payload
  },
  ERROR(state, payload) {
    state.isError = payload
  },
  USER_INFO(state, payload) {
    state.users = payload
  },
  onAuthStateChangedMutation(state, { authUser, claims }) {
    console.log('### authUser:', authUser)

    if (authUser) {
      const { uid, email, displayName, photoURL } = authUser
      state.users = { uid, email, displayName, photoURL }
    }
  },
}
