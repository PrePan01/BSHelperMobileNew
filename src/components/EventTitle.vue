<template>
  <div class="eventsCard">
    <div class="timeCard">
      <div style="color: white">
        <div style="float: right;margin-right: 10px">{{time[0] === 0?'结束时间':'开始时间'}}：{{ BattleTimeTrans(time[1])[0] }} {{ BattleTimeTrans(time[1])[1] }}</div>
      </div>
    </div>
    <div class="eventsName" :style="bgc">
      <img :src="'https://prepan.top/bsAssets/modes/'+ modes.indexOf(mode) + '.png'" alt="" style="margin-left: 10px;width: 50px;">
      <span style="margin-left: 10px">
            <div class="eventsTitle">{{ModeTranslate(mode)}}</div>
            <div class="mapTitle">
              {{MapTranslate(map)}}
            </div>
          </span>
      <i class="iconfont icon-qianwang-xiayibu" style="margin-left: auto;margin-right: 20px;font-size: 22px;color: white"></i>
    </div>
  </div>
</template>

<script setup>
import BattleTimeTrans from "@/utils/battle/BattleTimeTrans";
import MapTranslate from "@/utils/MapTranslate";
import ModeTranslate from "@/utils/ModeTranslate";
import {computed} from "vue";
let props = defineProps(['mode', 'map', 'time'])
let {mode, map, time} = props
let modes =
    ['Gem-Grab', 'Brawl-Ball', 'Bounty', 'Heist', 'Hot-Zone', 'Siege', 'Knockout',
      'Solo-Showdown', 'Duo-Showdown', 'Duels', 'Wipeout', 'Payload', 'Basket-Brawl',
      'Invasion', 'Hunters', 'Last-Stand', 'Boss-Fight','Big-Game', 'Snowtel-Thieves', 'Robo-Rumble','Volley-Brawl'
    ]

let bgc = computed(() => {
  let c
  switch (mode) {
    case 'Gem-Grab': { c = 'rgb(216,82,255)'; break }
    case 'Brawl-Ball': { c = 'rgb(154,177,253)'; break }
    case 'Bounty': { c = 'rgb(255,188,32)'; break }
    case 'Heist': { c = 'rgb(247,131,28)'; break }
    case 'Hot-Zone': { c = 'rgb(226,59,79)'; break }
    case 'Siege': { c = 'rgb(239,78,49)'; break }
    case 'Knockout': { c = 'rgb(247,131,28)'; break }
    case 'Solo-Showdown': { c = 'rgb(145,225,54)'; break }
    case 'Duo-Showdown': { c = 'rgb(145,225,54)'; break }
    case 'Duels': { c = 'rgb(48,148,249)'; break }
    case 'Wipeout': { c = 'rgb(252,215,249)'; break }
    case 'Payload': { c = 'rgb(184,238,251)'; break }
    case 'Basket-Brawl': { c = 'rgb(255,140,36)'; break }
    case 'Hunters': { c = 'rgb(253,187,33)'; break }
    case 'Boss-Fight': { c = 'rgb(236,30,31)'; break }
    case 'Big-Game': { c = 'rgb(255,213,44)'; break }
    case 'Snowtel-Thieves': { c = 'rgb(247,180,147)'; break }
    default: { c = 'rgb(47,196,249)'; break }
  }
  return {backgroundColor: c}
})

</script>

<style scoped>
@import 'https://at.alicdn.com/t/font_3113095_qorhzfdtpio.css';
.eventsCard{
  height: 12vh;
  margin: 20px 0;
}
.timeCard{
  height: 3vh;
  width: 90vw;
  background-color: black;
  color: white;
  padding-bottom: 1px;
  border: 3px solid black;
}
.eventsName{
  display: flex;
  height: 11vh;
  width: 90vw;
  flex-direction: row;
  align-items: center;
  border: 3px solid black;
  border-top: none;
}
.eventsTitle{
  color: white;
  font-weight: bold;
  font-size: 25px;
  text-shadow: 2px 2px 1px black;
}
.mapTitle{
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-shadow: 2px 2px 1px black;
}
</style>

