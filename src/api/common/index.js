import api from '@/assets/js/request'

// 获取分类/news/getCategory/
export function apiUploadImgToken(data) {
  return api.request({
    method: 'post',
    url: '/uploadImgToken/',
    data
  })
}

// 加载表格数据
export function apiLoadTableData(parmas) {
  return api.request({
    method: 'post',
    url: '/uploadImgToken/',
    data:'',
  })
}