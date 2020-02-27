import axios from 'axios';
import { Loading } from 'element-ui';
import {getToken, getUsername} from './token.js'

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';

const api = axios.create({//创建拦截器
  baseURL:BASEURL,         //   地址/devApi   == "http://www.web-jshtml.cn/productapi"
  timeout:15000,      //请求过程15秒超时
});
// 数据请求时显示loading
let loading = '';
function load(){
  loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.7)'
  });
}
// 添加请求拦截器
api.interceptors.request.use(
  function(config) {
    load()
    // 在发送请求之前做些什么
    // 添加头部信息
    config.headers.Tokey = getToken();
    config.headers.UserName = getUsername();
    // console.log(config.headers);
    return config;
  },function (error) {
    // 对请求错误做些什么
    load()
    return Promise.reject(error);
});

// 添加响应拦截器
api.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么  response请求成功返回的数据
    let data = response.data;
    if (data.resCode !== 0){
      loading.close();
      return Promise.reject(data);
    }else {
      loading.close();
      return Promise.resolve(data);
    }
  },(error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default api