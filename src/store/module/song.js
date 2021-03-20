import $api from '@/api'
export default {
  state: () => ({
    // 播放中歌曲信息
    songInfo: {},
    // 当前播放器状态 false未播放
    songState: false,
    // 当前页面播放列表ID
    songList: []
  }),
  mutations: {
    // 设置歌曲信息
    setSongInfo(state, payload) {
      state.songInfo = payload
    },
    // 设置播放状态
    setSongState(state, payload) {
      state.songState = payload
    },
    // 设置播放列表ID
    songList(state, payload) {
      state.songList = payload
    }
  },
  actions: {
    async startSong({ commit, state }, payload) {
      const oldId = state.songInfo.id
      // 根据id查歌曲url id可以是数组    按照obj的ID排序
      const {
        data: { code, data }
      } = await $api.getSongUrl({ id: payload.id })
      if (code !== 200) return false
      commit('setSongInfo', {
        picUrl: payload.picUrl,
        name: payload.name,
        art: payload.art,
        album: payload.album,
        duration: payload.duration,
        id: payload.id,
        url: data[0].url
      })
      if (oldId == payload.id) {
        commit('setSongState', !state.songState)
      } else {
        commit('setSongState', true)
      }
      if (payload.songList) {
        commit('songList', payload.songList)
      }
      // 存入历史播放列表
      let hisSong = JSON.parse(localStorage.getItem('hisSong'))
      if (hisSong && hisSong.length != 0) {
        hisSong.map((item, index) => {
          if (item.id === payload.id) {
            hisSong.splice(index, 1)
          }
        })
        hisSong.unshift(payload)
        if (hisSong.length > 20) {
          hisSong.pop()
        }
        localStorage.setItem('hisSong', JSON.stringify(hisSong))
      } else {
        hisSong = []
        hisSong.unshift(payload)
        localStorage.setItem('hisSong', JSON.stringify(hisSong))
      }
    }
  }
}
