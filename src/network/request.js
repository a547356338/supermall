// 封装axios
import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32"8000',
    baseURL: 'https://way.jd.com/jisuapi/get',
    timeout: 5000
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => {
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
  })

  return instance(config)
}