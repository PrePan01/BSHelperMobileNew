<template>
  <div class="battleInfo_warp">
    <div class="battleInfo_map">
      <img :src="'https://prepan.top/bsAssets/modes/'+ modes.indexOf(curBattlelogs.event.mode) + '.png'" alt="" class="mode_icon">
      <img :src="('https://prepan.top/bsAssets/map/'+ curBattlelogs.event.id +'.png')" alt="" class="map_img">
    </div>
    <div class="battleInfo">
      <div class="battleInfo_maptitle">{{MapTrans(curBattlelogs.event.map)}}</div>
      <div class="battleInfo_time">
        <span>{{BattleTimeTrans(curBattlelogs.battleTime)[0].slice(5)}}</span>
        <span>{{BattleTimeTrans(curBattlelogs.battleTime)[1]}}</span>
      </div>
      <div class="battleInfo_duration">{{battleDuration(curBattlelogs.battle.duration)}}</div>
      <div class="battleInfo_result_warp">
        <div class="battleInfo_result" :style="{color: 'var(--' + curBattlelogs.battle.result + ')'}">{{result(curBattlelogs.battle.result)}}</div>
        <div class="trophy_change" v-if="curBattlelogs.battle.result !== 'draw'">
          <img src="@/assets/trophy_cur.png" alt="" class="trophies_img">
          <span>{{curBattlelogs.battle.trophyChange>0?'+':''}}{{curBattlelogs.battle.trophyChange}}</span>
        </div>
      </div>
    </div>
  </div>
  <Player
      v-for="(item) in curBattlelogs.battle.teams[myTeam]"
      :battlelog="item"
      :playerTag="item.tag.split('#')[1]"
      :mode="curBattlelogs.event.mode"
      :mvp="curBattlelogs.battle.starPlayer?.tag"
      @click="searchPlayer(item.tag.split('#')[1])"
      :type="curBattlelogs.battle.type"
  />
  <Player
      v-for="(item) in curBattlelogs.battle.teams[myTeam === 0?1:0]"
      :battlelog="item"
      :playerTag="item.tag.split('#')[1]"
      :mode="curBattlelogs.event.mode"
      :mvp="curBattlelogs.battle.starPlayer?.tag"
      :enemy="true"
      @click="searchPlayer(item.tag.split('#')[1])"
      :type="curBattlelogs.battle.type"
  />
</template>

<script setup>
import {useStore} from "@/store";
const store = useStore()
import MapTrans from '@/utils/MapTranslate'

import {getCurrentInstance, onMounted, reactive, ref} from "vue";
import router from "@/router";
import BattleTimeTrans from "@/utils/battle/BattleTimeTrans";
import {result, battleDuration, battleTypeTrans} from '@/utils/battle/BattleResult'
import Player from '@/components/battlelogs/detail_page/Player'
let modes = getCurrentInstance()?.appContext.config.globalProperties.$modes

let curBattlelogs = ref()
let myTeam = ref(1)

curBattlelogs.value = store.battlelogs[router.currentRoute.value.query.index]

function getMyTeam() {
  for(let i of curBattlelogs.value.battle.teams[0]) {
    if(i.tag === store.profile.tag) {
      myTeam.value = 0
    }
  }
}
getMyTeam()

function searchPlayer(tag) {
  store.searchPlayer(tag)
}

</script>

<style scoped>
.battleInfo_warp {
  height: 40vh;
  padding: 0 10px ;
  display: flex;
  align-items: center;
}
.battleInfo_map {
  width: 50vw;
  position: relative;
  margin: 0 16px;
}
.mode_icon {
  position: absolute;
  width: 35%;
}
.map_img {
  width: 100%;
}
.battleInfo_maptitle {
  font-size: 30px;
  text-shadow: 1px 1px #130f30;
  font-weight: bold;
}
.battleInfo_time, .battleInfo_duration {
  font-size: 16px;
}
.battleInfo_time span:first-child{
  margin-right: 4px;
}
.trophy_change * {
  vertical-align: middle;
}
.trophies_img {
  width: 30px;
  margin-right: 4px;
}
.battleInfo_result_warp {
  margin-top: 10px;
}
.trophy_change {
  font-size: 20px;
}
.battleInfo_result {
  font-size: 44px;
  font-weight: bold;
  text-shadow: 2px 2px 1px #130f30;
}
.player {
}
</style>
