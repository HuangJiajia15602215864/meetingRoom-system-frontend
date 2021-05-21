import router from './../router'
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken,removeToken } from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['access-token'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 1) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    if (error.response.status === 401) { //未登录认证
       removeToken()
       Message({
        message: 'token不存在，请重新登录！',
        type: 'error'
      })
       router.push('/')
    } else if (error.response.status === 403) { //没有权限
      router.push('/404')
    } else {
      Message({
        message: error.response.data.message,
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject(error.response.data.message)
    }
  }
)

export default service
