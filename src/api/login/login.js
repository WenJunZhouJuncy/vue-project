import api from "@/assets/js/request.js";

/*
* 获取验证码
*/
export function getSms(data){
    return api.request({
        method: 'post',
        url: '/getSms/',
        data
    })
}
/*
* 登录
*/
export function getLogin(data) {
    return api.request({
        method:'post',
        url:'/login/',
        data
    })
}

/*
* 注册
*/
export function getRegister(data) {
    return api.request({
        method:'post',
        url:'/register/',
        data
    })
}