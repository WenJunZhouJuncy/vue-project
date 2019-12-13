// 控制台路由
const console = {
    path: '/home/console',
    name: 'console',
    icon: 'el-icon-s-tools',
    meta:{
        name:'控制台',
    },
    component: () => import('@/views/console/index.vue'),
}
export default console;