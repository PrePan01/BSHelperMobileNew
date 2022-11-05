<template>
  <div class="warp" v-if="Object.keys(store.profile).length !== 0">
    <n-dropdown trigger="hover" :options="filterOptions" @select="handleSelect">
      <n-button class="filter">{{curFilter}}</n-button>
    </n-dropdown>
    <Overview></Overview>
    <n-carousel show-arrow :show-dots="false" class="carousel">
      <template #arrow="{ currentIndex, prev, next }">
        <div class="custom-arrow">
          <div @click="prev" v-if="currentIndex === 1 || currentIndex === 2">
            <div class="arrow">←</div>
          </div>
          <div @click="next" v-if="currentIndex === 0 || currentIndex === 1">
            <div class="arrow" style="margin-top: 5px">→</div>
          </div>
        </div>
      </template>
      <Line></Line>
      <Pie
          class="pie"
          :brawlersData="brawlersData[0]"
          :title="'我的成分'"
      />
      <Pie
          class="pie"
          :brawlersData="brawlersData[1]"
          :title="'队友 & 敌人'"
      />
    </n-carousel>
    <Collapse v-model="activeNames">
      <CollapseItem
          v-for="item in blgs"
          :key="item.battleTime"
          class="citem"
          :style="bLeft(item)"
      >
        <div class="detail">
          <DDuoSD :data="item" v-if="item.battle.mode === 'duoShowdown'"></DDuoSD>
          <DSD :data="item" v-if="item.battle.mode === 'soloShowdown' || item.battle.mode === 'bossFight'"></DSD>
          <DTvsT :data="item" v-if="!tModes.includes(item.battle.mode)"></DTvsT>
        </div>
        <template #title>
          <DuoSD :data="item" v-if="item.battle.mode === 'duoShowdown'"></DuoSD>
          <SD :data="item" v-if="item.battle.mode === 'soloShowdown' || item.battle.mode === 'bossFight'"></SD>
          <TvsT :data="item" v-if="!tModes.includes(item.battle.mode)"></TvsT>
        </template>
      </CollapseItem>
    </Collapse>
  </div>
  <Empty v-if="Object.keys(store.profile).length === 0"/>
  <n-back-top :right="20" :visibility-height="500" :bottom="70"/>
  <BottomNav></BottomNav>
</template>

<script setup>
import { Collapse, CollapseItem } from 'vant';
import {NCarousel, NButton, NDropdown, NBackTop} from 'naive-ui'
import {computed, getCurrentInstance, reactive, ref, toRaw} from "vue";
import BottomNav from '../components/BottomNav'
import Overview from '../components/battlelogs/Overview'
import Line from '../components/battlelogs/Line'
import Pie from '../components/battlelogs/Pie'
import TvsT from '../components/battlelogs/title/TvsT'
import DuoSD from '../components/battlelogs/title/DuoSD'
import SD from '../components/battlelogs/title/SD'
import DTvsT from '../components/battlelogs/detail/D-TvsT'
import DSD from '../components/battlelogs/detail/D-SD'
import DDuoSD from '../components/battlelogs/detail/D-DuoSD'
import Empty from '../components/Empty'

import {useStore} from "@/store";
const store = useStore()

let blgs = computed(() => {
  if(curFilter.value === '全部') return store.battlelogs
  else if(curFilter.value === '仅看获胜') return store.battlelogs.filter(i => i.battle.result === 'victory' || i.battle.rank <= 4)
  else if(curFilter.value === '仅看战败') return store.battlelogs.filter(i => i.battle.result === 'defeat' || i.battle.rank > 4)
  else if(curFilter.value === '仅看MVP') return store.battlelogs.filter(i => i.battle.starPlayer?.tag === store.profile.tag)
})

let filterOptions =  [
  {
    label: '全部',
    key: "全部"
  },
  {
    label: '仅看获胜',
    key: '仅看获胜'
  },
  {
    label: '仅看战败',
    key: '仅看战败'
  },
  {
    label: '仅看MVP',
    key: '仅看MVP'
  }
]
let curFilter = ref('全部')
function handleSelect(i) {
  curFilter.value = i
}


const activeNames = ref(['1']);

// let modes = getCurrentInstance()?.appContext.config.globalProperties.$modes
const tModes = ['duoShowdown', 'soloShowdown', 'bossFight']

function bLeft(item) {
  if(item.battle.rank) {
    let result
    item.battle.rank > 5? result = 'defeat': result = 'victory'
    return {borderLeft: '5px solid var(--' + result + ')'}
  }
  else return {borderLeft: '5px solid var(--' + item.battle.result + ')'}
}

import getBattleBrawlers from "@/utils/GetBattleBrawlers";
let brawlersData = getBattleBrawlers(store.battlelogs, store.profile.tag)
</script>

<style>
.van-cell {
  align-items: center;
}
</style>

<style scoped>
.warp {
  margin-bottom: 10vh;
  position: relative;
}
.filter {
  position: absolute;
  right: 20px;
  color: white;
  top: 15px;
}
.citem {
  /*padding: 10px 10px;*/
}
.detail {
  padding: 10px 0;
}
.carousel {
  position: relative;
}
.custom-arrow {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 10px;
  bottom: 18px;
}
.arrow {
  padding: 6px 4px;
  border: 1px solid rgba(255,255,255,.7);
  color: rgb(255,255,255);
  background-color: rgba(196, 194, 194, 0.1);
  border-radius: 4px;
}
.pieContainer {
  display: flex;
}
</style>
