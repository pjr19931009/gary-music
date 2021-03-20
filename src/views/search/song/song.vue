<template>
  <div v-loading="loading">
    <div v-if="count === 0" class="no-data">
      {{ emptyText }}
    </div>
    <template v-else>
      <song-table class="search-content" :songList="list" />
    </template>
  </div>
</template>

<script>
import songTable from '@/components/songTable/songTable'
export default {
  components: {
    songTable
  },
  data() {
    return {
      searchOptions: {
        keywords: '',
        limit: 50,
        offset: 0,
        //默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV
        type: 1
      },
      list: [],
      count: 0,
      loading: false,
      emptyText: ''
    }
  },
  methods: {
    async cloudSearch(options) {
      this.loading = true
      try {
        const {
          data: { code, result }
        } = await this.$api.cloudSearch(options)
        if (code === 200) {
          this.count = result.songCount || 0
          if (this.count == 0) {
            this.list = []
            this.emptyText = '暂无数据'
            this.loading = false
            return
          }
          this.getSongDesc(this.$utils.getIds(result.songs)).then(data => (this.list = data))
        }
        this.emptyText = '暂无数据'
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    // 整理songs数据
    async getSongDesc(ids) {
      const {
        data: { code, songs }
      } = await this.$api.getSongDesc({ ids: ids.join(',') })
      if (code === 200) {
        return this.$utils.assignSongList(
          songs.map(song => {
            return {
              name: song.name,
              album: song.al.name,
              art: song.ar,
              duration: Math.floor(song.dt / 1000),
              id: song.id,
              picUrl: song.al.picUrl,
              album: song.al
            }
          })
        )
      }
    }
  },
  watch: {
    keywords(newVal) {
      this.searchOptions.keywords = newVal
      this.cloudSearch(this.searchOptions)
    }
  },
  computed: {
    keywords() {
      return this.$route.query.keywords || ''
    }
  },
  created() {
    this.searchOptions.keywords = this.keywords
    this.cloudSearch(this.searchOptions)
  }
}
</script>
