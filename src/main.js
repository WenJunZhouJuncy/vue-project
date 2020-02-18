import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import '@/router/routerIntercept';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/overall.css';
import msgPro from '@/assets/js/utility'
// 使用echarts
import echarts from 'echarts'
Vue.prototype.echarts = echarts
Vue.use(msgPro)
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
