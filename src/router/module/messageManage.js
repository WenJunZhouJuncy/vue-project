// 信息管理路由
const messageManage = {
    path: '/home/messageManage',
    name: 'messageManage',
    icon: 'el-icon-info',
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
};

export default messageManage;
