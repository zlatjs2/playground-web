export default {
  PENDING({ commit }, payload) {
    commit('PENDING', payload)
  },
  ERROR({ commit }, payload) {
    commit('ERROR', payload)
  },
  USER_INFO({ commit }, payload) {
    commit('USER_INFO', payload)
  },
  onAuthStateChangedAction({ commit }, { authUser, claims }) {},
}
