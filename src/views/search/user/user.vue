<template>
  <div class="user-box" v-loading="loading">
    <div v-if="count === 0" class="no-data">
      {{ emptyText }}
    </div>
    <template v-else>
      <div v-for="item in list" :key="item.userId" class="user-item">
        <el-image lazy :src="item.avatarUrl + '?param=130y130'" @click="toUserPage(item)">
          <div slot="placeholder" class="image-slot">
            <div class="dot">加载中...</div>
          </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <span @click="toUserPage(item)">{{ item.nickname }}</span>
      </div>
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
export default {
  data() {
    return {
      searchOptions: {
        keywords: '',
        limit: 40,
        offset: 0,
        //默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV
        type: 1002
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
          this.count = result.userprofileCount || 0
          if (this.count == 0) {
            this.list = []
            this.emptyText = '暂无数据'
            return
          }
          this.list = result.userprofiles
        }
        this.emptyText = '暂无数据'
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    toUserPage(item) {
      this.$router.push({ path: '/user', query: { uid: item.userId } })
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
<style lang="scss" scoped>
.user-box {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .user-item {
    flex: 1 0 130px;
    height: 200px;
    margin: 0 10px;
    .el-image {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      display: block;
      cursor: pointer;
      margin: auto;
    }
    span {
      color: $textColor;
      text-align: center;
      word-break: break-word;
      line-height: 16px;
      display: inline-block;
      width: 100%;
      padding: 5px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
.el-pagination {
  flex: 1;
}
</style>
