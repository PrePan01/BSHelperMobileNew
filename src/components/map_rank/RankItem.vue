<template>
  <div class="warp" :style="{'width': showData?'100%': 'auto'}">
    <span class="brawler">
      <img :src="'https://prepan.top/bsAssets/brawlers/' + props.data.brawler + '.png'" alt="" class="brawlerIcon">
      <span class="brawler_name">{{BrawlerTranslate(props.data.brawler)}}</span>
    </span>
    <div class="brawler_data" :style="{'color': getWinRateColor(winRate)}" v-show="showData">
      {{winRate}}<span class="per">%</span>
    </div>
    <div class="brawler_data" :style="{'color': getUseRateColor(useRate)}" v-show="showData">
      {{useRate}}<span class="per">%</span>
    </div>
  </div>
</template>

<script setup>
import BrawlerTranslate from "@/utils/BrawlerTranslate";
import {ref, watch} from "vue";

let props = defineProps(['data', 'winLine', 'showData'])
let winRate = ref(props.data.winRate)
let useRate = ref(props.data.useRate)
let showData = ref(props.showData)

watch(() => props.showData, v => {
  showData.value = v
})

let getWinRateColor = rate => {
  if(rate > props.winLine[0]) return 'var(--victory)'
  if(rate < props.winLine[1]) return 'var(--defeat)'
}

let getUseRateColor = rate => {
  if(rate > 5) return 'var(--victory)'
  if(rate < 0.8) return 'var(--defeat)'
}

</script>

<style scoped>
.warp {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.brawler {
  position: relative;
}
.brawler_name {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  background-color: #000;
  color: #fff;
  transform: translateX(-50%);
}
.brawlerIcon {
  width: 70px;
}
.brawler_data {
  text-align: right;
  position: relative;
  width: 30%;
  padding-right: 20px;
  font-size: 30px;
  font-family: 'djvb', serif;
  text-shadow: 1px 1px 2px black;
}
.brawler_data .per {
  font-size: 16px;
  margin-left: 2px;
}
</style>
