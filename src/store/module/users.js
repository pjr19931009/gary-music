export default {
  state: () => ({
    isLogin: false,
    userInfo:{}
  }),
  mutations: {
    loginStatus(state, payload) {
      state.isLogin = payload.login
      state.userInfo = payload.options
    }
  },
  actions: {
    loginStatus({ commit }, payload) {
      commit('loginStatus', payload)
    }
  }
}
