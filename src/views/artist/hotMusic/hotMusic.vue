<template>
  <div class="hot-music">
    <song-table class="pd-table" :songList="songList" />
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
      songList: []
    }
  },
  computed: {},
  watch: {
   "$route.query.id": {
     handler(newVal){
         this.artistTopSongs(newVal)
     }
   }
  },
  methods: {
    async artistTopSongs(id) {
      const {
        data: { code, songs }
      } = await this.$api.artistTopSongs({id})
      if (code === 200) {
        this.songList = songs.map(song => {
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
        this.songList = this.$utils.assignSongList(this.songList)
      }
    }
  },
  created() {
    this.artistTopSongs(this.$route.query.id)
  }
}
</script>
<style lang="scss" scoped></style>
