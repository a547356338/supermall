<template>
  <div>
    <nav-bar>
      <div @click="backClick"
        slot="left"
        class="back">
        返回</div>
      <div slot="center"
        class="title">
        <div class="titleItem"
          @click="titleClick(index)"
          :class="{active:index===currentIndex}"
          v-for="(item,index) in titles">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from '../../../components/common/navbar/NavBar'
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
    },
    backClick() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.titleItem {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back {
  margin-left: 12px;
}
</style>