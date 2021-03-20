<template>
  <div class="aplayer-container">
    <transition
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <div class="audio-box" v-show="$store.state.song.songState">
        <div class="a-detail">
          <div class="a-avatar pointer">
            <img :src="audioAvatar" />
          </div>
          <div class="a-song-name a-ellipsis">
            <span class="pointer">{{ songName || '' }}</span>
          </div>
          <div class="a-artist a-ellipsis ">
            <span class="pointer">{{ artName || '' }}</span>
          </div>
        </div>
        <div class="a-control">
          <div class="a-control-button">
            <div @click="preSong">
              <i class="iconfont audio icon-pre pointer"></i>
            </div>
            <div>
              <i
                class="iconfont audio icon-palycircle pointer"
                @click="handleStart"
                v-show="!isPlay"
              ></i>
              <i
                class="iconfont audio icon-timeout pointer"
                @click="handleStop"
                v-show="isPlay"
              ></i>
            </div>
            <div @click="nextSong">
              <i class="iconfont audio icon-next pointer"></i>
            </div>
          </div>
          <div class="a-control-progress">
            <div class="a-control-current">
              {{ (currentTime * 1000) | formatDuring }}
            </div>
            <div class="a-control-bar">
              <gprogress
                @valueChange="controlValueChange"
                @btnUp="progressBtnUp"
                :initvalue="currentProgress"
                :animation="isPlay"
              />
            </div>
            <div class="a-control-duration">
              {{ (Math.floor(duration) * 1000) | formatDuring }}
            </div>
          </div>
          <div class="a-control-volume">
            <div>
              <i
                class="iconfont audio icon-sound pointer"
                v-show="volume != 0"
                @click="soundOff"
              ></i>
              <i
                class="iconfont audio icon-jingyin pointer"
                v-show="volume == 0"
                @click="soundOn"
              ></i>
            </div>
            <div class="a-control-volume-progress pointer">
              <gprogress @valueChange="volumeValueChange" :initvalue="volume" />
            </div>
          </div>
        </div>
        <div class="a-tools">
          <div class="a-tool-loop pointer" @click="loop = !loop">
            <i class="iconfont audio icon-xunhuan" v-show="!loop"></i>
            <i class="iconfont audio icon-xunhuan-one" v-show="loop"></i>
          </div>
          <!-- 歌词 -->
          <lyrics
            :id="$store.state.song.songInfo.id"
            :songCurrentTime="currentTime"
            :lrc="lrc"
            :showBox.sync="lyricShow"
          />
          <his-list :showBox.sync="hisShow" />
        </div>
        <audio
          :id="$store.state.song.songInfo.id"
          ref="aplayer"
          @ended="overAudio"
          @play="startPlaying"
          @pause="stopPlaying"
          :autoplay="autoplay"
          :loop="loop"
          crossOrigin="anonymous"
          :src="songUrl"
        >
          <source :src="songUrl" type="audio/mpeg" />
        </audio>
      </div>
    </transition>
    <transition
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <div class="show-audio" v-show="!$store.state.song.songState">
        <div>
          <i
            class="iconfont audio icon-palycircle pointer"
            @click="handleStart"
            v-show="!isPlay"
          ></i>
          <i class="iconfont audio icon-timeout pointer" @click="handleStop" v-show="isPlay"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import gprogress from './progress/progress'
