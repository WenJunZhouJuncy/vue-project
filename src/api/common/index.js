import api from '@/assets/js/request'

// 获取分类/news/getCategoryAll/   /news/getCategory/
function apiGetCategory() {
  return api.request({
    method: 'post',
    url: '/news/getCategory/',
  })
}

export function commonGetCategory() {
  return new Promise((resolve, reject) => {
    apiGetCategory()
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      });
  });
}