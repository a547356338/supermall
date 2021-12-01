// 能实际调接口的时候使用此方法
import { request } from './request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getMock() {
  return require({
    url: '/meun'
  })
}