import lyrics from './lyrics/lyrics'
import hisList from './historyList/historyList'
export default {
  components: {
    gprogress,
    lyrics,
    hisList
  },
  data() {
    return {
      // 当前音频对象
      aplayer: {},
      // 音频长度
      duration: 0,
      // 音量 0-10000
      volume: 5000,
      // 静音前音量
      preVolume: null,
      // 播放到的当前时间
      currentTime: 0,
      // 不自动播放
      autoplay: false,
      // 循环
      loop: false,
      // 播放定时器
      currentTimer: null,
      // 是否在控制进度条
      controlProgress: false,
      // 按键拖动记录当前位置 防止闪烁
      mouseDownControlValue: 0,
      // 显示歌词
      lyricShow: false,
      // 显示历史歌单
      hisShow: false,
      // 歌词
      lrc: ''
    }
  },
  computed: {
    // 当前播放进度0-100
    currentProgress: {
      get() {
        if (!this.controlProgress) {
          let duration = this.duration
          let currentTime = this.currentTime
          return Math.floor((currentTime * 10000) / duration) || 0
        }
        return this.mouseDownControlValue
      },
      set(value) {
        this.currentTime = value
      }
    },
    // 当前歌曲Url
    songUrl() {
      return this.$store.state.song.songInfo.url
    },
    // 当前音频头像
    audioAvatar() {
      const url = this.$store.state.song.songInfo.picUrl
      if (!url) return ''
      return url + '?param=130y130'
    },
    // 歌手
    artName() {
      return this.$utils.artName(this.$store.state.song.songInfo.art)
    },
    // 歌名
    songName() {
      return this.$store.state.song.songInfo.name
    },
    // 播放状态
    isPlay: {
      get() {
        return this.$store.state.song.songState
      },
      set(value) {
        this.$emit('changeState', value)
      }
    },
    // 播放列表
    songList() {
      return this.$store.state.song.songList || []
    }
  },
  watch: {
    '$store.state.song.songInfo': {
      handler: function(newVal, oldVal) {
        if (this.$store.state.song.songState) {
          setTimeout(() => {
            this.handleStart()
          })
        } else {
          setTimeout(() => {
            this.handleStop()
          })
        }
      },
      deep: true
    },
    lyricShow(val) {
      if (val == true) {
        this.hisShow = false
      }
      this.lyricShow = val
    },
    hisShow(val) {
      if (val == true) {
        this.lyricShow = false
      }
      this.hisShow = val
    }
  },
  methods: {
    // 播放
    handleStart() {
      if (!this.songUrl) return
      this.aplayer.play()
    },
    // 暂停
    handleStop() {
      this.aplayer.pause()
    },

    // 控制台鼠标抬起
    progressBtnUp(value) {
      let time = (this.duration * value) / 10000
      this.currentTime = this.aplayer.currentTime = time
      this.controlProgress = false

      if (!this.isPlay) {
        this.handleStart()
      }
    },
    // 进度条值改变
    controlValueChange(value) {
      // 拖动进度条时 设置当前的currentProgress位置 避免undefined导致闪烁
      this.mouseDownControlValue = value
      this.controlProgress = true
    },
    // 控制音量
    volumeValueChange(value) {
      value = value || 0
      this.aplayer.volume = value / 10000
      this.volume = value
    },
    // 每50ms获取当前播放位置秒数
    startCurrentTime() {
      this.currentTimer = null
      let that = this
      that.currentTimer = setInterval(() => {
        that.duration = Math.floor(that.aplayer.duration)
        that.currentTime = that.aplayer.currentTime
      }, 50)
    },
    // 播放结束
    overAudio() {
      this.stopPlaying()
      this.isPlay = false
      this.currentProgress = 0
      if (!this.loop) {
        // 防止进度条闪动
        setTimeout(() => {
          this.nextSong()
        }, 100)
      }
    },
    // 开始播放回调
    startPlaying() {
      this.startCurrentTime()
      this.isPlay = true
      this.getLyric(this.$store.state.song.songInfo.id)
    },
    // 暂停回调
    stopPlaying() {
      clearInterval(this.currentTimer)
      this.currentTimer = null
      this.isPlay = false
    },
    // 静音
    soundOff() {
      this.preVolume = Math.floor(this.volume)
      this.volume = 0
      this.volumeValueChange(this.Volume)
    },
    // 取消静音
    soundOn() {
      this.volume = this.preVolume
      this.volumeValueChange(this.volume)
    },
    // 上一首
    preSong() {
      let songList = this.songList
      let currentID = this.$store.state.song.songInfo.id
      let preID = ''
      songList.map((item, index) => {
        if (item.id == currentID) {
          if (index == 0) {
            preID = songList[songList.length - 1].id
          } else {
            preID = songList[index - 1].id
          }
        }
      })
      this.$emit('toggleSong', preID)
    },
    // 下一首
    nextSong() {
      let songList = this.songList
      let currentID = this.$store.state.song.songInfo.id
      let nextID = ''
      songList.map((item, index) => {
        if (item.id == currentID) {
          if (index == songList.length - 1) {
            nextID = songList[0].id
          } else {
            nextID = songList[index + 1].id
          }
        }
      })
      this.$emit('toggleSong', nextID)
    },

    // 根据ID查歌词
    async getLyric(id) {
      const {
        data: { code, lrc, nolyric }
      } = await this.$api.getLyric({ id })
      if (code == 200 && !nolyric) {
        this.lrc = lrc.lyric
      } else {
        this.lrc = ''
      }
    },
    // 打开歌词
    showLyric() {
      if (this.showHis) {
        this.showHis = !this.showHis
      }
      this.showLyric = !this.showLyric
    },
    // 打开历史歌单
    showLyric() {
      if (this.showLyric) {
        this.showLyric = !this.showLyric
      }
      this.showHis = !this.showHis
    }
  },
  mounted() {
    this.aplayer = this.$refs.aplayer
    this.aplayer.volume = this.volume / 10000
  }, //生命周期 - 挂载完成（可以访问DOM元素）

  destroyed() {
    this.stopPlaying()
  } //生命周期 - 销毁完成
}
</script>
<style lang="scss">
.audio-box {
  color: #ffffff;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  position: fixed;
  bottom: 0;
  width: 100%;
  min-width: 980px;
  height: 85px;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  border-radius: 5px 5px 0 0;
  box-sizing: border-box;
  z-index: 9999;
  .a-detail {
    flex: 2;
    max-width: 15%;
    min-width: 140px;
    height: 65px;
    .a-avatar {
      height: inherit;
      float: left;
      img {
        height: 100%;
        border-radius: 5px;
      }
    }
    .a-song-name {
      padding: 5px 10px;
      font-weight: bold;
    }
    .a-artist {
      padding: 5px 10px;
    }
  }
  .a-control {
    flex: 7;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .a-control-button {
      flex: 0 1 40%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .a-control-progress {
      flex: 0 0 60%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .a-control-bar {
        width: 100%;
        padding: 0 10px;
        cursor: pointer;
      }
      .a-control-duration {
        flex: 0 0 50px;
      }
      .a-control-current {
        flex: 0 0 50px;
      }
    }
    .a-control-volume {
      width: 50%;
      min-width: 100px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 20px;
      .a-control-volume-progress {
        flex: 0 0 80%;
        min-width: 80px;
      }
      .icon-sound,
      .icon-jingyin {
        margin-right: 5px;
      }
    }
  }
  .a-tools {
    flex: 1 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.show-audio {
  position: fixed;
  bottom: 60px;
  right: 75px;
}
.a-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.iconfont.audio {
  font-size: 30px;
}
</style>
