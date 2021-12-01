<template>
  <!-- 首页导航栏 -->
  <div class="nav-bar">
    <!-- 插槽 -->
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>
.nav-bar {
  display: flex;
  line-height: 44px;
  height: 44px;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
}
.center {
  flex: 1;
  text-align: center;
}
.left {
  width: 60px;
  /* background: red; */
}
.right {
  width: 60px;
  /* background: blueviolet; */
}
</style>