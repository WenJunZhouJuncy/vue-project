import api from '@/assets/js/request.js'


//获取信息列表
export function apiGetListMsg(data) {
  return api.request({
    method: 'post',
    url: '/news/getList/',
    data
  })
}

// 添加信息
export function apiAddListMsg(data) {
  return api.request({
    method: 'post',
    url: '/news/add/',
    data
  })
}

// 修改信息
export function apiEditInfo(data) {
  return api.request({
    method: 'post',
    url: '/news/editInfo/',
    data
  })
}

// 删除信息
export function apiDeleteInfo(data) {
  return api.request({
    method: 'post',
    url: '/news/deleteInfo/',
    data
  })
}