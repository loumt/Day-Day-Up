import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import http from './request'


import Win from 'electron-vue-windows'
import './assets/icon/iconfont.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入动画样式css
import './assets/transform/transform.css'

Win.init(router,{
  freeWindowNum: 2,
  port: 9080
})
Vue.prototype.$Win = Win
Vue.use(ElementUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
Vue.$http = Vue.prototype.$http = http

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
