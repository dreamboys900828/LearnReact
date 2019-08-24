import axios from 'axios';
import { Toast } from 'antd-mobile'

axios.defaults.baseURL = 'https://elm.cangdu.org';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // console.log( '请求发生了', config )
    Toast.loading('Loading...', 0);
    // 在发送请求之前做些什么 可以加载动画
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么 清除动画
    setTimeout(() => {
      Toast.hide();
    }, 2000)
    
    // console.log( '请求完成了', response )
    return response;
  }, function (error) {
    Toast.fail('服务器错误，稍后再试');
    // 对响应错误做点什么
    return Promise.reject(error);
  });