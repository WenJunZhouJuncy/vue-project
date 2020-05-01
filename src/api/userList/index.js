import api from '@/assets/js/request.js'

//获取信息列表
export function apiGetListMsg(data) {
  return api.request({
    method: 'post',
    url: '/news/getList/',
    data
  })
}

// 获取角色
export function apiGetRole(data) {
  return api.request({
    method: 'post',
    url: '/role/',
    data
  })
}

// 获取用户列表/user/getList/
export function apiUserList(data) {
  return api.request({
    method: 'post',
    url: '/user/getList/',
    data
  })
}

// 添加用户/user/add/
export function apiUserAdd(data) {
  return api.request({
    method: 'post',
    url: '/user/add/',
    data
  })
}

// 用户禁启用 /user/actives/
export function apiUserActives(data) {
  return api.request({
    method: 'post',
    url: '/user/actives/',
    data
  })
}