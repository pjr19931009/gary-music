<template>
  <div class="mv-detail">
    <div class="video-box">
      <video-player :picUrl="picUrl" :mvid="mvid" />
      <div class="video-title">
        <i class="iconfont icon-MV"></i>
        <span class="text">{{ mvData.name }}</span>
      </div>
      <div class="tag">
        <span v-for="item in mvData.videoGroup" :key="item.id">
          {{ '#' + item.name }}
        </span>
      </div>
      <div class="mvt-mvpc">
        <span>{{ '发布: ' + mvData.publishTime }}</span>
        <span>{{ '播放次数: ' + mvData.playCount }}</span>
      </div>
      <div class="tip">
        <div class="coll">
          <i class="iconfont icon-shoucang1 pointer"></i><span>{{ mvData.subCount }}</span>
        </div>
        <div class="share">
          <i class="iconfont icon-fenxiang pointer"></i><span>{{ mvData.shareCount }}</span>
        </div>
      </div>
      <div class="comment">
        <i class="iconfont icon-comment"></i>
        <span>Comments</span>
        <span> | </span>
        <span>{{ mvData.commentCount + '条评论' }}</span>
      </div>
      <div class="user">
        <i class="iconfont icon-yonghu"></i>
        <span>游客,你好</span>
        <div class="avatar">
          <img src="@/assets/images/top-bg.jpg" />
          <textarea class="comment-content" placeholder="暂不支持登录，不能评论哦"></textarea>
          <div class="comment-button pointer">评论</div>
        </div>
      </div>
      <comment-field
        :data="hotComments"
        :title="'精彩评论'"
        v-if="hotComments"
        @hangdlerUser="hangdlerUser"
      />
      <comment-field :data="comments" :title="'全部评论'" @hangdlerUser="hangdlerUser" />
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="options.limit"
        layout="prev, pager, next, jumper"
        :total="mvData.commentCount"
        background
      >
      </el-pagination>
    </div>
    <div class="aside">
      <div class="mv-desc">
        <div class="title">mv简介</div>
        <div class="text" v-if="mvDesc">{{ mvDesc }}</div>
        <div class="text" v-else>暂无简介</div>
      </div>

      <div class="mv-recommend">
        <div class="title">相关推荐</div>
        <template v-if="simiMv.length">
          <div class="content" v-for="item in simiMv" :key="item.id">
            <el-image
              lazy
              :src="item.cover + '?param=320y180'"
              class="pointer"
              @click="goMv(item.id)"
            >
              <div slot="placeholder" class="image-slot">
                <div class="dot">加载中...</div>
              </div>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <div>
              <i class="iconfont icon-MV"></i
              ><span class="pointer" @click="goMv(item.id)">{{ item.name }}</span>
            </div>
            <div>
              <span>{{ 'by ' + item.artistName }}</span>
            </div>
          </div>
        </template>
        <div class="content" v-else>暂无相关推荐</div>
      </div>
    </div>
  </div>
</template>

