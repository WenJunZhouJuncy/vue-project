import api from '@/assets/js/request'

// 获取分类/news/getCategory/
export function apiUploadImgToken(data) {
  return api.request({
    method: 'post',
    url: '/uploadImgToken/',
    data
  })
}

// 加载封装的表格数据
export function apiLoadTableData(parmas) {
  return api.request({
    method: 'post',
    data: {},
    ...parmas
  })
}

// 删除封装的表格数据
export function apiDeleteTableData(parmas) {
  console.log(parmas);
  return api.request({
    method: 'post',
    data: {},
    ...parmas
  })
}

//获取省、市、区、街道
export function apiLoadRegion(data) {
  return api.request({
    url: '/cityPicker/',
    method: 'post',
    data
  })
}