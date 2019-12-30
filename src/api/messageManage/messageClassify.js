// /news/getCategory/
import api from "@/assets/js/request.js";

/*
* 添加一级分类
*/
export function addFirstCategory(data) {
  return api.request({
    method: 'post',
    url: '/news/addFirstCategory/',
    data
  })
}

// 获取分类
export function getCategory() {
  return api.request({
    method: 'post',
    url: '/news/getCategory/',
  })
}

// 修改分类
export function editCategory(data) {
  return api.request({
    method: 'post',
    url: '/news/editCategory/',
    data
  })
}

// 删除分类
export function deleteCategory(data) {
  return api.request({
    method: 'post',
    url: '/news/deleteCategory/',
    data
  })
}
