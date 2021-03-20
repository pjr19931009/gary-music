<template>
  <div class="comment-field">
    <div class="title">{{ title }}</div>
    <div class="com-box">
      <div class="com-item" v-for="item in data" :key="item.commentId">
        <el-image
          lazy
          :src="item.user.avatarUrl + '?param=55y55'"
          class="pointer"
          @click="hangdlerUser(item)"
        >
          <div slot="placeholder" class="image-slot">
            <div class="dot">加载中...</div>
          </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <div class="right-content">
          <div class="header">
            <div class="u-name">
              <span class="name pointer" @click="hangdlerUser(item)">{{ item.user.nickname }}</span>
              <span class="time">{{ item.time | timeToNow }}</span>
            </div>
            <div class="get-like">
              <i class="iconfont icon-zan"></i>
              <span>({{ item.likedCount }})</span>
            </div>
          </div>
          <div class="text-field">
            <span>{{ item.content }}</span>
            <div class="beReplied" v-if="item.beReplied.length">
              <div class="beReplied-content">
                <span class="beReplied-name">
                  {{ '@' + item.beReplied[0].user.nickname + ':' }}</span
                >
                <span>{{ item.beReplied[0].content }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: [Array],
      default: () => []
    },
    title: [String]
  },
  methods: {
    hangdlerUser(item) {
      this.$emit('hangdlerUser', item)
    }
  }
}
</script>
<style lang="scss" scoped>
.comment-field {
  width: 100%;
  box-sizing: border-box;
  .title {
    padding: 10px 0;
    margin-bottom: 20px;
  }
  .com-box .com-item {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 20px;
    overflow: hidden;
    .el-image {
      flex: 0 0 50px;
      width: 50px;
      height: 50px;
      border-radius: 50px;
      margin-right: 10px;
      .image-slot .dot {
        font-size: 12px;
      }
    }
    .right-content {
      flex: 1;
      width: 0;
      padding: 5px 5px;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .u-name {
          .name {
            font-weight: bold;
            margin-right: 10px;
            &:hover {
              text-decoration: underline;
            }
          }
          .time {
            color: $textColor;
          }
        }
      }
      .text-field {
        margin-top: 10px;
        color: $textColor;
        background: rgba(233, 233, 233, 0.5);
        box-sizing: border-box;
        line-height: 30px;
        padding: 5px 10px;
        overflow: hidden;
        .beReplied {
          background: #ffffff;
          padding: 5px;
          .beReplied-content .beReplied-name {
            color: $activeColor;
          }
        }
      }
    }
  }
}
</style>
