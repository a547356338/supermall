<template>
  <div ref="wrapper">
    <div class="content"
      style="padding-bottom:49px">
      <!-- 这里放插槽的意思就是  外部使用Scroll组件的时候，给里面传入的数据，就是插槽的数据 -->
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: {}
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // ref如果是绑定在组件中的，那么通过this.$refs.refname获取的是一个组件对象
    this.scroll && this.scroll.scrollTo(0, 0)

    // 监听滚动的位置
    this.scroll && this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })

    this.scroll && this.scroll.refresh()

    // 监听滚动到底部
    if (this.pullUpLoad) {
      this.scroll && this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    funishPullUp() {
      this.scroll && this.scroll.funishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>
<style scoped>
</style>