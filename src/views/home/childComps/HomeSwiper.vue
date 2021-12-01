<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,index) in banners"
        :key="index">
        <a :href="item.link">
          <img :src="item.dataimage" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
// 轮播图组件
import { Swiper, SwiperItem } from '../../../components/common/swiper'
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {

    }
  }
}
</script>
<style scoped>
</style>