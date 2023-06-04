<template>
  <n-spin size="large" class="spin" v-show="(data === null) || showSpin" :stroke="'rgb(255,190,32)'"/>
  <img :style="{opacity: showSelect?'0':'1'}" :src="('https://prepan.top/bsAssets/brawlerPins/happy/'+ selectedBrawler +'.png')" alt="" class="close_select_brawler">
  <!--英雄选择-->
  <div class="select_brawler" :style="{maxHeight: showSelect?'120px':'0px'}">
    <div :style="{maxHeight: showSelect?'120px':'0px'}" class="brawlers_warp">
      <img
          :src="('https://prepan.top/bsAssets/brawlers/'+ item +'.png')"
          alt=""
          v-for="(item, index) in brawlersList"
          :key="index"
          class="brawler"
          @click="selectBrawler(item)"
      >
    </div>
    <img :style="{opacity: showSelect?'1':'0'}" class="selected" :src="('https://prepan.top/bsAssets/brawlers/'+ selectedBrawler +'.png')" alt="">
    <img :class="showSelect?'':'close_select'" src="@/assets/close.png" alt="" class="close" @click="showSelect = !showSelect">
  </div>
  <div class="brawlerRank_warp">
    <PlayerItem v-for="item in data" :key="item.tag" :player="item"  @click="searchPlayer"/>
  </div>
</template>

<script setup>
import PlayerItem from '@/components/rank/PlayerItem'
import {NSpin} from 'naive-ui'
import {getCurrentInstance, ref, watch} from "vue";
import officalApi from "@/api/officalApi";
let data = ref(null)
let brawlersList = getCurrentInstance()?.appContext.config.globalProperties.$brawlers
let selectedBrawler = ref(16000000)
let showSpin = ref(false)

let showSelect = ref(false)
function selectBrawler(item) {
  if(selectedBrawler.value !== item) {
    selectedBrawler.value = item
    showSpin.value = true
    data.value = null
    getData()
  }
}

let emits = defineEmits(['searchPlayer'])
function searchPlayer() {
  emits('searchPlayer', true)
}

let props = defineProps(['region'])
let region = ref(props.region)
watch(() => props.region, newVal => {
  region.value = newVal
  data.value = null
  getData()
})

function getData() {
  officalApi.get(`/playStatsApi/v1/rankings/${region.value}/brawlers/${selectedBrawler.value}`).then(res => {
    data.value = res.data.items
    showSpin.value = false
  })
}

getData()

</script>

<style scoped>
.close_select_brawler {
  height: 5vh;
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  transition: .3s;
}
.close_select {
  transition: .3s;
  transform: translateX(-50%) rotate(180deg) !important;
}
.select_brawler {
  position: relative;
  max-height: 200px;
  overflow: hidden;
  padding-bottom: 20px;
  transition: .3s;
}
.close {
  transition: .3s;
  padding: 0 30vw;
  position: absolute;
  height: 25px;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(0deg);
}
.brawlerRank_warp {
  margin-top: 10px;
  padding-bottom: 50px;
}
.spin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.select_brawler {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.brawlers_warp {
  transition: .3s;
  width: 250px;
  height: 100px;
  overflow: scroll;
  font-size: 0;
  margin-bottom: 6px;
}
.selected {
  transition: .3s;
  width: 20vw;
}
.brawler {
  width: 50px;
}
</style>
