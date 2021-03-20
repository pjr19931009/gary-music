<template>
  <div class="progress-box">
    <div class="progress" ref="progress" @click="handleClick">
      <div class="scroll-line" ref="innerLine"></div>
      <div
        :class="['button', { 'p-animation': animation }]"
        @mousedown="progressBtnDown"
        ref="progressBtn"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //进度条
      innerLine: {},
      // 进度值 0-1000
      value: 0,
      progress: {},
      progressBtn: {}
    }
  },
  props: {
    initvalue: {
      type: [Number],
      default: 0
    },
    animation: {
      type: [Boolean],
      default: false
    }
  },
  methods: {
    // 监听拖动
    progressBtnDown() {
      window.addEventListener('mousemove', this.changeProgressBtn)
      window.addEventListener('mouseup', this.progressBtnUp)
    },
    // 按钮拖动触发
    changeProgressBtn(event) {
      let progressWidth = Math.round(this.progress.clientWidth)
      let progressPosition = this.innerLine.getBoundingClientRect().left
      let e = event || window.event
      let mousePosition = e.clientX
      let value = ((mousePosition - progressPosition) * 10000) / progressWidth
      if (value < 0) {
        return (this.value = 0)
      } else if (value > 10000) {
        return (this.value = 10000)
      }
      return (this.value = Math.floor(value))
    },
    // 取消绑定事件
    progressBtnUp() {
      window.removeEventListener('mousemove', this.changeProgressBtn)
      window.removeEventListener('mouseup', this.progressBtnUp)
      this.$emit('btnUp', this.value)
    },
    // 进度
    progressChange(value) {
      this.progressBtn.style.left = this.innerLine.style.width = value / 100 + '%'
    },
    // 点击进度条
    handleClick(e) {
      this.changeProgressBtn(e)
      /**
       * 这里写定时器是因为点击事件后改变value
       * 导致aplayer组件controlProgress判断为true(还在鼠标控制状态)
       * 所以点击后播放条不会动了
       * 而拖动mouseup事件先改value后触发所以不会有问题
       * 先记录问题，暂时先用定时器将操作改成异步，等后面再分别判断
       */
      setTimeout(() => {
        this.$emit('btnUp', this.value)
      })
    }
  },
  watch: {
    // 判断拖动或者点击的值
    value() {
      this.progressChange(this.value)
      this.$emit('valueChange', this.value)
    },
    // 持续播放的值
    initvalue() {
      this.progressChange(this.initvalue)
    }
  },
  mounted() {
    this.innerLine = this.$refs.innerLine
    this.progress = this.$refs.progress
    this.progressBtn = this.$refs.progressBtn
    this.progressChange(this.initvalue)
  },
  destroyed() {
    this.progressBtnUp()
  }
}
</script>
<style lang="scss" scoped>
.progress-box {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  height: 20px;
  position: relative;
  .progress {
    width: 100%;
    height: 2px;
    background-color: #ffffff;
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    .scroll-line {
      width: 0;
      height: 4px;
      background-color: $activeColor;
      position: relative;
    }
    .button {
      display: block;
      background-color: #ffffff;
      width: 10px;
      height: 10px;
      border: 3px solid $activeColor;
      border-radius: 10px;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto -5px;
      transform: translate(-50%, 0);
    }
  }
}

.p-animation {
  animation: myfirst 0.5s ease-in-out 0s infinite alternate;
}

@keyframes myfirst {
  0% {
    transform: scale(0.94) translate(-50%, 0);
  }
  25% {
    transform: scale(0.98) translate(-50%, 0);
  }
  50% {
    transform: scale(1) translate(-50%, 0);
  }
  75% {
    transform: scale(1.02) translate(-50%, 0);
  }
  100% {
    transform: scale(1.1) translate(-50%, 0);
  }
}
</style>
