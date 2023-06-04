<template>
  <TopNav :to="'/more'" :title="'皮肤图鉴 - 分类'"/>
  <n-back-top :right="20" :visibility-height="500" :bottom="70"/>
  <div class="brawlerChoice" ref="brawlerChoice">
    <img
        class="brawlerIcon"
        v-for="(item, index) in brawlersList"
        :key="item"
        :src="('https://prepan.top/bsAssets/brawlers/'+ item +'.png')"
        alt=""
        @click="choose(index)"
        :class="{
          'curSelect': index === curBrawlerIndex
        }"
    >
  </div>
  <AssortSkins
      v-for="(i, index) in assort_title"
      @click="$router.push(`/assort_skins/detail?i=${index}`)"
      :title="i[0]"
      :color="i[1]"
      :cover="i[2]"
      :key="i[2]"
      v-show="Array.isArray(show)?show.includes(index):show"
  />
</template>

<script setup>
import { NBackTop } from 'naive-ui'
import AssortSkins from '@/components/skin/AssortTitle'
import assort_title from '@/assets/skins/assortTitle.json'
import assortData from '@/assets/skins/assortData.js'
import TopNav from '@/components/TopNav'
import {getCurrentInstance, ref} from "vue";
let brawlersList = getCurrentInstance()?.appContext.config.globalProperties.$brawlers

let curBrawlerIndex = ref(null)
let show = ref(true)

function changeShow() {
  if(curBrawlerIndex.value !== null) {
    let tmp = []
    assortData.forEach((i, index) => {
      for(let item of i) {
        if(item[0] === curBrawlerIndex.value) {
          tmp.push(index)
          break
        }
      }
    })
    show.value = tmp
  } else {
    show.value = true
  }
}

function choose(index) {
  curBrawlerIndex.value = ( curBrawlerIndex.value === index? null: index )
  changeShow()
}


</script>

<style scoped>
.brawlerChoice {
  width: 100vw;
  overflow: scroll;
  height: 60px;
  display: flex;
  flex-direction: row;
}
.brawlerIcon {
  width: 80px;
}
.curSelect {
  border: 2px solid gold;
  box-sizing: border-box;
}
</style>
