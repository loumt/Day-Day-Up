import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

//iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView)

Vue.$Message = Vue.prototype.$Message = iView.Message
Vue.config.productionTip = false


new Vue({
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount('#app')
