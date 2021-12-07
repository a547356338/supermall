<template>
  <div class="wrapper"
    ref="aaaa">
    <ul class="content"></ul>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      scroll: null
    }
  },
  created() {
  },
  mounted() {
    this.scroll = new BScroll(document.querySelector('.wrapper'), {
      probeType: 3,
      pullUpLoad: true
    })

    // 滚动条坐标
    this.scroll.on('scroll', (position) => {
      // console.log(position, 'position')
    })

    // 上拉加载
    this.scroll.on('pullingUp', () => {
      console.log('上拉加载')
    })
  }
}
</script>
<style scoped>
.wrapper {
  height: 150px;
  background-color: red;
  overflow-y: scroll;
}
</style>