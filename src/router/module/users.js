// 用户管理路演
const users = {
    path: '/home/users',
    name: 'users',
    icon: 'el-icon-user-solid',
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
}

export default users;