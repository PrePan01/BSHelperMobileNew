<template>
  <div class="top-nav--warp">
    <img src="@/assets/lamb-left.png" alt="" class="back-icon" @click="$router.push(props.to)">
    <div class="title">{{props.title}}</div>
  </div>

</template>

<script setup>
let props = defineProps(['to', 'title'])
</script>

<style scoped>
.top-nav--warp {
  display: flex;
  align-items: center;
  height: 5vh;
  border-bottom: 1px dashed rgba(255,255,255,0.4);
  padding: 6px 0;
}
.back-icon {
  height: 4vh;
  margin: 0 16px;
}
.title {
  font-size: 22px;
  font-weight: bold;
  margin-top: 2px;
  text-shadow: 1px 1px black;
  width: 65vw;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  word-break:keep-all;
}
</style>
