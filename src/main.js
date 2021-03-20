import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'
import './assets/fonts/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/common.scss'
import './common/elementui.js'
import api from './api'
import localStore from 'store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import * as filters from './common/filters.js'
import * as utils from './common/utils.js'
import 'animate.css/animate.min.css'



Vue.use(VueAwesomeSwiper)
Vue.prototype.$api = api
Vue.prototype.$localStore = localStore
Vue.prototype.$utils = utils
Vue.prototype.$bus = new Vue()

// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
