<!--  -->
<template>
  <div class="top-list-container">
    <div class="title">云音乐特色榜</div>
    <div class="cloud-rank">
      <template v-for="item in cRank">
        <list :item="item" :key="item.id" class="c-item" />
      </template>
    </div>
    <div class="title">全球媒体榜</div>
    <div class="global-rank">
      <playList :data="gRank" />
    </div>
  </div>
</template>

<script>
import playList from '@/components/playlist/playlist'
import list from '@/components/playlist/listItem/listItem'
export default {
  components: {
    playList,
    list
  },
  data() {
    return {
      // 云音乐特色榜
      cloudRank: [],
      //全球媒体榜
      globalRank: []
    }
  },
  methods: {
    // 所有榜单
    async getTopList() {
      const {
        data: { code, list }
      } = await this.$api.topList()
      if (code === 200) {
        this.cloudRank = list.splice(0, 4)
        this.globalRank = list
        return
      }
      return false
    }
  },
  computed: {
    cRank() {
      return this.$utils.rankData(this.cloudRank)
    },
    gRank() {
      return this.$utils.rankData(this.globalRank)
    }
  },
  mounted() {
    this.getTopList()
  } //生命周期 - 挂载完成（可以访问DOM元素）
}
</script>
<style lang="scss" scoped>
.top-list-container {
  width: 100%;

  box-sizing: border-box;
  overflow: hidden;
  .cloud-rank {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1%;
    box-sizing: border-box;
    .c-item {
      flex: 0 1 130px;
      margin-left: 2%;
    }
  }
  .global-rank {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
