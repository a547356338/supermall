<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends"
      class="recommend-item"
      :key="index">
      <a :href="item.link">
        <img :src="item.dataimage" />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend img {
  /* width: 100%; */
  width: 80px;
  height: 80px;
  border-radius: 60%;
  margin-bottom: 10px;
}
</style>