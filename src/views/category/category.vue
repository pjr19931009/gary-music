<template>
  <div class="category">
    <cat-bar
      :buttonTitle="playListOptions.cat"
      :orderIndex="orderIndex"
      @handleTags="handleTags"
      @handleOrder="handleOrder"
    />
    <playlist :data="list" class="cat-list" v-loading="loading" />
    <el-pagination
      v-show="!loading"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleChange"
      :page-size="playListOptions.limit"
    >
    </el-pagination>
  </div>
</template>

<script>
import catBar from '@/components/catBar/catBar'
import playlist from '@/components/playlist/playlist'
export default {
  components: {
    catBar,
    playlist
  },
  data() {
    return {
      list: [],
      // 歌单请求参数
      playListOptions: {
        limit: 40,
        offset: 0,
        order: 'hot',
        cat: '全部'
      },
      total: 0,
      more: false,
      orderIndex: 0,
      loading: false
    }
  },
  methods: {
    async playList(options) {
      this.loading = true
      const {
        data: { code, cat, total, more, playlists }
      } = await this.$api.playList(options)
      if (code === 200) {
        this.list = this.$utils.rankData(playlists)
        this.playListOptions.cat = cat
        this.total = total
        this.more = more
      }
      this.loading = false
    },
    handleChange(val) {
      this.playListOptions.offset = (val - 1) * this.playListOptions.limit
      this.changeRoute()
    },
    handleTags(val) {
      this.playListOptions.cat = val.name
      this.changeRoute()
    },
    handleOrder(val) {
      this.orderIndex = val
      this.playListOptions.order = val === 0 ? 'hot' : 'new'
      this.changeRoute()
    },
    changeRoute() {
      this.$router.push({
        query: {
          cat: this.playListOptions.cat,
          order: this.playListOptions.order,
          offset: this.playListOptions.offset
        }
      })
    }
  },
  watch: {
    '$route.query': function(newVal) {
      this.playListOptions = {
        limit: 40,
        offset: newVal.offset || 0,
        order: newVal.order || '',
        cat: newVal.cat || ''
      }
      this.orderIndex = newVal.order === 'new' ? 1 : 0
      this.playList(this.playListOptions)
    }
  },
  created() {
    this.playList(this.playListOptions)
  }
}
</script>
<style lang="scss" scoped>
.category {
  width: 100%;
  font-size: 14px;

  .cat-list {
    margin-top: 20px;
  }
}

.el-pagination {
  text-align: center;
}
</style>
