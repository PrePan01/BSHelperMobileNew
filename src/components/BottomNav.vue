<template>
  <Tabbar>
    <TabbarItem icon="https://prepan.top/bsAssets/cup_icon.png" :class="{active: router.currentRoute.value.name !== 'profile'}" @click="nav(1)"></TabbarItem>
    <TabbarItem icon="https://prepan.top/bsAssets/sword_icon.png" :class="{active: router.currentRoute.value.name !== 'battlelogs'}" @click="nav(2)"></TabbarItem>
    <TabbarItem icon="https://prepan.top/bsAssets/star_icon.png" :class="{active: router.currentRoute.value.name !== 'more'}" @click="nav(3)"></TabbarItem>
  </Tabbar>
</template>

<script setup>
import { Tabbar, TabbarItem } from 'vant';
import {useRouter} from "vue-router";
const router = useRouter()
function nav(i) {
  if(i === 1) {
    router.push('/profile')
  } else if (i === 2) {
    router.push('/battlelogs')
  } else {
    router.push('/more')
  }
}

</script>

<style scoped>
.active {
  filter: grayscale(70%);
  opacity: 0.8;
}
</style>
