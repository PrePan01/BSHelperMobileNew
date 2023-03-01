<template>
  <div class="container f">
    <Map :event="event"></Map>
    <div class="brawler-warp">
      <div class="brawler">
        <img :src="'https://prepan.top/bsAssets/brawlers/'+ myBrawler[0] + '.png'" alt="" class="brawler-icon">
        <span class="trophy">{{myBrawler[2]}}</span>
      </div>
      <p class="trophy__title">
        <img src="@/assets/trophy_cur.png" alt="" style="width: 18px;">
        <span>{{myBrawler[1]}}</span>
      </p>
    </div>
    <div class="result__warp">
      <div class="result" :style="{'color': battle.rank>4?'rgb(245,108,108)':'rgb(103,194,58)'}">
        {{battle.rank?'#':''}}{{battle.rank || result(battle.result)}}
      </div>
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
  if(battle.bigBrawler && battle.bigBrawler.tag === store.profile.tag) {
    return [battle.bigBrawler.brawler.id, battle.bigBrawler.brawler.trophies, battle.bigBrawler.brawler.power]
  }
  for(let p of battle.players) {
    if(p.tag === store.profile.tag) {
      return [p.brawler.id, p.brawler.trophies, p.brawler.power]
    }
  }
})

</script>

<style scoped>
.brawler {
  position: relative;
  height: 50px;
}
.trophy {
  position: absolute;
  left: 0;
  background-color: black;
  padding: 0 3px;
  font-family: 'lato', serif;
}
.trophy__title {
  display: flex;
  align-items: center;
}
</style>
