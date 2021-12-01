// 使用mock模拟数据
const Mock = require('mockjs')

const Random = Mock.Random;

Mock.mock('/api/data', () => {//当post或get请求到/api/data路由时Mock会拦截请求并返回上面的数据
  let list = [];
  for (let i = 0; i < 30; i++) {
    let listObject = {
      title: Random.csentence(5, 10),//随机生成一段中文文本。
      company: Random.csentence(5, 10),
      attention_degree: Random.integer(100, 9999),//返回一个随机的整数。
      photo: Random.image('200x100', '#00405d', '#FFF', 'Mock.js'),
      image: Random.image('200x100'),
      dataimage: Random.dataImage('200x100')
    }
    list.push(listObject);
  }
  return {
    data: list
  }
})


// 轮播图模仿数据
Mock.mock('/api/figure', () => {
  let list = []
  for (let i = 0; i < 4; i++) {
    let listObject = {
      dataimage: Random.dataImage('200x100'),
      link: Random.integer(100, 9999),
      title: Random.csentence(4, 4),
    }
    list.push(listObject);
  }
  return {
    data: list
  }
})