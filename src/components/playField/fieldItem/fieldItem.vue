<template>
  <div class="field-item pointer ">
    <div class="item">
      <!-- 按钮 -->
      <div class="play-btn pointer">
        <div v-show="!playStatus">
          <i class="iconfont  icon-bofang1" v-show="!playStatus"></i>
        </div>
        <i class="iconfont icon-zanting" v-show="playStatus"></i>
      </div>

      <!-- 描述:歌手 歌曲头像 歌名   -->
      <div class="song-avatar">
        <el-image :src="picUrl" :fit="'contain'"> </el-image>
      </div>
      <div :class="['song-desc', { active: playStatus }]">
        <div class="song-name">
          {{ songName }}
        </div>
        <div class="song-artist">
          {{ artName }}
        </div>
        <div class="song-album">
          {{ album }}
        </div>
      </div>

      <!-- 总时长 -->
      <div class="song-time" :class="{ active: playStatus }" v-if="duration">
        {{ duration | formatDuring }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: [Object],
      default: () => {}
    },
    playStatus: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    artName() {
      if (this.item && this.item.hasOwnProperty('art')) {
        return this.$utils.artName(this.item.art)
      }
    },
    duration() {
      return Math.floor(this.item.duration * 1000)
    },
    songName() {
      if (this.item && this.item.hasOwnProperty('name')) {
        return '<' + this.item.name + '>'
      }
    },
    picUrl() {
      if (this.item && this.item.hasOwnProperty('picUrl')) {
        return this.item.picUrl + '?param=130y130'
      }
    },
    album() {
      if (this.item && this.item.hasOwnProperty('album')) {
        return this.item.album.name
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.field-item {
  width: 100%;
  background-color: transparent;
  padding: 5px 10px;
  box-sizing: border-box;
  color: $textColor;

  box-sizing: border-box;
  .item {
    width: 100%;
    height: 100%;
    display: flex;

    .play-btn {
      flex: 0 0 25px;
      height: 100%;
      display: flex;
      align-items: center;
      text-align: center;
      .iconfont {
        font-size: 24px;
      }
      .icon-zanting {
        color: $activeColor;
      }
      .serialNumber {
        text-align: center;
        padding-left: 5px;
      }
    }

    .song-desc {
      flex: 0 1 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .song-name,
      .song-artist,
      .song-album {
        width: 0;
        flex: 1 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-left: 1%;
        text-align: center;
      }
    }

    .song-avatar {
      flex: 0 0 auto;
    }

    .song-time {
      flex: 0 0 60px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}

.active {
  color: $activeColor;
}
</style>
