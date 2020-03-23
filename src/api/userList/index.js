import api from '@/assets/js/request.js'

//获取信息列表
export function apiGetListMsg(data) {
  return api.request({
    method: 'post',
    url: '/news/getList/',
    data
  })
}