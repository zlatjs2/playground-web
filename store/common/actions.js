export default {
  SET_PENDING({ commit }, payload) {
    commit('PENDING', payload)
  },
  SET_ERROR({ commit }, payload) {
    commit('ERROR', payload)
  },
  SET_SNACKBAR({ commit }, payload) {
    commit('SNACKBAR', payload)
  },
}
