<template>
  <div class="info1">
    <p>{{BattleTimeTrans(battleTime)[0]}}</p>
    <p>{{BattleTimeTrans(battleTime)[1]}}</p>
    <p>杯数 {{battle.trophyChange>=0?'+':''}}{{battle.trophyChange}}</p>
  </div>
  <div class="duosd-warp">
    <div v-for="(item, index) in battle.teams" :key="index" class="warp">
      <div>
        <n-popover trigger="manual" v-for="p in item" :key="p.tag" :show="showPopover && showPopoverIndex === p.tag">
          <template #trigger>
            <Player
                :player="p"
                :key="p.tag"
                :trophies="p.brawler.trophies"
                class="player"
                @click="showPop(p.tag)"
            />
          </template>
          <div>
            <PlayerPopover :data="p"  @closePopover="closePopover"/>
          </div>
        </n-popover>
      </div>
    </div>
  </div>
</template>

<script setup>
import {NPopover} from 'naive-ui'
import PlayerPopover from '../PlayerPopover'
import Player from '../Player'
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
.info1 {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 10px;
}
.info1 p {
  font-size: 16px;
}
.duosd-warp {
  display: flex;
  overflow: scroll;
}
.warp {
  display: flex;
  justify-content: space-evenly;
  margin: 5px 0;

}
.player {
  width: 30vw;
}
.info p {
  width: 30vw;
  text-align: center;
  font-weight: bold;
  font-family: 'lato', serif;
  text-shadow: 1px 2px 1px black;
}
</style>
