<template>
  <div class="ovWarp">
    <h3 class="title">最近对战</h3>
    <div class="con">
      <div class="thumbWarp">
        <div
            v-for="i in battlelogs"
            class="thumb"
            :style="bgc(i)"
        >
          <img :src="'https://prepan.top/bsAssets/modes/'+ modes.indexOf(i.event.mode) + '.png'" alt="" class="modeicon">
        </div>
      </div>
      <div class="battleData">
        <ul class="bd-ul">
          <li>
            <span class="data-title">获胜</span>
            <p class="data-num" style="color: var(--victory)">{{battleData.victory}}</p>
          </li>
          <li>
            <span class="data-title">战败</span>
            <p class="data-num" style="color: var(--defeat)">{{battleData.defeat}}</p>
          </li>
          <li>
            <span class="data-title">平局</span>
            <p class="data-num" style="color: var(--draw)">{{battleData.draw}}</p>
          </li>
          <li>
            <span class="data-title">MVP</span>
            <p class="data-num" style="color: var(--mvp)">{{battleData.mvp}}</p>
          </li>
          <li>
            <span class="data-title">胜率</span>
            <p class="data-num data-last">{{((battleData.victory / battlelogs.length)*100).toFixed(2)}}</p>
          </li>
          <li>
            <span class="data-title">MVP率</span>
            <p class="data-num data-last">{{((battleData.mvp / battlelogs.length)*100).toFixed(2)}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {getCurrentInstance} from "vue";
let modes = getCurrentInstance()?.appContext.config.globalProperties.$modes

import {useStore} from "@/store";
const store = useStore()
let { battlelogs } = store

let battleData = {
  victory: 0,
  defeat: 0,
  draw: 0,
  mvp: 0
}

battlelogs.forEach(i => {
  if(i.battle.rank) {
    i.battle.rank > 5? battleData.defeat++: battleData.victory++
  }
  else battleData[i.battle.result]++
  if(i.battle.starPlayer?.name === store.profile.name) {
    battleData.mvp++
  }
})

function bgc(i) {
  if(i.battle.rank) {
    let result
    i.battle.rank > 5? result = 'defeat': result = 'victory'
    return {backgroundColor: 'var(--' + result + ')'}
  }
  else return {backgroundColor: 'var(--' + (i.battle.result || 'noResult') + ')'}
}
</script>

<style scoped>
.ovWarp {
  border: 1px solid rgba(255,255,255,.6);
  margin: 10px;
  padding: 15px 15px 5px 15px;
}
.title {
  font-size: 20px;
}
.con {
  display: flex;
  justify-content: space-between;
}
.thumbWarp {
  width: 180px;
  min-width: 180px;
  margin-top: 15px;
  display: inline-block;
}
.battleData {
  display: inline-block;
}
.bd-ul{
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
  align-items: flex-end;
  width: 120px;
}
.bd-ul li{
  width: 60px;
  margin-bottom: 10px;
}
.thumb {
  width: 25px;
  height: 25px;
  margin: 0 5px 5px 0;
  display: inline-block;
  padding: 3px;
}
.modeicon {
  width: 25px;
}
.data-num {
  font-family: 'djv', serif;
  margin-top: 4px;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
}
.data-last {
  font-size: 16px;
}
</style>
