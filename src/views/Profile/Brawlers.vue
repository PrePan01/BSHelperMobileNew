<template>
  <n-back-top :right="20" :visibility-height="500" :bottom="70"/>
  <div ref="containerRef" class="container">
    <div class="top3">
      <TopBrawler :data="top3[2]" :topIndex="3"/>
      <TopBrawler :data="top3[0]" :topIndex="1"/>
      <TopBrawler :data="top3[1]" :topIndex="2"/>
    </div>
    <!--排序-->
    <div class="selectWarp">
      <n-popselect
          v-model:value="curSort"
          :options="sortOps"
          size="medium"
          scrollable
      >
        <div class="select-item">{{curSort}}</div>
      </n-popselect>
      <n-popselect
          v-model:value="curGear"
          :options="gearOps"
          size="medium"
          scrollable
          multiple
          @update:value="updateGearSort"
      >
        <div class="select-item">
          <div v-if="Array.isArray(curGear) && curGear.length">
            <span v-for="i in curGear" :key="i" class="gear-sort">{{i}}</span>
          </div>
          <span v-else>全部装备</span>
        </div>
      </n-popselect>
      <div class="select-item">
        <span class="brawlerNum">{{brawlers.length}}</span>  /  68
      </div>
    </div>
    <!--筛选-->
    <div class="levelSlider">
      <div class="levelSlider--title">等级：{{lvSliderCurNum}}</div>
      <n-slider
          v-model:value="levelSlider"
          :step="1" :min="1" :max="11" range
      />
    </div>
    <!--英雄列表-->
    <div  class="brawlers_warp">
      <div class="brawler_item"
           @click="showDetail(item.id, index)"
           v-for="(item, index) in brawlers"
           :key="item.id"
           :style="{background: br[item.id] === 'Chromatic'? 'url(https://prepan.top/bsAssets/chromatic.svg)': brColor[br[item.id]]}">
        <img
            :src="'https://prepan.top/bsAssets/brawlerPortraits/' + item.id + '.png'"
            alt=""
            class="brawler_portrait"
        >
        <div class="trophies">
          <img src="@/assets/trophy_cur.png" alt="" class="trophies_img">
          <div class="trophy">{{ item.trophies }}</div>
          <div class="highestTrophies">{{ item.highestTrophies }}</div>
        </div>
        <div class="name">{{ BrawlerTranslate(item.id) }}</div>
        <div class="lv" :style="{color: item.power===11?'var(--lv11)':''}">Lv{{ item.power }}</div>
      </div>
    </div>
    <n-modal v-model:show="showModal">
      <div>
        <div class="brawler_detail_warp"
             ref="brawlerDetail"
             :style="{
              background: br[selectBrawler] === 'Chromatic'?
              'url(https://prepan.top/bsAssets/chromatic.svg) no-repeat':
              `linear-gradient(127deg, rgb(255,255,255), ${brColor[br[selectBrawler]]} 50%)`,
              backgroundSize: 'cover'
            }">
          <div class="brawler_img">
            <img :src="'https://prepan.top/bs_m/img/skins/' + BIndex[selectBrawler] + '/' + BIndex[selectBrawler ]+ '_1' + '.png'" alt="">
          </div>
          <h2
              :style="{
              fontSize: BrawlerTranslate(selectBrawler).length === 2? '35vw':
              BrawlerTranslate(selectBrawler).length === 3? '25vw':
              BrawlerTranslate(selectBrawler).length === 4? '20vw':
              BrawlerTranslate(selectBrawler).length > 4? '15vw': '',
              lineHeight: BrawlerTranslate(selectBrawler).length === 2? '36vw': '26vw'
            }"
              class="brawler_detail_name"
          >{{BrawlerTranslate(selectBrawler)}}</h2>
          <div class="brawler_detail_info">
            <div :style="{color: brawlers[selectBrawlerIndex].power===11?'var(--lv11)':'white'}" class="brawler_detail_lv">Lv.{{brawlers[selectBrawlerIndex].power}}</div>
            <div class="trophy">
              <div class="trophy_title">当前奖杯</div>
              <img src="@/assets/trophy_cur.png" alt="" class="trophies_img">
              <span class="trophy_num">{{brawlers[selectBrawlerIndex].trophies}}</span>
            </div>
            <div class="trophy">
              <div class="trophy_title">最高奖杯</div>
              <img src="@/assets/trophy_max.png" alt="" class="trophies_img">
              <span class="trophy_num">{{brawlers[selectBrawlerIndex].highestTrophies}}</span>
            </div>
            <div class="brawler_detail_icons">
              <div class="brawler_detail_icons_item_warp">
                <img v-for="sp in brawlers[selectBrawlerIndex].starPowers" :key="sp" :src="('https://prepan.top/bsAssets/starPowersAndGadgets/'+ sp.id +'.png')" alt="" class="bpic">
                <img v-for="sp in brawlers[selectBrawlerIndex].gadgets" :key="sp" :src="('https://prepan.top/bsAssets/starPowersAndGadgets/'+ sp.id +'.png')" alt="" class="bpic">
              </div>
              <div class="brawler_detail_icons_item_warp">
                <img v-for="gear in brawlers[selectBrawlerIndex].gears" :key="gear.name" :src="('https://prepan.top/bsAssets/gears/new/'+ gear.name +'.png')" alt="" class="bpic">
              </div>
            </div>
            <div class="modeResult-warp" v-show="showRecentBattles">
              <ModeResult v-for="item in recentBattles" :mode="item.mode" :result="item.result" class="modeResult-icon"/>
            </div>
          </div>
          <span class="name player-name" v-show="showId">@{{store.profile.name}}</span>
        </div>
        <div class="brawler_detail_ctrl">
          <div class="brawler_detail_ctrl--item">
            <n-switch size="small" v-model:value="showId"/><span>展示ID</span>
          </div>
          <div class="brawler_detail_ctrl--item">
            <n-switch size="small" v-model:value="showRecentBattles"/><span>展示最近对战</span>
          </div>
          <n-button style="color: #FFF" size="small" type="info" class="savepic" @click="savepic">保存图片</n-button>
        </div>
      </div>
    </n-modal>
  </div>


