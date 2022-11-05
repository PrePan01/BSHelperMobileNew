<template>
  <div v-for="(item, index) in battle.teams" :key="index">
    <div class="warp">
      <n-popover trigger="manual" v-for="p in item" :key="p.tag" :show="showPopover && showPopoverIndex === p.tag">
        <template #trigger>
          <Player
              :player="p"
              :mvp="battle.starPlayer?.name"
              :trophies="p.brawler.trophies"
              class="player"
              @click="showPop(p.tag)"
          />
        </template>
        <div>
          <PlayerPopover :data="p"/>
        </div>
      </n-popover>
    </div>
    <div v-if="index === 0" class="info">
      <div>
        <p class="time">{{BattleTimeTrans(battleTime)[0]}}</p>
        <p class="time">{{BattleTimeTrans(battleTime)[1]}} {{battleTypeTrans(battle.type)}}</p>
      </div>
      <img src="../../../assets/vs.png" alt="" class="vs">
      <div>
        <p>{{battleDuration(battle.duration)}}</p>
        <p v-if="battle.trophyChange">杯数 {{battle.trophyChange>=0?'+':''}}{{battle.trophyChange}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {NPopover} from 'naive-ui'
import Player from '../Player'
import PlayerPopover from '../PlayerPopover'
import BattleTimeTrans from "@/utils/battle/BattleTimeTrans";
import {battleDuration, battleTypeTrans} from '@/utils/battle/BattleResult'
import {ref} from "vue";

let props = defineProps(['data'])
let {battle, battleTime} = props.data

let showPopover = ref(false)
let showPopoverIndex = ref()
function showPop(data) {
  showPopover.value = !(showPopover.value)
  showPopoverIndex.value = data
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
</style>
