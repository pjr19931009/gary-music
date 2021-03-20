<template>
  <div class="mv-container">
    <tags :currentId="regionTagsId" :tag="regionTags" @tagClick="regionClick" />
    <tags :currentId="originTagsId" :tag="originTags" @tagClick="originClick" />
    <tags :currentId="orderTagsId" :tag="orderTags" @tagClick="orderClick" />
    <mv-list :mvList="mvList" @mvClick="mvClick" v-loading="loading" />
    <el-pagination
      v-show="!loading"
      background
      layout="prev, pager, next"
      :total="mvTotal"
      :current-page.sync="currentPage"
      :page-size="mvReqOptions.limit"
      @current-change="curPageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import tags from '@/components/tags/tags'
import mvList from '@/components/mvList/mvList'
export default {
  components: {
    tags,
    mvList
  },
  data() {
    return {
      mvReqOptions: {
        area: '',
        type: '',
        order: '',
        limit: 28,
        offset: ''
      },
      mvList: [],
      mvTotal: 0,
      regionTags: [
        { catId: -1, name: '全部' },
        { catId: 0, name: '内地' },
        { catId: 1, name: '港台' },
        { catId: 2, name: '欧美' },
        { catId: 3, name: '日本' },
        { catId: 4, name: '韩国' }
      ],
      originTags: [
        { catId: -1, name: '全部' },
        { catId: 0, name: '官方版' },
        { catId: 1, name: '原生' },
        { catId: 2, name: '现场版' },
        { catId: 3, name: '网易出品' }
      ],
      orderTags: [
        { catId: -1, name: '上升最快' },
        { catId: 0, name: '最热' },
        { catId: 1, name: '最新' }
      ],
      regionTagsId: -1,
      originTagsId: -1,
      orderTagsId: -1,
      currentPage: 0,
      loading: false
    }
  },

  methods: {
    async reqMvList(options) {
      this.loading = true
      const {
        data: { code, count, data }
      } = await this.$api.mvList(options)
      if (code === 200) {
        this.mvList = data
        this.mvTotal = count || this.mvTotal
      }
      this.loading = false
    },
    regionClick(val) {
      this.regionTagsId = val.catId
      this.mvReqOptions.area = val.name
      this.initReqMvList()
    },
    originClick(val) {
      this.originTagsId = val.catId
      this.mvReqOptions.type = val.name
      this.initReqMvList()
    },
    orderClick(val) {
      this.orderTagsId = val.catId
      this.mvReqOptions.order = val.name
      this.initReqMvList()
    },
    initReqMvList() {
      this.currentPage = 0
      this.mvReqOptions.offset = 0
      this.reqMvList(this.mvReqOptions)
    },
    mvClick(val) {
      this.$router.push(`/mv-detail?mvid=${val.id}`)
    },
    curPageChange(page) {
      this.currentPage = page
      this.mvReqOptions.offset = (page - 1) * this.mvReqOptions.limit
      this.reqMvList(this.mvReqOptions)
    }
  },
  created() {
    this.reqMvList(this.mvReqOptions)
  } //生命周期 - 创建完成（可以访问当前this实例）
}
</script>
<style lang="scss" scoped>
.mv-container {
  width: 100%;
  min-height: 100vh;
}
.el-pagination {
  text-align: center;
}
</style>
