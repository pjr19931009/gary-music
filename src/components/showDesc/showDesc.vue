<template>
  <div class="desc-all">
    <div @click="dialogVisible = true" class="pointer">全部></div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <pre>{{ content }}</pre>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: [String],
      default: ''
    },
    title: {
      type: [String],
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  }
}
</script>
<style lang="scss">
.desc-all {
  .el-dialog {
    .el-dialog__header {
      padding: 10px;
    }
    .el-dialog__body {
      padding: 10px;
    }
  }
}
.desc-all {
  color: #ff0000;
}
pre {
white-space: pre-wrap;
word-wrap: break-word;
}
</style>
