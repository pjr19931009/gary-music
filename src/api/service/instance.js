import Axios from 'axios'
import config from '../config'
let { api_base_url: baseURL } = config

const instance = new Axios.create({
  baseURL,
  timeout: 100000
})

/**
 * @description 请求方法
 * @param {String} url [请求的url地址]
 * @param {Object} params [get请求时携带的参数]
 * @param {Object} data [post请求时携带的参数]
 * @param {Object} options [请求时其他配置参数]
 */

const request = {
  get(url, params, options = {}) {
    return new Promise((resolve, reject) => {
      instance
        .get(baseURL + url, {
          params,
          ...options
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  post(url, data, options = {}) {
    return new Promise((resolve, reject) => {
      instance
        .post(baseURL + url, data, { ...options })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
export default request

/*
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
*/
