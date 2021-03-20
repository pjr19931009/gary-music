<!--  -->
<template>
  <div id="video-box">
    <video-player
      class="video-player-box"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      v-if="this.playerOptions.sources[0].src"
      @play="onPlayerPlay($event)"
    >
    </video-player>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
export default {
  components: {
    videoPlayer
  },
  props: {
    picUrl: [String]
  },
  data() {
    return {
      playerOptions: {
        // videojs options
        muted: true,
        language: 'zh-CN',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src: ''
          }
        ],
        poster: '',
        muted: false,
        preload: 'auto',
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        aspectRatio: '16:9',
        fluid: true,
        controlBar: {
          timeDivider: false, //不显示时间分割线‘/’，因为要把剩余时间放到进度条右边
          durationDisplay: false,
          remainingTimeDisplay: true,
          fullscreenToggle: true //全屏按钮
        }
      }
    }
  },
  props: {
    mvid: {
      type: [String, Number],
      default: ''
    }
  },

  watch: {
    picUrl(newVal) {
      this.playerOptions.poster = newVal
    }
  },
  methods: {
    ...mapMutations(['setSongState','setSongInfo']),
    async getMVLink() {
      const {
        data: { code, data }
      } = await this.$api.mvLink({ id: this.mvid, r: 1080 })
      if (code === 200) {
        this.playerOptions.sources[0].src = data.url
      }
    },
    onPlayerPlay() {
      this.setSongState(false)
      this.setSongInfo({})
    }
  },
  watch: {
    mvid(newVal) {
      this.mvid = newVal
      this.getMVLink()
    }
  },
  created() {
    this.getMVLink()
  }
}
</script>
<style lang="scss">
#video-box {
  .video-player-box {
    /*播放按钮设置成宽高一致，圆形，居中*/
    .video-js .vjs-big-play-button {
      background-color: rgba(0, 0, 0, 0.45);
      font-size: 50px;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      outline: none;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
    }
    /*进度条背景轨道*/
    .video-js .vjs-slider {
      border-radius: 16px;
      height: 5px;
      .vjs-load-progress {
        border-radius: 16px;
        overflow: hidden;
      }
      .vjs-slider-bar {
        border-radius: 16px;
      }
    }
    /*进度条进度*/
    .video-js .vjs-play-progress,
    .video-js .vjs-volume-level {
      border-radius: 16px;
    }
    /*鼠标进入播放器后，播放按钮颜色会变*/
    .video-js:hover .vjs-big-play-button,
    .video-js .vjs-big-play-button:active,
    .video-js .vjs-big-play-button:focus {
      background-color: rgba(0, 0, 0, 0.2) !important;
    }
    /*control bar*/
    .video-js .vjs-control-bar {
      background-color: rgba(0, 0, 0, 0.2) !important;
      .vjs-playback-rate {
        .vjs-playback-rate-value {
          font-size: 16px;
          line-height: 2.5;
        }
      }
    }
    /*点击按钮时不显示蓝色边框*/
    .video-js .vjs-control-bar button {
      outline: none;
    }
  }
}
</style>
