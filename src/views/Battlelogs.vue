<template>
  <NSpin :show="store.showSpin" stroke="rgb(255,255,1)" :size="60">
    <div class="warp" v-if="Object.keys(store.profile).length !== 0">
      <n-dropdown trigger="hover" :options="filterOptions" @select="handleSelect">
        <n-button class="filter">{{curFilter}}</n-button>
      </n-dropdown>
      <Overview/>
      <n-collapse
          display-directive="show"
          :default-expanded-names="['1']"
          @item-header-click="changeCol"
      >
        <template #arrow>
          <div></div>
        </template>
        <n-collapse-item title="" name="1">
          <template #header>
            <div class="closeCol">
              <span>{{ colExpanded?'收起':'展开' }}</span>
              <img src="@/assets/close.png" alt="" :class="colExpanded?'':'openCol'">
              <span>一览</span>
            </div>
          </template>
          <n-carousel show-arrow :show-dots="false" class="carousel">
            <template #arrow="{ currentIndex, prev, next }">
              <div class="custom-arrow">
                <div @click="prev" v-if="currentIndex === 1">
                  <div class="arrow">←</div>
                </div>
                <div @click="next" v-if="currentIndex === 0">
                  <div class="arrow" style="margin-top: 5px">→</div>
                </div>
              </div>
            </template>
            <div>
              <Line/>
              <Pie
                  class="pie"
                  :brawlersData="brawlersData[0]"
                  :battleResult = "brawlersData[2]"
                  :title="'我的成分'"
              />
            </div>
            <div>
              <Pie
                  class="pie"
                  :brawlersData="brawlersData[1]"
                  :title="'队友成分'"
              />
              <Pie
                  class="pie"
                  :brawlersData="brawlersData[3]"
                  :title="'敌人成分'"
              />
            </div>
          </n-carousel>
        </n-collapse-item>
      </n-collapse>

      <Collapse v-model="activeNames" class="blgs--col">
        <CollapseItem
            v-for="item in blgs"
            :key="item.battleTime"
            class="citem"
            :style="bLeft(item)"
        >
          <div class="detail">
            <DDuoSD :data="item" v-if="item.battle.mode === 'duoShowdown'"/>
            <DDuels :data="item" v-if="item.battle.mode === 'duels'"/>
            <DSD :data="item" v-if="tModes[1].includes(item.battle.mode)"/>
            <DTvsT :data="item" v-if="!tModes.flat().includes(item.battle.mode)"/>
          </div>
          <template #title>
            <DuoSD :data="item" v-if="item.battle.mode === 'duoShowdown'"/>
            <Duels :data="item" v-if="item.battle.mode === 'duels'"/>
            <SD :data="item" v-if="tModes[1].includes(item.battle.mode)"/>
            <TvsT :data="item" v-if="!tModes.flat().includes(item.battle.mode)"/>
          </template>
        </CollapseItem>
      </Collapse>
    </div>
  </NSpin>
  <Empty v-if="Object.keys(store.profile).length === 0"/>
  <n-back-top :right="20" :visibility-height="500" :bottom="70"/>
  <BackMe class="backme"/>
  <BottomNav/>
</template>

<script setup>
import { Collapse, CollapseItem } from 'vant';
import {NCarousel, NButton, NDropdown, NBackTop, NCollapse, NCollapseItem, NSpin} from 'naive-ui'
import {computed, getCurrentInstance, h, onMounted, reactive, ref, toRaw} from "vue";
import BottomNav from '../components/BottomNav'
import Overview from '../components/battlelogs/Overview'
import Line from '../components/battlelogs/Line'
import Pie from '../components/battlelogs/Pie'
import TvsT from '../components/battlelogs/title/TvsT'
import DuoSD from '../components/battlelogs/title/DuoSD'
import Duels from '../components/battlelogs/title/Duels'
import SD from '../components/battlelogs/title/SD'
import DTvsT from '../components/battlelogs/detail/D-TvsT'
import DSD from '../components/battlelogs/detail/D-SD'
import DDuoSD from '../components/battlelogs/detail/D-DuoSD'
import DDuels from '../components/battlelogs/detail/D-Duels'
import Empty from '../components/Empty'
import BackMe from '@/components/BackMe'

