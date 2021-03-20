<template>
  <div class="cat-bar">
    <nav-menu
      :tags="tags"
      :buttonTitle="buttonTitle"
      :orderIndex="orderIndex"
      @handleCat="handleCat"
      @handleTags="handleTags"
      @handleOrder="handleOrder"
    />
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      :duration="300"
    >
      <detail :cat="cat" v-show="showDetail" @tagClick="tagClick" />
    </transition>
  </div>
</template>

<script>
import navMenu from './navMenu/navMenu'
import catDetail from './catDetail/catDetail'

export default {
  components: {
    navMenu,
    detail: catDetail
  },
  data() {
    return {
      tags: [],
      cat: {},
      showDetail: false,
      playListOptions: {}
    }
  },
  props: {
    buttonTitle: {
      type: String,
      default: ''
    },
    orderIndex: {
      type: [String, Number],
      default: 0
    }
  },
  methods: {
    async catList() {
      const {
        data: { code, sub, categories }
      } = await this.$api.catList()
      if (code === 200) {
        this.cat = {
          sub,
          categories
        }
        return
      }
      return false
    },
    async hotList() {
      const {
        data: { code, tags }
      } = await this.$api.hotList()
      if (code === 200) {
        this.tags = tags
        return
      }
      return false
    },

    // 分类按钮
    handleCat(flag) {
      this.showDetail = !this.showDetail
    },
    // 热门标签
    handleTags(item) {
      this.$emit('handleTags', item)
    },
    // 热门 最新排序
    handleOrder(obj) {
      this.$emit('handleOrder', obj)
    },
    // 全部分类
    tagClick(val) {
      this.showDetail = false
      this.$emit('handleTags', val)
    }
  },

  created() {
    this.catList()
    this.hotList()
  }
}
</script>
<style lang="scss" scoped>
.cat-bar {
  width: 100%;

  box-sizing: border-box;
  background-color: #ffffff;
  position: relative;
}
</style>
