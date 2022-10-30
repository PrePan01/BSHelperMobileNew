<template>
  <div class="info">
    <p>{{BattleTimeTrans(battleTime)[0]}}</p>
    <p>{{BattleTimeTrans(battleTime)[1]}}</p>
    <p>杯数 {{battle.trophyChange>0?'+':''}}{{battle.trophyChange}}</p>
  </div>
  <div class="sdwarp">
    <n-popover trigger="manual" v-for="p in item" :key="p.tag" :show="showPopover && showPopoverIndex === p.tag">
      <template #trigger>
        <Player
            v-for="p in battle.players"
            :player="p"
            :key="p.tag"
            class="player"
            :trophies="p.brawler.trophies"
        ></Player>
      </template>
      <div>
        <PlayerPopover :data="p"/>
      </div>
    </n-popover>
  </div>
</template>

<script setup>
import {NPopover} from 'naive-ui'
import Player from '../Player'
import PlayerPopover from '../PlayerPopover'
import BattleTimeTrans from "@/utils/battle/BattleTimeTrans";
import {battleDuration, battleTypeTrans} from '@/utils/battle/BattleResult'

let props = defineProps(['data'])
let {battle, battleTime} = props.data

</script>

<style scoped>
.info {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 10px;
}
.info p {
  font-size: 16px;
}
.sdwarp {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.player {
  width: 18vw;
}
</style>
