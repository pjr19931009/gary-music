<template>
  <div class="mv-item" v-if="item">
    <div class="mv-desc" @click="mvClick">
      <el-image class="mv-img" :src="imgObj" lazy>
        <div slot="placeholder" class="image-slot"><div class="dot">加载中...</div></div>
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <div class="mv-count">
        <i class="iconfont icon-bofang"></i>{{ item.playCount | unitConverter }}
      </div>
      <div class="mv-info">
        <span class="mv-artistName">{{ item.artistName }}</span>
        <span class="mv-duration">{{ item.duration | formatDuring }}</span>
      </div>
      <div class="mask pointer"></div>
    </div>
    <div class="mv-name pointer" @click="mvClick">{{ item.name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: [Object],
      default: null
    }
  },
  methods: {
    mvClick() {
      this.$emit('mvClick', this.item)
    }
  },
  computed: {
    imgObj() {
      return this.item.cover || this.item.imgurl16v9 + '?param=480y250'
    }
  }
}
</script>
<style lang="scss" scoped>
.mv-item {
  width: 100%;
  margin-bottom: 10px;
  .mv-desc {
    width: 100%;
    position: relative;
    padding-top: 55%;
    overflow: hidden;
    .el-image {
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
    }
    .mv-info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 30px;
      color: #ffffff;
      background: rgba(0, 0, 0, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .mv-count {
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
      .icon-bofang {
        margin-left: -4px;
        transform: scale(0.8);
      }
    }
    .mask {
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      background: transparent;
      &:hover {
        background: rgba(0, 0, 0, 0.3);
        &::after {
          content: '';
          position: absolute;
          display: block;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          background: $activeColor;
          border-radius: 20px;
        }
        &::before {
          content: '';
          position: absolute;
          display: block;
          left: 50%;
          top: 50%;
          transform: translate(-65%, -50%) rotate(45deg);
          border-top: 12px solid #ffffff;
          border-left: 12px solid transparent;
          border-bottom: 0px;
          border-right: 0px;
          z-index: 99;
        }
      }
    }
  }
  .mv-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 5px 0;
    color: #5c5c5c;
    display: inline-block;
    max-width: 100%;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
