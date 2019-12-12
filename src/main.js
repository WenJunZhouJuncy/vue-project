import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import '@/assets/css/overall.css';
import Cookies from 'js-cookie';
Vue.prototype.axios = axios;
Vue.prototype.Cookies = Cookies;
// Vue.component('abc',{
//   template:'<div>123132</div>'
// })

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
