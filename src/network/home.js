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


export function getHomeGoods(type, page) {
  return require({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}


export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans
  }
}


// 整合数据
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.columns = columns
    this.services = services
  }
}