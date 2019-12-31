import api from '@/assets/js/request.js'

/*
* 获取信息列表
*/
export function getList(data) {
  return api.request({
    method: 'post',
    url: '/news/getList/',
    data
  })
}

/*
* 添加信息 
*/
export function addList(data) {
  return api.request({
    method: 'post',
    url: '/news/add/',
    data
  })
}