// 信息管理路由
const messageManage = {
  path: '/messageManage',
  name: 'messageManage',
  icon: 'el-icon-info',
  meta:{
    name:'信息管理',
  },
  component: () => import('@/views/messageManage/index.vue'),
  children:[
    {
      path:'/messageManage/messageList',
      name:'messageList',
      meta:{
        name:'信息列表',
      },
      component:() => import('@/views/messageManage/messageList/index')
    },
    {
      path:'/messageManage/messageClassify',
      name:'messageClassify',
      meta:{
        name:'信息分类',
      },
      component:() => import('@/views/messageManage/messageClassify/index')
    },
    {
      path:'/messageManage/messageEdit',
      name:'messageEdit',
      hidden: true,
      meta:{
        name:'信息编辑',
      },
      component:() => import('@/views/messageManage/messageEdit/index')
    }
  ]
};

export default messageManage;
