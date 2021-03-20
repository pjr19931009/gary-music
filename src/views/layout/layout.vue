<!-- layout -->
<template>
  <div class="layout-container" id="layout-container">
    <navheader @gotabs="gotabs" />
    <div class="type-area">
      <keep-alive>
        <router-view class="base-box" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view class="base-box" v-if="!$route.meta.keepAlive" />
    </div>
    <gary-footer></gary-footer>
    <scroll-top />
    <aplayer @changeState="playChangeState" @toggleSong="toggleSong" class="a-player" />
  </div>
</template>
<script>
import header from '@/components/header/header.vue'
import scrollTop from '@/components/scrollTop/scrollTop.vue'
import aplayer from '@/components/aplayer/aplayer.vue'
import footer from '@/components/footer/footer.vue'

export default {
  data() {
    return {}
  },
  components: {
    navheader: header,
    scrollTop: scrollTop,
    aplayer,
    garyFooter: footer
  },
  methods: {
    playChangeState(value) {
      this.$store.commit('setSongState', value)
    },
    // 切换歌曲
    toggleSong(id) {
      this.$store.state.song.songList.forEach(item => {
        if (item.id === id) {
          this.$store.dispatch('startSong', item)
        }
      })
    },
    // 跳转tabs页面
    gotabs(index) {
      let path = ''
      switch (index) {
        case 0:
          path = '/home'
          break
        case 1:
          path = '/topList'
          break
        case 2:
          path = '/category'
          break
        case 3:
          path = '/singers'
          break
        case 4:
          path = '/mv'
          break
      }
      this.$router.push(path)
    }
  }
}
</script>
<style lang="scss">
.layout-container {
  min-width: 980px;
  background: #eeeeee;
  .type-area {
    padding: 20px $layoutPadding;
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    .base-box {
      margin-top: $navHeight;
      width: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
