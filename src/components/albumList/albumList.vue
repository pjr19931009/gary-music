<template>
  <div class="album">
    <ul class="al-box">
      <li class="al-box pointer" v-for="item in albums" :key="item.id">
        <div class="al-item">
          <el-image lazy :src="item.picUrl + '?param=150y150'" @click="itemClick(item)" />
        </div>
        <p class="al-title" :title="item.name" @click="itemClick(item)">
          {{ item.name }}
        </p>
      </li>
      <li v-for="val in 3" :key="val" class="fill"></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    albums: {
      type: [Array],
      default: () => []
    }
  },
  methods: {
    itemClick(item) {
      this.$message({
        message: '暂无专辑页面',
        offset: 100
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.al-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .al-box {
    flex: 1 0 150px;
    margin: 30px;
    .al-item {
      width: 100%;
      height: 150px;
      background: url(../../assets/images/cd.png) no-repeat right;
      background-size: 150px 150px;
      .el-image {
        width: 150px;
        height: 150px;
        display: block;

        /deep/ .el-image__placeholder {
          background: transparent;
        }
      }
    }
    .al-title {
      font-size: 14px;
      line-height: 20px;
      padding: 5px 5px;
      color: $textColor;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      max-height: 42px;
      box-sizing: border-box;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .fill {
    flex: 1 0 150px;
    height: 0;
    margin: 30px;
  }
}
</style>
