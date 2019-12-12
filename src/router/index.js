import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
const routes = [
  {
    path: '/home',
    name: 'home',
    meta:{
      name:'主页',
    },
    component: () => import('@/views/home/index.vue'),
    children:[
      {
        path: '/home/console',
        name: 'console',
        meta:{
          name:'控制台',
        },
        component: () => import('@/views/console/index.vue'),
      },
      {
        path: '/home/messageManage',
        name: 'messageManage',
        meta:{
          name:'信息管理',
        },
        component: () => import('@/views/messageManage/index.vue'),
        children:[
          {
            path:'/home/messageManage/messageList',
            name:'messageList',
            meta:{
              name:'信息列表',
            },
            component:() => import('@/views/messageManage/messageList/index')
          },
          {
            path:'/home/messageManage/messageClassify',
            name:'messageClassify',
            meta:{
              name:'信息分类',
            },
            component:() => import('@/views/messageManage/messageClassify/index')
          },
        ]
      },
      {
        path: '/home/users',
        name: 'users',
        meta:{
          name:'用户管理',
        },
        component: () => import('@/views/users/index.vue'),
        children:[
          {
            path:'/home/users/userList',
            name:'userList',
            meta:{
              name:'用户列表',
            },
            component:() => import('@/views/users/userList/index')
          },
          {
            path:'/home/users/userMessage',
            name:'userMessage',
            meta:{
              name:'用户信息',
            },
            component:() => import('@/views/users/userMessage/index')
          },
        ]
      },
    ]
  },
  {
    path: '/',
    redirect:'/login',
  },
  {
    path: '/home',
    redirect:'/home/console',
  },
  {
    path: '/login',
    name: 'login',
    meta:{
      name:'登录',
    },
    component: () => import('@/views/login/index.vue')
  },
];

const router = new VueRouter({
    routes
});

export default router;