import router from '../index';
import {getToken} from '@/assets/js/token';
// 路由拦截
router.beforeEach((to,from,next) =>{
  if (getToken()){
    next()
  }else if ('/login'.indexOf(to.path) !== -1){
    next()
  }else {
    next('/login')
  }
})