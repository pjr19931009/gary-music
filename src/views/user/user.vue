<template>
  <div class="user-container" v-if="userData">
    <div class="bgimg"></div>
    <div class="u-1">
      <div>
        <div
          :style="{
            background: `url(${userData.profile.backgroundUrl}) no-repeat center center`,
            backgroundSize: 'cover',
            height: '140px'
          }"
        ></div>
        <img :src="userData.profile.avatarUrl + '?param=80y80'" />
        <span class="username">{{ userData.profile.nickname }}</span>
        <div class="profile">
          <div>等级: {{ userData.level }}</div>
          <div>生日: {{ userData.profile.birthday | timestampToDate }}</div>
          <div>
            签名: <span :title="userData.profile.signature">{{ userData.profile.signature }}</span>
          </div>
        </div>
        <ul class="follow">
          <li>
            动态 <span>{{ userData.profile.eventCount }}</span>
          </li>
          <li>
            关注 <span>{{ userData.profile.follows }}</span>
          </li>
          <li>
            粉丝 <span>{{ userData.profile.followeds }}</span>
          </li>
        </ul>
        <div class="setting">
          <a href="javascript:void(0)" @click="handlerSetting">关注</a>
          <a href="javascript:void(0)" @click="handlerSetting">私信</a>
        </div>
      </div>
    </div>
    <div class="u-2">
      <p class="title">用户歌单</p>
      <div class="u-2-content">
        <div class="item pointer" v-for="item in userPlaylist" :key="item.id">
          <list-item :item="item" />
        </div>
      </div>
    </div>
    <div class="u-3">
      <div class="title fans">他的粉丝</div>
      <template v-if="followeds.length">
        <div v-for="item in followeds" :key="item.userId" @click="toUserPage(item)" class="u-fans">
          <el-image lazy :src="item.avatarUrl + '?param=50y50'">
            <div slot="placeholder" class="image-slot">
              <div class="dot">加载中...</div>
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <span>{{ item.nickname }}</span>
        </div>
      </template>
      <template v-else>
        <div class="no-data">
          暂无粉丝
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import listItem from '@/components/playlist/listItem/listItem'
export default {
  components: { listItem },
  data() {
    return {
      userData: null,
      userPlaylist: [],
      followeds: []
    }
  },

  watch: {
    '$route.query'(newVal) {
      this.init()
    }
  },
  methods: {
    //获取用户信息
    async getUserData(uid) {
      const { data, status } = await this.$api.userData({ uid })
      if (status === 200) {
        this.userData = data
      }
    },
    //获取用户歌单
    async getUserPlaylist(uid) {
      const {
        data: { code, playlist }
      } = await this.$api.userPlaylist({ uid })
      if (code === 200) {
        this.userPlaylist = this.$utils.rankData(playlist)
      }
    },
    //获取用户粉丝
    async getUserFolloweds(uid) {
      const {
        data: { code, followeds }
      } = await this.$api.userFolloweds({ uid })
      if (code === 200) {
        this.followeds = followeds
      }
    },
    // 个人设置
    handlerSetting() {
      this.$message.error('暂无功能')
    },
    toUserPage(item) {
      this.$router.push({ path: '/user', query: { uid: item.userId } })
    },
    init() {
      const id = this.$route.query.uid
      this.getUserData(id)
      this.getUserPlaylist(id)
      this.getUserFolloweds(id)
    }
  },
  created() {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.bgimg {
  &:before {
    content: '';
    width: 100%;
    height: 250px;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 70px;
    background: url(../../assets/images/personal.jpg) no-repeat 0 -350px fixed;
    pointer-events: none;
    z-index: 2;
  }
}
.user-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  height: 200vh;

  .u-2 {
    flex: 1 1 640px;
    background-color: #ffffff;
    margin: 250px 20px 20px 20px;
    border-radius: 10px;
    overflow: hidden;

    .u-2-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      .item {
        margin: 0 2.5% 20px 2.5%;
        flex: 0 0 20%;

        border-radius: 5px;
      }
    }
  }

  .u-1,
  .u-3 {
    flex: 1 1 350px;
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
  }

  .u-1 {
    position: relative;
    margin-top: 180px;
    z-index: 99;

    img {
      vertical-align: middle;
      margin: -40px 0 0 20px;
    }

    .username {
      padding: 0 20px;
      font-weight: 700;
      font-size: 15px;
    }

    .profile {
      margin-top: 20px;
      padding: 0 20px;

      div {
        height: 20px;
        margin: 5px 0;
        padding: 0 20px;
        box-sizing: border-box;
        position: relative;
        line-height: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;

        &::before {
          content: '';
          width: 5px;
          height: 5px;
          border-radius: 50%;
          display: block;
          background: $activeColor;
          position: absolute;
          left: 10px;
          top: 0;
          bottom: 0;
          margin: auto;
        }
      }
    }

    .follow {
      display: flex;
      justify-content: space-around;
      padding: 20px;
      color: #9089be;

      li span {
        display: block;
        text-align: center;
        margin-top: 10px;
      }
    }

    .setting {
      width: 100%;
      padding: 20px 40px;
      box-sizing: border-box;

      a {
        color: #ffffff;
        display: inline-block;
        width: 40%;
        margin: 0 5%;
        text-align: center;
        line-height: 40px;
        border-radius: 5px;
        background: linear-gradient(90deg, rgb(255, 75, 43), rgb(255, 65, 108));
      }
    }
  }

  .u-3 {
    margin-top: 250px;
    padding: 10px;
    box-sizing: border-box;
    .u-fans {
      cursor: pointer;
      .el-image {
        width: 50px;
        height: 50px;
        vertical-align: middle;
        .image-slot .dot {
          font-size: 12px;
        }
      }
      span {
        padding: 10px;
      }

      + div {
        border-top: 1px solid #eeeeee;
      }

      &:hover {
        background: #5e5f5c;
        color: #ffffff;
      }
    }

    .fans {
      padding: 10px 0;
    }
  }
}
</style>