<script>
import videoPlayer from '@/components/videoPlayer/videoPlayer'
import commentField from './commentField/commentField'
export default {
  components: {
    videoPlayer,
    commentField
  },
  data() {
    return {
      mvid: 0,
      mvData: {},
      picUrl: '',
      comments: [],
      hotComments: [],
      mvDesc: '',
      options: {
        id: this.$route.query.mvid,
        limit: 20,
        offset: 0,
        //分页参数,取上一页最后一项的 time 获取下一页数据
        before: ''
      },
      currentPage: 0,
      simiMv: []
    }
  },

  methods: {
    async getMVData() {
      const {
        data: { code, data }
      } = await this.$api.mvData({ mvid: this.mvid })
      if (code === 200) {
        this.mvData = data
        this.picUrl = data.cover + '?param=950y535'
        this.mvDesc = data.desc

        this.mvData = data
      }
    },
    async getComment() {
      const {
        data: { code, comments, hotComments }
      } = await this.$api.commentMV(this.options)
      if (code === 200) {
        this.comments = comments
        this.hotComments = hotComments
      }
    },
    async simiMV() {
      const {
        data: { code, mvs }
      } = await this.$api.simiMV({ mvid: this.mvid })
      if (code === 200) {
        this.simiMv = mvs
      }
    },

    handleCurrentChange(val) {
      this.options.offset = (val - 1) * this.options.limit
      this.currentPage = val
      this.getComment()
    },
    goMv(id) {
      this.$router.push('/mv-detail?mvid=' + id)
    },
    // 查询用户
    hangdlerUser(item) {
      this.$router.push({ name: 'user', query: { uid: item.user.userId } })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.mvid = this.options.id = to.query.mvid
    this.getMVData()
    this.getComment()
    this.simiMV()
    next()
  },
  created() {
    this.mvid = this.$route.query.mvid
    this.getMVData()
    this.getComment()
    this.simiMV()
  }
}
</script>
<style lang="scss" scoped>
.mv-detail {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;

  .video-box {
    flex: 1;
    width: 0;
    background-color: #fff;
    margin-right: 10px;
    padding: 10px;

    .video-title {
      font-size: 16px;
      padding: 10px 0;
      .text {
        font-weight: bold;
        color: #3a3a3a;
        display: inline-block;
      }
      .icon-MV {
        font-size: 25px;
        color: #ff0000;
        margin-right: 10px;
        vertical-align: middle;
      }
    }
    .tag {
      color: $activeColor;
      span {
        font-size: 14px;
        padding: 0 5px 0 0;
      }
    }
    .mvt-mvpc {
      color: $textColor;
      margin: 10px 0;
      span {
        margin: 0 20px 10px 0;
      }
    }
    .tip {
      margin-bottom: 40px;
      .coll,
      .share {
        i {
          padding: 5px;
          vertical-align: top;
          font-size: 16px;
        }
        display: inline-block;
        margin-right: 20px;
        border-radius: 50px;
        padding: 5px 15px;
        font-size: 16px;
        background-color: rgba(233, 233, 233, 0.7);
      }
    }
    .comment {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      margin-bottom: 20px;
      i {
        font-size: 30px;
        vertical-align: middle;
      }
      span {
        padding: 5px;
      }
    }
    .user {
      padding: 5px;
      i {
        font-size: 20px;
        margin-right: 10px;
      }
      .avatar {
        margin: 10px 0;
        img {
          width: 55px;
          height: 55px;
          vertical-align: top;
          border-radius: 5px;
          margin-right: 10px;
        }
        .comment-content {
          width: calc(100% - 75px);
          height: 50px;
          resize: none;
          outline: none;
          background: #f8f9ff;
          border: 1px solid #e4e5e3;
          color: $textColor;
          line-height: 30px;
        }
        .comment-button {
          width: 80px;
          height: 35px;
          color: #ffffff;
          line-height: 35px;
          text-align: center;
          background: linear-gradient(90deg, #ff4b2b, #ff416c);
          margin-left: calc(100% - 85px);
          margin-top: 10px;
        }
      }
    }
  }
  .aside {
    box-sizing: border-box;
    flex: 0 0 350px;

    .title {
      font-size: 16px;
      padding: 0;
      margin-bottom: 10px;
    }
    .mv-desc,
    .mv-recommend {
      padding: 10px;
      background-color: #fff;
      margin-bottom: 10px;
      .text,
      .content {
        color: $textColor;
        line-height: 20px;
        padding: 5px;
        margin-bottom: 20px;
        .el-image {
          width: 320px;
          height: 180px;
          display: block;
          margin-bottom: 10px;
        }
        span {
          &:hover {
            text-decoration: underline;
          }
        }
        .icon-MV {
          color: $activeColor;
          font-size: 20px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
