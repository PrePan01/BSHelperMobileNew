<template>
  <div class="container">
    <div class="word-warp"></div>
    <div>
      <h2 :ref="word" class="word" :class="{'show': i === index, 'show-up': index === 5? i === 0: i - 1 === index}" v-for="(item,index) in keyWords">{{ item }}</h2>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUpdate, onMounted, ref} from "vue";

let keyWords = ['个人数据', '最近对战', '皮肤图鉴', '战队查询', '游戏下载', '...']

let words = ref([])
let word = (el) => {
  words.value.push(el)
}
let i = ref(0)

onBeforeUpdate(() => {
  words.value = []
})

onMounted(() => {
  setInterval(() => {
    i.value===words.value.length - 1? i.value = 0: i.value++
  }, 2500)
})
</script>

<style scoped>
.container {
  position: relative;
  height: 102px;
  overflow: hidden;
}

.word-warp {
  height: 100px;
}

.word {
  height: 100px;
  font-size: 36px;
  font-weight: bold;
  position: absolute;
  text-align: center;
  width: 100%;
  -webkit-text-stroke: 1px black;
  color: rgb(239,239,239);
  text-shadow: 2px 2px 2px black;
}

.show-up {
  transform: translateY(-200%);
  transition: all 1s;
}

.show {
  transform: translateY(-100%);
  transition: all 1s;
}
</style>
