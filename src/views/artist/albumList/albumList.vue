<template>
  <div>
    <albumList :albums="hotAlbums"></albumList>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="albumSize"
      :page-size="options.limit"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import albumList from '@/components/albumList/albumList'
export default {
  components: {
    albumList
  },
  data() {
    return {
      options: {
        id: 0,
        limit: 8,
        offset: 0
      },
      albumSize: 0,
      hotAlbums: []
    }
  },
  methods: {
    async artAlbum(options) {
      const {
        data: { code, hotAlbums, artist }
      } = await this.$api.artAlbum(options)
      if (code === 200) {
        this.albumSize = artist.albumSize
        this.hotAlbums = hotAlbums
      }
    },
    currentChange(index) {
      this.options.offset = (index - 1) * this.options.limit
      this.artAlbum(this.options)
    }
  },
  created() {
    this.options.id = this.$route.query.id
    this.artAlbum(this.options)
  }
}
</script>
<style lang="scss" scoped>
.el-pagination {
  text-align: center;
}
</style>
