<template>
  <div class="warp">
    <img :src="require('../assets/no' + topIndex + '.png')" alt="" class="medal">
    <div class="avatar">
      <img
          :src="'https://prepan.top/bsAssets/brawlerPins/happy/' + data.id + '.png'"
          alt=""
          :class="`t${topIndex}`"
      >
    </div>
    <div>
      <img src="../assets/trophy_cur.png" alt="" class="trophyIcon">
      <span class="trophies">{{data.trophies}}</span>
    </div>
  </div>
</template>

<script setup>
let props = defineProps(['data','topIndex'])
let {data, topIndex} = props

</script>

<style scoped>
.warp {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.medal {
  width: 10vw;
}
.avatar {
  height: 100px;
  display: flex;
  align-items: center;
}
.t1 {
  width: 100px;
}.t2 {
  width: 85px;
}.t3 {
  width: 70px;
}
.trophyIcon {
  width: 6vw;
  margin-right: 2px;
}
.trophyIcon,.trophies {
  vertical-align: middle;
}
</style>