</template>

<script setup>
import {computed, ref, watch} from "vue";
import {NPopselect, NBackTop,NSlider, NModal, NButton, NSwitch} from 'naive-ui'
import TopBrawler from '../../components/TopBrawler'
import {useStore} from "@/store";
const store = useStore()
import { br, brColor, rarity } from '@/utils/brawler/BrawlerRarity'
import BIndex from '@/utils/brawler/BrawlerIndex'
import SavePic from '@/utils/SavePic'
import ModeResult from '@/components/battlelogs/overview/ModeResult'

let brawlerDetail = ref(null)
let showModal = ref(false)
let selectBrawler = ref(0)
let selectBrawlerIndex = ref(0)
import GetBRB from '@/utils/profile/GetBrawlerRecentBattles'

let showId = ref(true)
let showRecentBattles = ref(true)

let recentBattles = ref([])
function showDetail(id,index) {
  showModal.value = true
  selectBrawler.value = id
  selectBrawlerIndex.value = index
  recentBattles.value = GetBRB(id, store)
}

function savepic() {
  SavePic(brawlerDetail.value)
}

import BrawlerTranslate from "@/utils/BrawlerTranslate";
import bSortOptions from "@/utils/brawlerSortOptions";

let curSort = ref('默认排序')
const sortOps = bSortOptions[0]
let curGear = ref('')
const gearOps = bSortOptions[1]


// 装备排序
function sortByGear(_b, name) {
  return _b.filter(i => i.gears.some(gear => gear.name === name))
}

