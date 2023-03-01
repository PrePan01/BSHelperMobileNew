<template>
  <div class="container">
    <img :src="require(`@/assets/skins/${props.cover}.png`)" alt="" class="cover">
    <div class="title" :style="{'background': props.color}">
      {{props.title}}
    </div>
  </div>
</template>

<script setup>
let props = defineProps(['cover', 'title', 'color'])


</script>

<style scoped>
.container {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cover {
  width: 12vh;
  z-index: 1;
}
.title {
  width: 70vw;
  text-align: center;
  height: 10vh;
  line-height: 10vh;
  font-size: 8vw;
  margin-left: -5vh;
  padding: 0 0 0 4vh;
  border: 5px solid black;
  font-weight: bold;
  transform: skew(-3deg);
  box-shadow: 3px 3px 1px black;
  text-shadow: 2px 2px 1px black;
  overflow: hidden;
}
</style>
