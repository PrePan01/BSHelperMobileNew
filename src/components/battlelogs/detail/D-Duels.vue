<template>
  <div v-for="(item, index) in battle.players" :key="index">
    <div class="warp">
      <n-popover trigger="manual" v-for="b in item.brawlers" :key="b.tag" :show="showPopover && showPopoverIndex === b.tag">
        <template #trigger>
          <div class="b_warp">
            <img :src="'https://prepan.top/bsAssets/brawlers/' + b.id + '.png'" alt="" class="brawler-icon">
            <n-tag :color="powerColor(b.power)" size="small">
              Lv.{{b.power}}
            </n-tag>
            <div class="trophy">
              <img :src="require('@/assets/trophy_cur.png') " alt="">
              <span>{{b.trophies}}({{b.trophyChange>0? '+' + b.trophyChange: b.trophyChange}})</span>
            </div>
          </div>
        </template>
        <div>
          <PlayerPopover :data="b" @closePopover="closePopover"/>
        </div>
      </n-popover>
    </div>
    <div class="player_name">{{item.name}}</div>

    <div v-if="index === 0" class="info">
      <div>
        <p class="time">{{BattleTimeTrans(battleTime)[0]}}</p>
        <p class="time">{{BattleTimeTrans(battleTime)[1]}} {{battleTypeTrans(battle.type)}}</p>
      </div>
      <img src="../../../assets/vs.png" alt="" class="vs">
      <div>
        <p>{{battleDuration(battle.duration)}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {NPopover, NTag} from 'naive-ui'

import PlayerPopover from '../PlayerPopover'
import BattleTimeTrans from "@/utils/battle/BattleTimeTrans";
import {battleDuration, battleTypeTrans} from '@/utils/battle/BattleResult'
import {computed, ref} from "vue";

let props = defineProps(['data'])
let {battle, battleTime} = props.data

let showPopover = ref(false)
let showPopoverIndex = ref()
function showPop(data) {
  showPopover.value = !(showPopover.value)
  showPopoverIndex.value = data
}
function closePopover() {
  showPopover.value = false
}

let powerColor = (p) => {
  if(p === 11)  return {color: 'rgba(247,121,125,0.1)', textColor: 'rgba(247,121,125,1)', borderColor: 'rgba(247,121,125,1)'}
  else if (p === 10) return {color: 'rgba(251,215,134,0.1)', textColor: 'rgba(251,215,134,1)', borderColor: 'rgba(251,215,134,1)'}
  else return {color: 'rgba(198,255,221,0.1)', textColor: 'rgba(198,255,221,1)', borderColor: 'rgba(198,255,221,1)'}
}
</script>

<style scoped>
.warp {
  display: flex;
  justify-content: space-evenly;
  margin: 5px 0;
}
.player {
  width: 30vw;
}
.info {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.info p {
  width: 30vw;
  text-align: center;
  font-weight: bold;
  font-family: 'lato', serif;
  text-shadow: 1px 2px 1px black;
}
.time {
  text-align: center;
  font-size: 14px;
  line-height: 20px;
}
.vs {
  width: 15vw;
}
.b_warp {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.brawler-icon {
  height: 65px;
  width: 65px;
  margin:0 0 4px 0;
}
.trophy img {
  width: 20px;
}
.trophy img, span {
  margin-top: 4px;
  vertical-align: middle;
}
.player_name {
  text-align: center;
  font-size: 18px;
  margin-bottom: 10px;
  text-shadow: 1px 1px black;
  font-weight: bold;
}
</style>
