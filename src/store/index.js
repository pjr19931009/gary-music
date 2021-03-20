import Vue from 'vue'
import Vuex from 'vuex'
import moduleUser from './module/users.js'
import moduleSong from './module/song.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabsIndex: 0
  },
  mutations: {
    setTabIndex: function(state, payload) {
      state.tabsIndex = payload
    }
  },

  modules: {
    users: moduleUser,
    song: moduleSong
  }
})