// 装备排序更新选项
function updateGearSort() {
  if(Array.isArray(curGear.value) ) {
    if(curGear.value.length > 6) {
      curGear.value.pop()
      window.$message.info('最多同时选择6个装备')
    }
  }
}

let brawlers = computed(() => {
  let b = store.profile.brawlers

  if(curSort.value !== '默认排序') {
    switch (curSort.value) {
      case '等级升序': {
        b.sort((a, b) => a.power - b.power)
        break
      }
      case '等级降序': {
        b.sort((a, b) => b.power - a.power)
        break
      }
      case '杯数升序': {
        b.sort((a, b) => a.trophies - b.trophies)
        break
      }
      case '杯数降序': {
        b.sort((a, b) => b.trophies - a.trophies)
        break
      }
      case '最高杯数升序': {
        b.sort((a, b) => a.highestTrophies - b.highestTrophies)
        break
      }
      case '最高杯数降序': {
        b.sort((a, b) => b.highestTrophies - a.highestTrophies)
        break
      }
      case '稀有度降序': {
        b.sort((a, b) => rarity.indexOf(br[b.id.toString()]) - rarity.indexOf(br[a.id.toString()]))
        break
      }
      case '稀有度升序': {
        b.sort((a, b) => rarity.indexOf(br[a.id.toString()]) - rarity.indexOf(br[b.id.toString()]))
        break
      }
    }
  }
  else b.sort((a, b) => a.id - b.id)

  if(Array.isArray(curGear.value) && curGear.value.length) {
    if(curGear.value.includes('迅捷')) {
      b = sortByGear(b, 'SPEED')
    }
    if(curGear.value.includes('恢复')) {
      b = sortByGear(b, 'HEALTH')
    }
    if(curGear.value.includes('强攻')) {
      b = sortByGear(b, 'DAMAGE')
    }
    if(curGear.value.includes('洞察')) {
      b = sortByGear(b, 'VISION')
    }
    if(curGear.value.includes('护盾')) {
      b = sortByGear(b, 'SHIELD')
    }
    if(curGear.value.includes('巧手')) {
      b = sortByGear(b, 'RELOAD SPEED')
    }
    if(curGear.value.includes('速充')) {
      b = sortByGear(b, 'SUPER CHARGE')
    }
    if(curGear.value.includes('神话')) {
      let tmp = ['SPEED', 'HEALTH', 'DAMAGE', 'VISION', 'SHIELD', 'RELOAD SPEED', 'SUPER CHARGE']
      b = b.filter(i => i.gears.some(gear => !tmp.includes(gear.name)))
    }
  }

  if(levelSlider.value[0] !== 1 || levelSlider.value[1] !== 11) {
    b = b.filter(i => i.power >= Math.min(...levelSlider.value) && i.power <= Math.max(...levelSlider.value))
  }

  return b
})

function getTop3() {
  let b = store.profile.brawlers
  b.sort((a, b) => b.trophies - a.trophies)
  return b.slice(0,3)
}
let top3 = getTop3()

let levelSlider = ref([1, 11])
let lvSliderCurNum = computed(() => {
  if(levelSlider.value[0] !== levelSlider.value[1]) {
    return `Lv. ${Math.min(...levelSlider.value)} - Lv. ${Math.max(...levelSlider.value)}`
  } else {
    return `Lv. ${levelSlider.value[0]}`
  }
})


</script>

<style scoped>
.container {
  margin-bottom: 10vh;
  color: white;
}
.top3 {
  border-top: 1px solid rgba(255,255,255,.6);
  border-bottom: 1px solid rgba(255,255,255,.6);
  display: flex;
  padding : 20px 0;
  align-items: center;
  justify-content: space-evenly;
}
.gear-sort {
  padding: 0 5px;
}
.selectWarp {
  width: 100%;
  display: flex;
  align-items: center;
  height: 50px;
}
.select-item {
  width: 35%;
  text-align: center;
  border-right: 1px solid rgba(255,255,255,.4);
  font-size: 16px;
}
.select-item:last-child {
  width: 30%;
  border: none;
}
.brawlerNum {
  border-radius: 2px;
  padding: 4px;
  font-size: 18px;
  font-weight: bold;
  font-family: 'lato', serif;
}
.brawlInfo h4 {
  font-weight: normal;
  margin-bottom: 8px;
}

