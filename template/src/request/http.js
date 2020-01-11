/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import { Toast } from 'vant'

const ShowToast = msg => {
  Toast({
    message: msg,
    duration: 3000,
    forbidClick: true
  })
}

let BASEURL = ''
if (process.env.VUE_APP_ENV === 'development') {
  BASEURL = process.env.VUE_APP_API_HOST
} else {
  BASEURL = `${window.location.protocol}//${window.location.host}`
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  Toast.loading({
    // message: '加载中...',
    forbidClick: true,
    duration: 0,
    loadingType: 'spinner'
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  ShowToast('请求失败')
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(response => {
  Toast.clear()
  if (response.data.state <= 0) {
    ShowToast(response.data.errMsg)
  }
  return response
}, error => {
  Toast.clear()
  ShowToast('网络中断..')
  return Promise.reject(error)
})

function http (obj) {
  return new Promise((resolve, reject) => {
    axios({
      baseURL: BASEURL,
      method: obj.type ? obj.type : 'get',
      url: obj.url,
      params: obj.data,
      data: obj.data,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      timeout: 7000,
      headers: { 'Content-Type': obj.dataType ? obj.dataType : 'application/x-www-form-urlencoded' }
    }).then(response => {
      if (response.data.state > 0) {
        resolve(obj.success(response.data))
      } else {
        obj.fail && resolve(obj.fail(response.data))
      }
    }).catch(() => {
      ShowToast('网络不佳...')
    })
  })
}

export {
  http
}
