<template>
  <div class="list-item pointer">
    <div class="item-image" @click="itemClick">
      <el-image lazy :src="item.picUrl + '?param=150y150'" :fit="'contain'">
        <div slot="placeholder" class="image-slot">
          <div class="dot">加载中...</div>
        </div>
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </div>
    <div class="playCount">
      <i class="iconfont icon-bofang"></i>{{ item.playCount | unitConverter }}
    </div>
    <div id="item-title" class="item-title">
      <span @click="itemClick">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: [Object]
  },
  methods: {
    itemClick() {
      this.$router.push(`/playlist-detail?id=${this.item.id}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.list-item {
  position: relative;
  width: 100%;
  .item-image {
    position: relative;
    width: 100%;
    padding-top: 100%;
    .el-image {
      width: 100%;
      border-radius: 5px;
      box-shadow: 10px 10px 10px -6px #888888;
      transition: all 0.2s;
      position: absolute;
      left: 0;
      top: 0;
      overflow: hidden;
      &:hover {
        box-shadow: 10px 10px 10px -6px #5c5c5c;
      }
    }
  }

  .playCount {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 10px;
    color: #ffffff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    padding: 0 3px;
    -webkit-font-smoothing: subpixel-antialiased;
    -webkit-transform: translateZ(0) scale(1, 1);
    .icon-bofang {
      margin-left: -4px;
      transform: scale(0.8);
    }
  }

  .item-title {
    padding: 10px 2px;
    font-size: 14px;
    span {
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-weight: bold;
      color: #5f5f5f;
      &:hover {
        color: #8f8f8f;
        text-decoration: underline;
      }
    }
  }
}

.el-image {
  height: 100%;
  .image-slot {
    height: 100%;
    background: #bdbdbd;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #ffffff;
    vertical-align: middle;
    font-size: 20px;
  }
}
</style>
