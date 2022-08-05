export default {
  PENDING(state, payload) {
    state.isPending = payload
  },
  ERROR(state, payload) {
    state.isError = payload
  },
  SNACKBAR(state, payload) {
    state.isSnackBar = payload
  },
}
