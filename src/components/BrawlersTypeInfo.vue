<template>
  <div>
    战力星芒图分类说明
    <!--0: 火力手  1：全能手  2：坦克  3：辅助  4：突袭者  5：投掷-->
    <p>火力手</p>

  </div>
</template>

<script setup>
import BrawlerType from '@/utils/BrawlerType'
import {onMounted} from "vue";

onMounted(() => {
  let arr = []
  Object.keys(BrawlerType).forEach(i => {
    if(!Array.isArray(arr[BrawlerType[i]])) {
      arr[BrawlerType[i]] = []
    }
    arr[BrawlerType[i]].push(i)
  })
  console.log(arr)
})

</script>

<style scoped>

</style>
