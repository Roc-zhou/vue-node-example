import axios from 'axios'
import $util from 'rz-methods'
// 创建一个axios实例
const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {

  },
  transformRequest: [function (data) {
    // 在这里可以做加密处理
    return data;
  }],
  transformResponse: [function (data) {
    // 在这里可以做解密处理
    return data;
  }],
});
instance.defaults.headers.post['Content-Type'] = 'application/json';
// 添加请求拦截器
instance.interceptors.request.use((config) => {
  if (config.method == 'get' || config.method == 'delete') {
    config.params = {
      ...config.params,
      ts: (new Date()).valueOf() /*解决IE - GET请求缓存问题*/
    }
  }
  return config
})

// 添加响应拦截器
instance.interceptors.response.use((response) => {
  // TODO
  const ResponseHeaders = response.config.headers,
    data = JSON.parse(response.data),
    sendResponse = {
      sendData: response.config.method === 'post' ? JSON.parse(response.config.data) : response.config.params,
      sendURL: response.config.url
    }
  $util.outPut({
    title: response.config.url,
    content: {
      ResponseHeaders,
      data,
      sendResponse
    },
  })
  if (data.code === 200) return Promise.resolve(data.body)
  return Promise.reject(data)
}, (err) => {
  // 对响应错误做点什么
  let message = ''
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        message = '错误请求'
        break;
      case 401:
        message = '未授权，请重新登录'
        break;
      case 403:
        message = '拒绝访问'
        break;
      case 404:
        message = '请求错误,未找到该资源'
        break;
      case 405:
        message = '请求方法未允许'
        break;
      case 408:
        message = '请求超时'
        break;
      case 500:
        message = '服务器端出错'
        break;
      case 501:
        message = '网络未实现'
        break;
      case 502:
        message = '网络错误'
        break;
      case 503:
        message = '服务不可用'
        break;
      case 504:
        message = '网络超时'
        break;
      case 505:
        message = 'http版本不支持该请求'
        break;
      default:
        message = `连接错误${err.response.status}`
    }
  } else {
    message = "连接到服务器失败"
  }
  alert(message)
  return Promise.reject(message);
});
/**
 *
 * get 请求
 * @param {*} url
 * @param {*} params
 */
export const $api = (url, params) => {
  return new Promise((res, rej) => {
    instance.get(url, { params: params })
      .then(data => {
        res(data)
      })
      .catch(err => {
        rej(err)
      });
  })
}
/**
 *
 * post 请求
 * @param {*} url
 * @param {*} params
 */
export const $http = (url, params) => {
  return new Promise((res, rej) => {
    instance.post(url, JSON.stringify(params))
      .then(data => {
        res(data)
      })
      .catch(error => {
        rej(error)
      });
  })
}