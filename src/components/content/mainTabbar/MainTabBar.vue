<template>
  <tab-bar>
    <tab-bar-item path='/home'
      activeColor="deepPink">
      <img slot="item-icon"
        src="../../../assets/img/tabbar/shouye.png" />
      <img slot="item-icon-active"
        src="../../../assets/img/tabbar/shouye2.png" />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category"
      activeColor="deepPink">
      <img slot="item-icon"
        src="../../../assets/img/tabbar/wancheng.png" />
      <img slot="item-icon-active"
        src="../../../assets/img/tabbar/wancheng2.png" />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart"
      activeColor="deepPink">
      <img slot="item-icon"
        src="../../../assets/img/tabbar/xinxi.png" />
      <img slot="item-icon-active"
        src="../../../assets/img/tabbar/xiaoxi2.png" />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile"
      activeColor="deepPink">
      <img slot="item-icon"
        src="../../../assets/img/tabbar/email.png" />
      <img slot="item-icon-active"
        src="../../../assets/img/tabbar/email2.png" />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>
<script>

import TabBar from '../../common/tabbar/TabBar'
import TabBarItem from '../../common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>
<style scoped>
</style>