<template>
  <div class="scroll-top pointer" v-show="btnFlag">
    <i class="el-icon-arrow-up" @click="backTop"></i>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      scrollTop: 0,
      btnFlag: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    backTop() {
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },
    // 当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this
      let scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 500) {
        that.btnFlag = true
      } else {
        that.btnFlag = false
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop)
  }
}
</script>
<style lang="scss" scoped>
.scroll-top {
  position: fixed;
  right: 50px;
  bottom: 100px;
  width: 60px;
  height: 60px;
  z-index: 9999;
  i {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 5px;
    background: $activeColor;
    color: #ffffff;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
  }
}
</style>
