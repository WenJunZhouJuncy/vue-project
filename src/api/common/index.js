import api from '@/assets/js/request'

// 获取分类/news/getCategory/
export function apiUploadImgToken(data) {
  return api.request({
    method: 'post',
    url: '/uploadImgToken/',
    data
  })
}