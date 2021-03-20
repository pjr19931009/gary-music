<template>
  <div class="sub-list">
    <div
      class="sub-avatar pointer"
      v-for="item in imgArr"
      :key="item.userId"
      @click="hanlderClick(item)"
    >
      <el-image lazy :src="item.picUrl" />
      <span>{{ item.nickname }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgArr: {
      type: [Array],
      default: () => []
    }
  },

  methods: {
    hanlderClick(item) {
      this.$emit('hanlderClick', item)
    }
  }
}
</script>
<style lang="scss" scoped>
.sub-list {
  display: flex;
  flex-direction: column;
  .sub-avatar {
    flex: 0 0;
    margin: 5px;
    .el-image {
      vertical-align: middle;
    }
    span {
      padding: 0 20px;
    }
    &:hover {
      background: #eeeeee;
    }
  }
}
</style>
