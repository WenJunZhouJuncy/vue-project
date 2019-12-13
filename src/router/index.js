import Vue from 'vue'
import VueRouter from 'vue-router'
import console from './module/console'
import messageManage from './module/messageManage'
import users from "./module/users";
import login from "./module/login";
Vue.use(VueRouter);
const routes = [
  {
    path: '/home',
    name: 'home',
    redirect:'/home/console',
    meta:{
      name:'主页',
    },
    component: () => import('@/views/home/index.vue'),
    children:[
      console,
      messageManage,
      users
    ]
  },
  login,
  {
    path:'/',
    redirect:'/login'
  }
];

const router = new VueRouter({
    routes
});

export default router;