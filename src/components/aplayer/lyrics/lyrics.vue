<template>
  <div>
    <div class="a-tool-lyrics pointer">
      <i class="iconfont audio icon-geci" @click="changeShow"></i>
    </div>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <div class="lyrics-container" v-show="showBox">
        <div class="lyric-title">
          歌词
        </div>
        <div class="lyric">
          <ul class="scroll-box" ref="scrollBox">
            <li
              v-for="(item, index) in parseLyric.lyrics"
              :key="index"
              class="lyric-li"
              :class="{ active: isActive(index) }"
              ref="scrollItems"
            >
              {{ item || '' }}
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 每行歌词的offset
      lrcOffsetTop: 0,
      // 当前歌词index
      currentIndex: 0,
      // 歌词计时器对象
      timerDown: null,
      timerUp: null
    }
  },
  props: {
    songCurrentTime: [Number, String],
    // 歌词
    lrc: [String],
    // 显示状态
    showBox: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    parseLyric() {
      return this.$utils.parseLyrics(this.lrc) || {}
    }
  },
  watch: {
    // 当前歌词index变化滚动歌词
    currentIndex() {
      this.clearTimer()
      this.scrollLrcTo()
    },
    lrc() {
      this.clearTimer()
      this.$refs.scrollBox.scrollTop = 0
    },
    songCurrentTime() {
      // 唱完 歌词返回顶部
      if (this.songCurrentTime > this.parseLyric.tim[this.parseLyric.tim.length - 1]) {
        this.clearTimer()
        this.$refs.scrollBox.scrollTop = 0
      }
    }
  },
  methods: {
    //处于活跃的歌词
    isActive(index) {
      let tim = this.parseLyric.tim
      let cur = this.songCurrentTime.toFixed(0)
      if (cur < tim[index + 1] && cur > tim[index]) {
        return (this.currentIndex = index)
      }
    },
    // li的offsetTop
    getItemoffset(index) {
      let activeItem = this.$refs.scrollItems
      if (activeItem[index]) {
        return (this.lrcOffsetTop = activeItem[index].offsetTop)
      }
      return (this.lrcOffsetTop = 0)
    },
    // 歌词滚动
    scrollLrcTo() {
      this.getItemoffset(this.currentIndex)
      let middle = 160
      let offset = this.lrcOffsetTop - middle
      let scrollBox = this.$refs.scrollBox
      if (offset > scrollBox.scrollTop) {
        this.scrollDown(scrollBox, offset)
      } else if (offset < scrollBox.scrollTop) {
        this.scrollUp(scrollBox, offset)
      }
    },
    scrollDown(ele, offset) {
      this.clearTimer()
      let that = this
      let time = offset - ele.scrollTop //相差越大越快
      that.timerDown = setInterval(() => {
        let speed = Math.floor(time / 20)
        if (ele.scrollTop >= offset) {
          clearInterval(that.timerDown)
        }
        ele.scrollTop = ele.scrollTop + speed
      }, 10)
    },
    scrollUp(ele, offset) {
      this.clearTimer()
      let that = this
      let time = offset - ele.scrollTop //相差越大越快
      that.timerUp = setInterval(() => {
        let speed = time / 20
        if (ele.scrollTop <= offset) {
          clearInterval(that.timerUp)
        }
        ele.scrollTop = ele.scrollTop + speed
      }, 10)
      return
    },
    clearTimer() {
      clearInterval(this.timerDown)
      clearInterval(this.timerUp)
    },
    // 显示判断
    changeShow() {
      this.$emit('update:showBox', !this.showBox)
    }
  }
}
</script>
<style lang="scss" scoped>
.lyrics-container {
  font-size: 14px;
  width: 350px;
  height: 420px;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  right: 5px;
  bottom: 90px;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 20px;
  .lyric-title {
    width: 100%;
    height: 50px;
    margin-left: 10px;
    margin-top: 10px;
    font-weight: bold;
  }
  .lyric {
    text-align: center;
    width: 300px;
    height: 320px;
    overflow-y: auto;
    position: absolute;
    bottom: 0;
    padding: 5px;
    white-space: normal;
    overflow-wrap: break-word;
    word-break: normal;
    .scroll-box {
      height: 300px;
      overflow-y: auto;
      transition: all 0.5s;
    }
  }
}
.lyric-li {
  padding: 10px 2px;
  transition: all 0.8s cubic-bezier(0, 0.5, 0, 0.5);
  font-weight: 400;
}
.active {
  color: $activeColor;
}
</style>
