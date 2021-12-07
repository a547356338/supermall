<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      v-show="isTabFiexd"></tab-control>

    <scroll class="content"
      :probe-type="3"
      @scroll="contentscroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
      ref="scroll">
      <div>
        <home-swiper :banners="banners"
          @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control @tabClick="tabClick"
          ref="tabControl2"
          :titles="['流行', '新款', '精选']"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </div>
    </scroll>
    <back-top v-show="isShowbackTop"
      @click.native="backClick"></back-top>
  </div>
</template>
<script>
// 使用正式接口的时候可以调用
// import { getHomeMultidata, getMock } from '../../network/home'

import NavBar from '../../components/common/navbar/NavBar'

import HomeSwiper from './childComps/HomeSwiper'

import RecommendView from './childComps/RecommendView'

import FeatureView from './childComps/FeatureView'

import TabControl from '../../components/content/tabControl/TabControl'

import GoodsList from '../../components/content/goods/GoodsList'

import BackTop from '../../components/content/backTop/BackTop'

import Scroll from '../../components/common/scroll/Scroll'

import { debounce } from '../../common/utils'

import BScroll from 'better-scroll'

import axios from 'axios'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BackTop,
    Scroll
  },
  data() {
    return {
      isShowbackTop: false,
      mockData: [],
      result: null,
      banners: [
        { dataimage: '//m.360buyimg.com/babel/s750x300_jfs/t1/174143/16/26883/127041/618fa0c6Eac54d4a2/69072466a07c9b65.jpg!q70.dpg' },
        { dataimage: '//m.360buyimg.com/babel/s1440x576_jfs/t1/144805/23/21872/66976/61a6314aE1beb78d0/8dae7003bb6f4180.jpg!q70.dpg' },
        { dataimage: '//m.360buyimg.com/babel/s750x300_jfs/t1/222660/11/3950/121349/61a1f176E5f190e6b/a7a03f7f46a85d39.jpg!q70.dpg' },
        { dataimage: '//m.360buyimg.com/babel/s750x300_jfs/t1/211045/6/10848/149666/61a1f199Ec11fdcbb/efd249484d7e4c8a.jpg!q70.dpg' },
      ],
      recommends: [
        {
          dataimage: '//m.360buyimg.com/babel/s230x230_jfs/t1/210538/12/10793/106688/61a5bfa4E9239aa5d/09e9279890f0905a.jpg!q70.dpg',
          title: '十点抢券'
        },
        {
          dataimage: '//m.360buyimg.com/babel/s230x230_jfs/t1/214891/8/6214/445881/61a6ccffE0c3080bd/bc813cb1a64dd4c4.jpg!q70.dpg',
          title: '好物特卖'
        },
        {
          dataimage: '//m.360buyimg.com/babel/s230x230_jfs/t1/188725/16/11157/112306/60dd26b8E4c2de731/3207b6cb41bd13da.jpg!q70.dpg',
          title: '内购福利'
        },
        {
          dataimage: '//m.360buyimg.com/babel/s230x230_jfs/t1/210230/40/10861/521689/61a58c92E77d5d19f/611bd19942c2047f.jpg!q70.dpg',
          title: '初秋上新'
        }
      ],
      titles: ['流行', '新款', '精选'],
      goods: {
        'pop': {
          page: 0, list: [
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/205464/17/17270/141791/61a738acEab130c4b/245252bf03a2d2b6.jpg!q70.dpg',
              title: '美的（Midea）空气炸锅 4.2L大容量家用煎炸锅 无油低脂不粘大功率空气烤箱多功能薯条机电炸锅KZ42E101L',
              price: '￥22.90'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/141650/16/24872/212639/61a5f60cE0a99b026/e9c2389a4e0e53c1.jpg!q70.dpg',
              title: '苏泊尔（SUPOR）电饼铛家用 双面加热 煎饼铛 煎烤机烙饼锅三明治机25mm加深烤盘早餐机 JJ30A648',
              price: '￥109'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/124051/31/17487/58675/614afd2cE906f36c2/01b308a43d433c53.jpg!q70.dpg',
              title: '京鱼座小战鼓 蓝牙音箱 户外便携迷你音箱 无线蓝牙免提通话',
              price: '￥119.90'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/215489/19/2337/147775/617b6fb8E502df5cc/e34a508474860a22.jpg!q70.dpg',
              title: '戴尔（DELL）MS116 鼠标有线  商务办公经典对称 有线鼠标 USB接口 即插即用 鼠标 （黑色）',
              price: '￥6599'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/173228/4/5560/51721/607e9573E3d0da637/3e978753d9724655.jpg!q70.dpg',
              title: 'OPPO耳机 oppo有线耳机 通用华为小米手机 半入耳式3.5mm 适用于r17/r15x/reno3/ace/k5 Mh135耳机 藏蓝',
              price: '￥99'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/216004/9/6219/92604/61a5f7f6E5804256c/64fd2f9bca1f6b5e.jpg!q70.dpg',
              title: '小熊（Bear）打蛋器 家用电动打蛋机 迷你奶油打发器 烘焙手持自动搅蛋器搅拌器  DDQ-B01K1',
              price: '￥59'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/169136/10/25187/114682/61a60adeE2e1641a8/c877385f9cee3c9f.jpg!q70.dpg',
              title: '米家 小米榨汁杯 便携随行榨汁机 家用迷你果汁机 多功能料理机搅拌机 快速鲜榨  MJZZB01PL',
              price: '￥94'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/205464/17/17270/141791/61a738acEab130c4b/245252bf03a2d2b6.jpg!q70.dpg',
              title: '美的（Midea）空气炸锅 4.2L大容量家用煎炸锅 无油低脂不粘大功率空气烤箱多功能薯条机电炸锅KZ42E101L',
              price: '￥22.90'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/205464/17/17270/141791/61a738acEab130c4b/245252bf03a2d2b6.jpg!q70.dpg',
              title: '美的（Midea）空气炸锅 4.2L大容量家用煎炸锅 无油低脂不粘大功率空气烤箱多功能薯条机电炸锅KZ42E101L',
              price: '￥22.90'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/141650/16/24872/212639/61a5f60cE0a99b026/e9c2389a4e0e53c1.jpg!q70.dpg',
              title: '苏泊尔（SUPOR）电饼铛家用 双面加热 煎饼铛 煎烤机烙饼锅三明治机25mm加深烤盘早餐机 JJ30A648',
              price: '￥109'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/124051/31/17487/58675/614afd2cE906f36c2/01b308a43d433c53.jpg!q70.dpg',
              title: '京鱼座小战鼓 蓝牙音箱 户外便携迷你音箱 无线蓝牙免提通话',
              price: '￥119.90'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/215489/19/2337/147775/617b6fb8E502df5cc/e34a508474860a22.jpg!q70.dpg',
              title: '戴尔（DELL）MS116 鼠标有线  商务办公经典对称 有线鼠标 USB接口 即插即用 鼠标 （黑色）',
              price: '￥6599'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/173228/4/5560/51721/607e9573E3d0da637/3e978753d9724655.jpg!q70.dpg',
              title: 'OPPO耳机 oppo有线耳机 通用华为小米手机 半入耳式3.5mm 适用于r17/r15x/reno3/ace/k5 Mh135耳机 藏蓝',
              price: '￥99'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/216004/9/6219/92604/61a5f7f6E5804256c/64fd2f9bca1f6b5e.jpg!q70.dpg',
              title: '小熊（Bear）打蛋器 家用电动打蛋机 迷你奶油打发器 烘焙手持自动搅蛋器搅拌器  DDQ-B01K1',
              price: '￥59'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/169136/10/25187/114682/61a60adeE2e1641a8/c877385f9cee3c9f.jpg!q70.dpg',
              title: '米家 小米榨汁杯 便携随行榨汁机 家用迷你果汁机 多功能料理机搅拌机 快速鲜榨  MJZZB01PL',
              price: '￥94'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/205464/17/17270/141791/61a738acEab130c4b/245252bf03a2d2b6.jpg!q70.dpg',
              title: '美的（Midea）空气炸锅 4.2L大容量家用煎炸锅 无油低脂不粘大功率空气烤箱多功能薯条机电炸锅KZ42E101L',
              price: '￥22.90'
            },
          ]
        },
        'new': {
          page: 0, list: [
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/205723/9/17197/192890/61a74ebeE0fcdab97/3af98d222bd425ca.jpg!q70.dpg',
              title: 'Apple iPhone 13 Pro Max (A2644) 256GB 远峰蓝色 支持移动联通电信5G 双卡双待手机',
              price: '￥9799'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/216263/16/6246/207369/61a746a6E969d114a/8c518f63c1f00c78.jpg!q70.dpg',
              title: 'MIX FOLD 小米折叠屏手机 5G 2K+折叠屏 骁龙888 一亿像素 哈曼卡顿立体声四扬声器 12GB+512GB 黑色手机',
              price: '￥7999'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/176607/40/21928/217220/61a749a4Efaec6085/8d51ffb50445912c.jpg!q70.dpg',
              title: 'Apple iPhone 13 mini (A2629) 512GB 蓝色 手机 支持移动联通电信5G ',
              price: '￥7599'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/209500/7/788/255285/6142eaceE3c121151/cf31732d5cdd5d68.jpg!q70.dpg',
              title: 'OPPO Find X3 Pro 摄影师版 16+512GB 银黑 5000万双主摄IMX766 骁龙888 旗舰拍照 5G手机',
              title: '￥6499'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s330x330_jfs/t1/174788/11/22297/123510/61a74184E274a5d46/f20bbe84d4536b83.jpg!q70.dpg',
              title: '三星 SAMSUNG Galaxy S21 Ultra 5G 5G手机 骁龙888 1.08亿像素 120Hz 支持Spen 16G+512G幽夜黑',
              price: '￥9399'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s330x330_jfs/t1/207669/1/11326/284548/61a5d536E37ef1bde/55b3acdad68fe33d.jpg!q70.dpg',
              title: 'Redmi Note 9 4G 6000mAh大电池 骁龙662处理器  18W快充 雾光青 8GB+128GB 智能手机 小米 红米',
              price: '￥1199'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/205464/17/17270/141791/61a738acEab130c4b/245252bf03a2d2b6.jpg!q70.dpg',
              title: '美的（Midea）空气炸锅 4.2L大容量家用煎炸锅 无油低脂不粘大功率空气烤箱多功能薯条机电炸锅KZ42E101L',
              price: '￥22.90'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/141650/16/24872/212639/61a5f60cE0a99b026/e9c2389a4e0e53c1.jpg!q70.dpg',
              title: '苏泊尔（SUPOR）电饼铛家用 双面加热 煎饼铛 煎烤机烙饼锅三明治机25mm加深烤盘早餐机 JJ30A648',
              price: '￥109'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/124051/31/17487/58675/614afd2cE906f36c2/01b308a43d433c53.jpg!q70.dpg',
              title: '京鱼座小战鼓 蓝牙音箱 户外便携迷你音箱 无线蓝牙免提通话',
              price: '￥119.90'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/215489/19/2337/147775/617b6fb8E502df5cc/e34a508474860a22.jpg!q70.dpg',
              title: '戴尔（DELL）MS116 鼠标有线  商务办公经典对称 有线鼠标 USB接口 即插即用 鼠标 （黑色）',
              price: '￥6599'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/173228/4/5560/51721/607e9573E3d0da637/3e978753d9724655.jpg!q70.dpg',
              title: 'OPPO耳机 oppo有线耳机 通用华为小米手机 半入耳式3.5mm 适用于r17/r15x/reno3/ace/k5 Mh135耳机 藏蓝',
              price: '￥99'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/216004/9/6219/92604/61a5f7f6E5804256c/64fd2f9bca1f6b5e.jpg!q70.dpg',
              title: '小熊（Bear）打蛋器 家用电动打蛋机 迷你奶油打发器 烘焙手持自动搅蛋器搅拌器  DDQ-B01K1',
              price: '￥59'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/169136/10/25187/114682/61a60adeE2e1641a8/c877385f9cee3c9f.jpg!q70.dpg',
              title: '米家 小米榨汁杯 便携随行榨汁机 家用迷你果汁机 多功能料理机搅拌机 快速鲜榨  MJZZB01PL',
              price: '￥94'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/205464/17/17270/141791/61a738acEab130c4b/245252bf03a2d2b6.jpg!q70.dpg',
              title: '美的（Midea）空气炸锅 4.2L大容量家用煎炸锅 无油低脂不粘大功率空气烤箱多功能薯条机电炸锅KZ42E101L',
              price: '￥22.90'
            },
          ]
        },
        'sell': {
          page: 0, list: [
            {
              dataimg: '//m.360buyimg.com/babel/s330x330_jfs/t1/142857/19/22109/113506/61a614bcE2213dabf/b8349b1f618ac2be.jpg!q70.dpg',
              title: 'AIRMX秒新A3无雾加湿器家用无雾静音卧室空气加湿冷蒸发恒湿母婴除菌杀菌AirWaterA3 分体检测版',
              price: '￥1869'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s330x330_jfs/t1/193488/31/19905/170908/6125def7Ee8b929b3/a238543b563fc9b9.jpg!q70.dpg',
              title: '九阳（Joyoung）电饼铛家用多功能双面悬浮加热大直径33cm煎饼机烙饼煎烤机早餐机JK33-J3',
              price: '￥299'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s330x330_jfs/t1/161593/20/24967/494144/6195b15aEb57d81c0/09befd9dda34e828.jpg!q70.dpg',
              title: '多美忆 圣诞树套餐2.1米 圣诞节装饰彩灯挂件饰品摆件家用商场办公室元旦晚会新年小型场景布置道具套装',
              price: '￥850'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s330x330_jfs/t1/175991/15/22030/250685/61a43ee3Eb69db581/7c4bac7bd1df0880.jpg!q70.dpg',
              title: 'ohsunny吊带背心2021年女百搭修身打底外穿显瘦保暖柔软2021秋冬款 SLV2T107 云空米 L',
              price: '￥89'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s330x330_jfs/t1/167690/13/20951/120260/608d1ecbE6a005339/e9ac23052d43d430.jpg!q70.dpg',
              title: '语曼娇 YUMANJIAO   高腰牛仔女宽松2021年新款潮薄款阔腿网红显瘦a字超热裤',
              price: '￥59'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s330x330_jfs/t1/109282/39/18757/396269/614446ffEf3c1fd61/e0ff0ed6398f2d62.jpg!q70.dpg',
              title: 'ROG斯巴达X 无线鼠标 游戏鼠标 有线鼠标 双模多侧键鼠标 RGB发光 可换微动 19000DPI 黑色',
              price: '￥1199'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/205464/17/17270/141791/61a738acEab130c4b/245252bf03a2d2b6.jpg!q70.dpg',
              title: '美的（Midea）空气炸锅 4.2L大容量家用煎炸锅 无油低脂不粘大功率空气烤箱多功能薯条机电炸锅KZ42E101L',
              price: '￥22.90'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/141650/16/24872/212639/61a5f60cE0a99b026/e9c2389a4e0e53c1.jpg!q70.dpg',
              title: '苏泊尔（SUPOR）电饼铛家用 双面加热 煎饼铛 煎烤机烙饼锅三明治机25mm加深烤盘早餐机 JJ30A648',
              price: '￥109'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/124051/31/17487/58675/614afd2cE906f36c2/01b308a43d433c53.jpg!q70.dpg',
              title: '京鱼座小战鼓 蓝牙音箱 户外便携迷你音箱 无线蓝牙免提通话',
              price: '￥119.90'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/215489/19/2337/147775/617b6fb8E502df5cc/e34a508474860a22.jpg!q70.dpg',
              title: '戴尔（DELL）MS116 鼠标有线  商务办公经典对称 有线鼠标 USB接口 即插即用 鼠标 （黑色）',
              price: '￥6599'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/173228/4/5560/51721/607e9573E3d0da637/3e978753d9724655.jpg!q70.dpg',
              title: 'OPPO耳机 oppo有线耳机 通用华为小米手机 半入耳式3.5mm 适用于r17/r15x/reno3/ace/k5 Mh135耳机 藏蓝',
              price: '￥99'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/216004/9/6219/92604/61a5f7f6E5804256c/64fd2f9bca1f6b5e.jpg!q70.dpg',
              title: '小熊（Bear）打蛋器 家用电动打蛋机 迷你奶油打发器 烘焙手持自动搅蛋器搅拌器  DDQ-B01K1',
              price: '￥59'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/169136/10/25187/114682/61a60adeE2e1641a8/c877385f9cee3c9f.jpg!q70.dpg',
              title: '米家 小米榨汁杯 便携随行榨汁机 家用迷你果汁机 多功能料理机搅拌机 快速鲜榨  MJZZB01PL',
              price: '￥94'
            },
            {
              dataimg: '//m.360buyimg.com/babel/s350x350_jfs/t1/205464/17/17270/141791/61a738acEab130c4b/245252bf03a2d2b6.jpg!q70.dpg',
              title: '美的（Midea）空气炸锅 4.2L大容量家用煎炸锅 无油低脂不粘大功率空气烤箱多功能薯条机电炸锅KZ42E101L',
              price: '￥22.90'
            },
          ]
        }
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFiexd: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
  },
  methods: {
    // 获取子组件传过来的值
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    // 回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    // 回到顶部显示隐藏
    contentscroll(position) {
      // console.log(position.y, '===position.y')
      // 是否显示隐藏
      this.isShowbackTop = (-position.y) > 1000

      // 是否吸顶
      this.isTabFiexd = (-position.y) > 623
      // this.isTabFiexd = (-position.y) > this.tabOffsetTop
    },
    // 上拉加载
    loadMore() {

    },
    // 监听轮播图高度
    swiperImageLoad() {
      // console.log(this.$refs.tabControl2.$el.offsetTop, '==333')
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
    // 使用mock模拟数据
    axios.get('/api/data').then(res => {
      this.result = res.data.data
    })
    // 轮播图
    axios.get('/api/figure').then(res => {
      console.log(res, '=轮播')
    })
  },
  destroyed() {

  },
  activated() {
    // this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    // this.saveY = this.$refs.scroll.scroll.y
  },
}
</script>
<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 1;
}
.tab-control {
  top: 44px;
  z-index: 9;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 1;
  top: 0;
}
</style>