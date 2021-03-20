<template>
  <div class="login-container">
    <div class="login_box box-shadow">
      <img src="@/assets/images/p-logo-transparent.png" class="login_box_logo" />
      <div class="input_box">
        <i class="input_icon iconfont icon-shouji-copy"></i>
        <input
          type="text"
          class="phone_input"
          placeholder="随意输入"
          v-model="phoneInput"
          @blur="phoneInpBlur"
        />
        <div class="err_text" v-show="!phoneValidation">
          {{ PhoneErrText }}
        </div>
      </div>

      <div class="input_box">
        <i class="input_icon iconfont icon-denglumima"></i>
        <input
          type="password"
          class="pwd_input"
          placeholder="随意输入"
          v-model="pwdInput"
          @blur="pwdInpBlur"
        />
        <div class="err_text" v-show="!pwdValidation">
          {{ PwdErrText }}
        </div>
      </div>

      <button
        class="login_btn pointer"
        @click="handleLogin"
        v-loading.fullscreen.lock="fullscreenLoading"
      >
        登陆
      </button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      phoneInput: '',
      pwdInput: '',
      phoneValidation: null,
      pwdValidation: null,
      PhoneErrText: '',
      PwdErrText: '',
      fullscreenLoading: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 登陆
    handleLogin() {
      this.loginAsync()
      this.$router.push('/home')
    },
    // 登陆请求
    loginAsync() {
      this.loginStatus(true)
      this.$localStore.set('isLogin', true)

    },
    // 登陆状态
    loginStatus(login, options) {
      return this.$store.dispatch('loginStatus', {login})
    },
    // cookie 7天过期
    setCookies(cookie) {
      let data = new Date().getTime() //先将此时的时间转化为毫秒
      let new_data = new Date(data + 7 * 24 * 60 * 60 * 1000) //将过期时间设置为7天后
      toUTCString() // 将时间根据世界时转换为字符串
      document.cookie = `gary_cookie=${cookie};` + 'expires=' + new_data.toUTCString()
    },
    // 电话号码
    phoneInpBlur() {
      this.verifyPhone()
    },
    // 密码
    pwdInpBlur() {
      this.verifyPwd()
    },
    //Verify phonenumber
    verifyPhone() {
      return true
    },
    //Verify password
    verifyPwd() {
      return true
    }
  }
}
</script>
<style lang="scss" scoped>
$inputHeight: 38px;
$inputWidth: 294px;
.login-container {
  background: $themeColor url('../../assets/images/newbg1.png') no-repeat fixed center;
  height: 100vh;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_box {
    width: 350px;
    height: 500px;
    background: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #fff url('../../assets/images/logbg.jpg') no-repeat bottom;
    .input_box {
      width: $inputWidth;
      height: $inputHeight;
      border: 1px solid #ddd;
      margin-bottom: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      .input_icon {
        min-width: 10%;
        display: block;
        padding: 0 5px;
        text-align: center;
        line-height: $inputHeight;
        box-sizing: border-box;
      }
      input {
        min-width: 90%;
        height: 100%;
      }
      .err_text {
        flex: 1;
        color: #ff0000;
        font-size: 12px;
      }
    }
    .login_btn {
      width: $inputWidth;
      height: $inputHeight;
      outline: none;
      border: none;
      background: $themeColor;
      color: #fff;
      font-weight: bold;
      margin-top: 5px;
    }
    .login_box_logo {
      display: block;
      padding: 50px;
    }
  }
}
</style>
