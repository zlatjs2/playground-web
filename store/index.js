export const state = () => ({
  userInfo: null,
  token: null,
})

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_USER(state, infos) {
    state.userInfo = infos
  },
  FETCH_USER(state, infos) {
    state.userInfo = infos
  },
}

export const actions = {
  nuxtServerInit({ commit }, { $cookiz, req }) {
    const infos =
      $cookiz.get('firebase:kakao') ||
      $cookiz.get('firebase:naver') ||
      $cookiz.get('firebase:google')
    console.log('### nuxtServerInit:', infos)

    commit('SET_USER', infos)
  },
  FETCH_USER({ commit }, payload) {
    commit('FETCH_USER', payload)
  },
  SET_TOKEN({ commit }, payload) {
    commit('SET_TOKEN', payload)
  },
}
