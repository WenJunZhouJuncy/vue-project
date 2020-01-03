// /news/getCategory/
import api from "@/assets/js/request.js";

//获取子级分类/news/getCategoryAll/
export function apiGetCategoryAll(data) {
  return api.request({
    method: 'post',
    url: '/news/getCategoryAll/',
    data
  })
}

//添加一级分类
export function apiAddFirstCategory(data) {
  return api.request({
    method: 'post',
    url: '/news/addFirstCategory/',
    data
  })
}

// 修改分类
export function apiEditCategory(data) {
  return api.request({
    method: 'post',
    url: '/news/editCategory/',
    data
  })
}

// 删除分类
export function apiDeleteCategory(data) {
  return api.request({
    method: 'post',
    url: '/news/deleteCategory/',
    data
  })
}

//添加子级分类
export function apiAddChildrenCategory(data) {
  return api.request({
    url: '/news/addChildrenCategory/',
    method: 'post',
    data
  })
}