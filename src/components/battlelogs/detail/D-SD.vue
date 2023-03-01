<template>
  <div class="info">
    <p>{{BattleTimeTrans(battleTime)[0]}}</p>
    <p>{{BattleTimeTrans(battleTime)[1]}}</p>
    <p v-if="battle.trophyChange">杯数 {{battle.trophyChange>=0?'+':''}}{{battle.trophyChange}}</p>
  </div>
  <div v-if="battle.mode ==='bigGame'" class="biggame">
    <h2>天选英雄</h2>
    <Player
        :player="battle.bigBrawler"
        :key="battle.bigBrawler.tag"
        class="bigplayer"
        :trophies="battle.bigBrawler.brawler.trophies"
        @click="showPop(p.tag)"
    />
  </div>
  <div class="sdwarp">
    <n-popover trigger="manual" v-for="p in battle.players" :key="p.tag" :show="showPopover && showPopoverIndex === p.tag">
      <template #trigger>
        <Player
            :player="p"
            :key="p.tag"
            class="player"
            :trophies="p.brawler.trophies"
            @click="showPop(p.tag)"
        />
      </template>
      <div>
        <PlayerPopover :data="p"  @closePopover="closePopover"/>
      </div>
    </n-popover>
  </div>
</template>

<script setup>
import {NPopover} from 'naive-ui'
import Player from '../Player'
import PlayerPopover from '../PlayerPopover'
import BattleTimeTrans from "@/utils/battle/BattleTimeTrans";
import {ref} from "vue";

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
.biggame {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
}
.bigplayer {
  margin-left: 25px;
}
</style>
