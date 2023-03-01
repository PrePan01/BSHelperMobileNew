<template>
  <div class="container f">
    <Map :event="event"></Map>

    <div class="brawler-warp">
      <div class="brawler" v-for="(item, index) in myBrawler" :key="index">
        <img :src="'https://prepan.top/bsAssets/brawlers/'+ item.id + '.png'" alt="" class="brawler-icon">
        <span class="trophy">{{item.power}}</span>
      </div>
    </div>

    <div class="result__warp">
      <p class="result" :style="{color: 'var(--' + battle.result + ')'}">{{result(battle.result)}}</p>
      <p class="time">{{TTrans(battleTime)}}</p>
    </div>
  </div>
</template>

<script setup>
import '@/css/battleLogsTitle.css'
import {computed} from "vue";
import Map from '../Map'
import TTrans from '../../../utils/battle/BattleTimeFromNow'
import {useStore} from "@/store";
const store = useStore()
let props = defineProps(['data'])
let {battleTime, event, battle} = props.data
import {result} from '@/utils/battle/BattleResult'

let myBrawler = computed(() => {
  for(let p of battle.players) {
    if(p.tag === store.profile.tag) {
      return p.brawlers
    }
  }
})

</script>

<style scoped>
.brawler {
  position: relative;
  height: 50px;
}
.brawler:nth-last-child(-n+2) {
  margin-left: -20px;
}
.trophy {
  position: absolute;
  left: 0;
  background-color: black;
  padding: 0 3px;
  font-family: 'lato', serif;
}
</style>