.levelSlider {
  display: flex;
  color: white;
  padding: 2px 20px 10px 20px;
  align-items: center;
}
.levelSlider--title {
  width: 55vw;
  text-align: center;
  font-size: 14px;
}

/*英雄列表*/
.brawlers_warp {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.brawler_item {
  height: 100px;
  width: 40vw;
  margin-bottom: 20px;
  border: 4px solid black;
  position: relative;
  border-bottom: 17px solid black;
}
.brawler_portrait {
  height: 100px;
}

.brawlers_warp .trophies,.name,.lv {
  position: absolute;
  text-shadow: 1.5px 1.5px 1px black;
}

.brawlers_warp .trophies {
  top: -5px;
  right: 4px;
  font-size: 25px;
  font-family: 'djvb', serif;
}
.brawlers_warp .trophies .trophy, .trophies_img {
  display: inline-block;
  vertical-align: middle;
}
.trophies_img {
  width: 30px;
}
.brawlers_warp .name,.lv {
  bottom: -18px;
}
.highestTrophies {
  text-align: right;
  font-size: 16px;
  margin-top: -8px;
}

.brawlers_warp .name {
  left: 6px;
  color: white;
  font-size: 18px;
  font-weight: bold;
}
.brawlers_warp .lv {
  right: 6px;
  font-family: 'djvb', serif;
  font-size: 13px;
}

/*英雄详细信息*/
.brawler_detail_warp {
  background-color: #fff;
  padding: 30px 8px 10px 8px;
  width: 85vw;
  position: relative;
  border: 8px solid #130f30;
}
.brawler_detail_name {
  color: #130f30;
  transform: skew(-5deg);
  text-align-last: justify;
  text-align: center;
  z-index: 0;
  font-weight: bold;
}
.brawler_img {
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  z-index: 1;
  left: 12px;
}
.brawler_img img {
  max-width: 60vw;
  max-height: 300px;
}
.brawler_detail_lv {
  text-align: right;
  font-size: 26px;
  color: black;
  font-family: 'djvb', serif;
  margin-top: -20px;
  text-shadow: 1px 1px black;
}
.brawler_detail_info {
  text-align: right;
  margin-top: 10px;
}
.trophy_title {
  font-size: 16px;
  margin-bottom: -10px;
}
.brawler_detail_info .trophy *{
  vertical-align: middle;
  margin-right: 6px;
}
.brawler_detail_info .trophy {
  text-align: right;
  color: #130f30;
  font-size: 26px;
}
.trophy_num {
  font-family: 'djvb',serif;
}
.brawler_detail_icons_item_warp {
  text-align: right;
}
.modeResult-warp {
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  margin-left: auto;
  justify-content: flex-end
}
.modeResult-icon {
  width: 30px;
  height: 30px;
  margin-right: 6px;
  margin-top: 6px;
}
.bpic {
  width: 40px;
  margin: 0 5px;
  z-index: 1;
}
.name {
  position: absolute;
  left: 6px;
  bottom: 6px;
  text-shadow: none;
  width: 60vw !important;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  word-break:keep-all;
  font-style: italic;
  font-weight: bold;
  color: white;
}
.player-name {
  top: 2px;
  color: black;
}
.brawler_detail_ctrl {
  background-color: #fff;
  width: 90%;
  margin: 10px auto;
  position: relative;
  border-radius: 6px;
  padding: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center
}
.brawler_detail_ctrl--item * {
  vertical-align: middle;
  margin-right: 10px;
  font-size: 12px;
}
.savepic {
/*  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);*/
}
</style>
