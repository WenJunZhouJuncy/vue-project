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