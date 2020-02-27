// 控制台路由
const console = {
    path: '/console',
    name: 'console',
    icon: 'el-icon-s-tools',
    meta:{
        name:'首页',
    },
    component: () => import('@/views/console/index.vue'),
}
export default console;