import router from '../index';
import {getToken} from '@/assets/js/token';
// 路由拦截
router.beforeEach((to,from,next) =>{
  if (getToken()){
    next()
    console.log('token存在');
  }else if ('/login'.indexOf(to.path) !== -1){
    console.log('next()');
    next()
  }else {
    console.log('next(/login)');
    next('/login')
  }
})