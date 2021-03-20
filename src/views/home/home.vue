<!-- 首页 -->
<template>
  <div class="home">
    <div class="home-header pointer">
      <myswiper :banners="banners"></myswiper>
    </div>
    <div class="title">推荐歌单</div>
    <div class="recommend-playlist" v-loading="playlistLoading">
      <playlist :data="recommendSonglist"></playlist>
    </div>
    <div class="title">推荐新歌</div>
    <div id="recommend-newsong" class="recommend-newsong">
      <play-field :data="recommendNewSongs" />
    </div>
    <div class="title">推荐歌手</div>
    <div class="recommend-hotSinger">
      <div>
        <singer :data="recommendArtists"></singer>
      </div>
    </div>
  </div>
</template>

<script>
import myswiper from '@/components/swiper/swiper.vue'
import playlist from '@/components/playlist/playlist.vue'
import playField from '@/components/playField/playField.vue'
import singer from '@/components/singer/singer.vue'
export default {
  components: {
    myswiper,
    playlist,
    playField,
    singer
  },

  data() {
    return {
      // 轮播
      banners: [],
      // 推荐歌曲
      recommendSonglist: [],
      // 推荐新歌
      recommendNewSongs: [],
      // 推荐歌手
      recommendArtists: [],
      // 歌单loading
      playlistLoading: false
    }
  },
  methods: {
    // 轮播图请求
    async banner() {
      try {
        const { data } = await this.$api.banner()
        let { banners, code } = data
        if (code === 200) {
          this.banners = banners.map(item => {
            return item.imageUrl
          })
          return
        }
      } catch (e) {
        return e
      }
    },
    //  推荐歌单请求
    async recommendSongList(limit) {
      this.playlistLoading = true
      const {
        data: { code, result }
      } = await this.$api.recommendSongList({ limit })
      if (code !== 200) return (this.recommendSonglist = [])
      this.recommendSonglist = result
      this.playlistLoading = false
    },
    // 推荐新歌曲
    async recommendNewSong() {
      const {
        data: { code, result }
      } = await this.$api.recommendNewSong({ limit: 10 })
      console.log(result);
      if (code !== 200) return (this.recommendNewSongs = [])
      this.recommendNewSongs = result

      // 筛选数据
      this.recommendNewSongs = this.$utils.songFilter(this.recommendNewSongs)
    },
    // 热门歌手
    async recommendSingerList() {
      const { data } = await this.$api.recommendSingerList({ offset: 0, limit: 32 })
      let { code, artists } = data
      if (code == 200) {
        return (this.recommendArtists = artists)
      }
      return false
    }
  },

  created() {
    this.banner()
    this.recommendSongList(32)
    this.recommendNewSong()
    this.recommendSingerList()
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  font-size: 14px;
  padding: 0;
  .home-header {
    width: 100%;
  }
  .recommend-newsong {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
