<template>
  <div class="art-mv">
    <mv-list :mvList="mvs" @mvClick="mvClick" />
    <el-pagination
      background
      layout="prev, pager, next"
      :total="mvsCount"
      :page-size="mvsOptions.limit"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import mvList from '@/components/mvList/mvList'
export default {
  components: {
    mvList
  },
  data() {
    return {
      mvsOptions: {
        id: 0,
        limit: 8,
        offset: 0
      },
      mvs: [],
      mvsCount: this.$route.params.mvsCount || 0
    }
  },

  methods: {
    async artMV(options) {
      const {
        data: { code, mvs }
      } = await this.$api.artMV(options)
      if (code === 200) {
        this.mvs = mvs
      }
    },
    mvClick(val) {
      this.$router.push({ name: 'mvDetail', query: { mvid: val.id } })
    },
    currentChange(index) {
      this.mvsOptions.offset = (index - 1) * this.mvsOptions.limit
      this.artMV(this.mvsOptions)
    }
  },
  created() {
    this.mvsOptions.id = this.$route.query.id
    this.artMV(this.mvsOptions)
    this.$bus.$on('mvsCount', val => {
      this.mvsCount = val
    })
  }
}
</script>
<style lang="scss" scoped></style>
