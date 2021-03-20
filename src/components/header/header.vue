<template>
  <div id="header" class="header">
    <!-- navLogo -->
    <router-link to="/home" class="header-logo"></router-link>
    <!-- tabs -->
    <div class="nav-tabs">
      <tabs :data="tabsData" @isActive="isActive"></tabs>
    </div>
    <!-- rightBox -->
    <div class="nav-right-box">
      <!-- search -->
      <div class="nav-search">
        <navSearch></navSearch>
      </div>
      <div class="line"></div>
      <!-- login -->
      <div class="nav-login pointer">
        <div v-if="getLoginState" class="logined" @click="showMore">
          <img :src="getUserAvatar" class="userAvatar" />
          <div class="userNickName">{{ getUserNickname }}</div>
          <div class="userMore" v-show="profileShow" @click="showMore">
            <div class="userPage">
              <span class="link" @click="personalClick">个人中心</span>
            </div>
            <div class="userLevel">
              <span class="link" @click="personalClick">用户等级</span>
            </div>
            <div class="userSettings">
              <span class="link" @click="personalClick">个人设置</span>
            </div>
            <div class="logout" @click="logout">退出登录</div>
          </div>
        </div>
        <div class="go-login" @click="goLogin" v-else>登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import tabs from './tabs/tabs'
import navSearch from './navSearch/navSearch'
export default {
  components: {
    tabs,
    navSearch
  },
  data() {
    return {
      tabsData: ['发现音乐', '排行榜', '歌单', '歌手', 'MV'],
      profileShow: false,
      avatarUrl: require('@/assets/images/avatar.png')
    }
  },
  methods: {
    // 跳转login界面
    goLogin() {
      this.$router.push('/login')
    },
    // 保存本地tabs状态
    saveActive(val) {
      sessionStorage.setItem('currentTab', val)
      this.setStoreActive(val)
    },
    // 页面刷新保持tabs状态
    refresh() {
      const active = sessionStorage.getItem('currentTab')
      if (active) {
        this.active = active
        this.setStoreActive(active)
      }

    },
    // 保存tabs状态到vuex
    setStoreActive(value) {
      this.$store.commit('setTabIndex', value)
    },

    // 显示profilemore
    showMore() {
      this.profileShow = !this.profileShow
    },
    // 登出
    logout() {
      this.$router.push('/login')
      this.$localStore.remove('isLogin')
    },
    // tags点击
    isActive(val) {
      this.$emit('gotabs', val)
      this.saveActive(val)
    },
    // 个人信息
    personalClick() {
      this.$message({
        message: '暂无功能',
        offset: 100
      })
    }
  },
  computed: {
    getLoginState() {
      return this.$store.state.users.isLogin
    },
    getUserAvatar() {
      return this.avatarUrl
    },
    getUserNickname() {
      return '游客'
    }
  },

  created() {
    this.refresh()
  }
}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: $navHeight;
  background: $white;
  padding: 0 $layoutPadding;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  position: fixed;
  box-sizing: border-box;
  z-index: 9999;
  .header-logo {
    flex: 0 8 150px;
    height: 100%;
    background: $white url('../../assets/images/navLogo.png') no-repeat left;
    cursor: pointer;
    display: block;
  }
  .nav-tabs {
    flex: 3 1 500px;
    height: 100%;
    background: $white;
    box-sizing: border-box;
  }
  .nav-right-box {
    flex: 0 1 180px;
    height: 100%;
    background: $white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    // .nav-search {
    // }
    .line {
      margin: 0 10px;
    }
    .nav-login {
      .logined {
        width: 120px;
        display: flex;
        align-items: center;
        position: relative;

        .userAvatar {
          width: 40px;
          height: 40px;
          border-radius: 40px;
          margin-right: 10px;
        }
        .userNickName {
          display: flex;
          align-items: center;
          &::after {
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            border-right: 1px solid #000000;
            border-bottom: 1px solid #000000;
            margin-left: 10px;
            margin-bottom: 2px;
            transform: rotate(45deg);
          }
        }
        .userMore {
          width: 100%;
          position: absolute;
          right: 0;
          left: 0;
          top: 50px;
          margin: auto;
          text-align: center;
          border-radius: 5px;
          font-size: 12px;
          overflow: hidden;
          z-index: 9999;
          div {
            width: 100%;
            padding: 15px 5px;
            background: $white;
            border-bottom: 1px solid #efefef;
            box-sizing: border-box;
            .link {
              color: #000000;
            }
          }
        }
      }
    }
  }
}
</style>
