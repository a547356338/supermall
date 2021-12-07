<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
    </scroll>
  </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import Scroll from '../../components/common/scroll/Scroll'
export default {
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailShopInfo,
    DetailBaseInfo,
    DetailGoodsInfo,
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [
        '//m.360buyimg.com/babel/s350x350_jfs/t1/205464/17/17270/141791/61a738acEab130c4b/245252bf03a2d2b6.jpg!q70.dpg',
        '//m.360buyimg.com/babel/s350x350_jfs/t1/141650/16/24872/212639/61a5f60cE0a99b026/e9c2389a4e0e53c1.jpg!q70.dpg',
        '//m.360buyimg.com/babel/s350x350_jfs/t1/124051/31/17487/58675/614afd2cE906f36c2/01b308a43d433c53.jpg!q70.dpg',
        '//m.360buyimg.com/babel/s350x350_jfs/t1/205464/17/17270/141791/61a738acEab130c4b/245252bf03a2d2b6.jpg!q70.dpg',
      ],
      goods: {
        columns: ['销量1580', '收藏33人', '默认快递'],
        desc: '新款上市',
        newPrice: '￥38.50',
        oldPrice: '￥69.90',
        realPrice: '38.50',
        title: '戴尔（DELL）MS116 鼠标有线',
        discount: '优惠价',
        services: [
          { icon: '11', name: '退货补运费' },
          { icon: '3', name: '7天无理由退货' },
          { icon: '5', name: '72小时内发货' }
        ]
      },
      shop: {
        name: '仲陌美精品家居店',
        logo: '//m.360buyimg.com/babel/s350x350_jfs/t1/215489/19/2337/147775/617b6fb8E502df5cc/e34a508474860a22.jpg!q70.dpg',
        sells: 12999,
        goodsCount: '222',
        score: [
          {
            name: '描述相符 ',
            score: '4.64',
            isBetter: false
          },
          {
            name: '价格合理 ',
            score: '5.00',
            isBetter: true
          },
          {
            name: '质量满意 ',
            score: '4.65',
            isBetter: false
          },
        ]
      },
      detailInfo: {
        desc: '新品上市',
        detailImage: [
          {
            anchor: '',
            desc: '',
            key: '穿着效果',
            list: [
              '//m.360buyimg.com/babel/s750x300_jfs/t1/174143/16/26883/127041/618fa0c6Eac54d4a2/69072466a07c9b65.jpg!q70.dpg',
              '//m.360buyimg.com/babel/s1440x576_jfs/t1/144805/23/21872/66976/61a6314aE1beb78d0/8dae7003bb6f4180.jpg!q70.dpg',
              '//m.360buyimg.com/babel/s750x300_jfs/t1/222660/11/3950/121349/61a1f176E5f190e6b/a7a03f7f46a85d39.jpg!q70.dpg',
              '//m.360buyimg.com/babel/s750x300_jfs/t1/211045/6/10848/149666/61a1f199Ec11fdcbb/efd249484d7e4c8a.jpg!q70.dpg',
            ]
          }
        ]
      }
      // shop: {}
    }
  },
  created() {
    this.iid = this.$route.params.id

    // 拿到id发送请求
  },
  methods: {

  }
}
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background: #fff;
}
</style>