// 登录路由
const login ={
    path: '/login',
    name: 'login',
    meta:{
        name:'登录',
    },
    component: () => import('@/views/login/index.vue')
}

export default login