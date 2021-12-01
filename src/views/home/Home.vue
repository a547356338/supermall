<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>
<script>
// 使用正式接口的时候可以调用
// import { getHomeMultidata, getMock } from '../../network/home'

import NavBar from '../../components/common/navbar/NavBar'

import HomeSwiper from './childComps/HomeSwiper'

import RecommendView from './childComps/RecommendView'

import axios from 'axios'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data() {
    return {
      mockData: [],
      result: null,
      banners: [],
      recommends: []
    }
  },
  created() {
    // 能实际调接口的时候可以用此方法
    // getHomeMultidata().then(res => {
    //   console.log(res)
    // })
  },
  methods: {

  },
  mounted() {
    // 使用mock模拟数据
    axios.get('/api/data').then(res => {
      this.result = res.data.data
    })
    // 轮播图
    axios.get('/api/figure').then(res => {
      this.banners = res.data.data
      this.recommends = res.data.data
      console.log(res, '=轮播')
    })
  }
}
</script>
<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>