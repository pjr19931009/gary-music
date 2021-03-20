<template>
  <div class="singer-item-container  pointer">
    <div class="avatar">
      <el-image lazy :src="data.img1v1Url + '?param=130y130'" :fit="'cover'">
        <div slot="placeholder" class="image-slot">
          <div class="dot">加载中...</div>
        </div>
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </div>
    <div class="singer-name">
      {{ data.name }}
    </div>
    <div class="music-size" v-if="data.musicSize">
      {{ `${data.musicSize}首歌曲` }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {
        picUrl: '',
        name: '',
        musicSize: null
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.singer-item-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .avatar {
    width: 100%;
    height: 100%;
    position: relative;
    padding-top: 100%;
  }

  .el-image {
    width: 100%;
    border-radius: 50%;
    box-shadow: 0px 0px 10px 1px #888888;
    transition: all 0.5s;
    vertical-align: middle;
    position: absolute;
    top: 0;
    left: 0;
  }

  .singer-name {
    padding: 10px 0;
    font-weight: bold;
    word-break: break-word;
    text-align: center;
  }

  .music-size {
    color: $activeColor;
  }
}
</style>
