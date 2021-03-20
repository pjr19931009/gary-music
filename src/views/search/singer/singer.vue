<!--  -->
<template>
  <div v-loading="loading">
    <div v-if="count === 0" class="no-data">
      {{ emptyText }}
    </div>
    <template v-else>
      <div><singer :data="list" /></div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        :page-size="searchOptions.limit"
        @current-change="currentChange"
      >
      </el-pagination>
    </template>
  </div>
</template>

<script>
import singer from '@/components/singer/singer.vue'
export default {
  components: { singer },
  data() {
    return {
      searchOptions: {
        keywords: '',
        limit: 40,
        offset: 0,
        //默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV
        type: 100
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
          this.count = result.artistCount || 0
          if (this.count == 0) {
            this.list = []
            this.emptyText = '暂无数据'
            this.loading = false
            return
          }
          this.list = result.artists
        }
        this.emptyText = '暂无数据'
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    currentChange(index) {
      this.searchOptions.offset = (index - 1) * this.searchOptions.limit
      this.cloudSearch(this.searchOptions)
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