import {useStore} from "@/store";
const store = useStore()

function selectByMode(modeNameEn) {
  return store.battlelogs.filter(i => i.event.mode === modeNameEn)
}

let blgs = computed(() => {
  switch (curFilter.value) {
    case '全部': return store.battlelogs
    case '仅看获胜': return store.battlelogs.filter(i => i.battle.result === 'victory' || i.battle.rank <= 4)
    case '仅看战败': return store.battlelogs.filter(i => i.battle.result === 'defeat' || i.battle.rank > 4)
    case '仅看MVP': return store.battlelogs.filter(i => i.battle.starPlayer?.tag === store.profile.tag)
    case '宝石争霸': return selectByMode('gemGrab')
    case '乱斗足球': return selectByMode('brawlBall')
    case '赏金猎人': return selectByMode('bounty')
    case '金库攻防': return selectByMode('heist')
    case '热区争夺': return selectByMode('hotZone')
    case '乱斗淘汰赛': return selectByMode('knockout')
    case '荒野决斗': return selectByMode('soloShowdown')
    case '双人荒野决斗': return selectByMode('duoShowdown')
    case '乱斗擂台赛': return selectByMode('duels')
    case '积分争夺赛': return selectByMode('wipeout')
    case '乱斗篮球': return selectByMode('basketBrawl')
    case '雪中送礼': return selectByMode('snowtelThieves')
  }
})

let colExpanded = ref(true)
function changeCol(e) {
  colExpanded.value = e.expanded
}

import ModeTran from '@/utils/ModeTranslate'
let filterOptTmp = [['全部',''],['仅看获胜',''],['仅看战败',''],['仅看MVP','']]
let _m = []
store.battlelogs.forEach(i => {
  if(!_m.includes(ModeTran(i.event.mode))){
    filterOptTmp.push([ModeTran(i.event.mode), i.event.mode])
    _m.push(ModeTran(i.event.mode))
  }
})

let filterOptions = computed(() => {
  let _t = []
  filterOptTmp.forEach(i => {
    if(!i[0]) {

    } else {
      if(['全部','仅看获胜','仅看战败','仅看MVP'].includes(i[0])) {
        _t.push({
          label: i[0],
          key: i[0]
        })
      } else {
        _t.push({
          label: i[0],
          key: i[0],
          icon: () => {
            return h('img', {
              'src': `https://prepan.top/bsAssets/modes/${modes.indexOf(i[1])}.png`,
              'style': 'height: 80%'
            })
          }
        })
      }
    }

  })
  return _t
})


let curFilter = ref('全部')
function handleSelect(i) {
  curFilter.value = i
}


const activeNames = ref(['1']);

let modes = getCurrentInstance()?.appContext.config.globalProperties.$modes
const tModes = ['duoShowdown', ['soloShowdown', 'bossFight','bigGame','roboRumble'], 'duels']

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
.closeCol {
  width: 100%;
  text-align: center;
  color: white;
}
.closeCol img {
  width: 20px;
  transition: .3s;
  padding: 0 10px 3px 10px;
}
.closeCol img, span{
  vertical-align: middle;
}
.openCol {
  transform: rotate(180deg);
  transition: .3s;
}
.citem {
  /*padding: 10px 10px;*/
}
.detail {
  padding: 10px 0;
}
.carousel {
  position: relative;
  margin-top: -20px;
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
.blgs--col {
  margin-top: 10px;
}
.backme {
  position: sticky;
  bottom: 20vh;
}
.spinInfo {
  color: rgb(255,255,1);
  margin-top: 20px;
  font-size: 16px;
}
</style>
