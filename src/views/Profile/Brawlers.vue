<template>
  <n-back-top :right="20" :visibility-height="500" :bottom="70"/>
  <div class="container">
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
      >
        <div class="select-item">{{curGear}}</div>
      </n-popselect>
      <div class="select-item">
        <span class="brawlerNum">{{brawlers.length}}</span>  /  60
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

    <Collapse v-model="activeNames">
      <CollapseItem
          :name="item.id"
          v-for="item in brawlers"
      >
        <div class="brawlInfo">
          <div v-if="item.starPowers.length !== 0">
            <h4>星辉之力</h4>
            <span v-for="sp in item.starPowers" :key="sp">
                <img :src="('https://prepan.top/bsAssets/starPowersAndGadgets/'+ sp.id +'.png')" alt="" class="bpic">
            </span>
          </div>
          <div v-if="item.gadgets.length !== 0">
            <h4>武装配件</h4>
            <span v-for="sg in item.gadgets" :key="sg">
                <img :src="('https://prepan.top/bsAssets/starPowersAndGadgets/' + sg.id +'.png')" alt="" class="bpic">
            </span>
          </div>
          <div v-if="item.gears.length !== 0" style="max-width: 40vw">
            <h4>装备</h4>
            <span v-for="gear in item.gears" :key="gear">
                <img :src="('https://prepan.top/bsAssets/gears/new/'+ gear.name +'.png')" alt="" class="bpic">
            </span>
          </div>
        </div>
        <template #title>
          <div class="titleWarp">
            <div class="titleWarp">
              <span class="power" :style="{color: item.power===11?'var(--lv11)':''}">{{item.power}}</span>
              <img :src="'https://prepan.top/bsAssets/brawlers/' + item.id + '.png'" alt="" class="brawlerIcon">
              <span class="name">{{BrawlerTranslate(item.id)}}</span>
            </div>
            <div class="title-r">
              <n-progress
                  type="line"
                  rail-color="white"
                  :percentage="item.trophies / item.highestTrophies * 100"
                  processing
                  color="rgb(252,188,33)"
              >
                <span class="curTro">{{item.trophies}}</span> / {{item.highestTrophies}}
              </n-progress>
            </div>
          </div>
        </template>
      </CollapseItem>
    </Collapse>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {NProgress, NPopselect, NBackTop,NSlider} from 'naive-ui'
import { Collapse, CollapseItem } from 'vant';
import TopBrawler from '../../components/TopBrawler'
import {useStore} from "@/store";
const store = useStore()

const activeNames = ref(['1']);

import BrawlerTranslate from "@/utils/BrawlerTranslate";
import bSortOptions from "@/utils/brawlerSortOptions";

let curSort = ref('默认排序')
const sortOps = bSortOptions[0]
let curGear = ref('全部装备')
const gearOps = bSortOptions[1]
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
    }
  }
  else b.sort((a, b) => a.id - b.id)

  if(curGear.value !== '全部装备') {
    switch (curGear.value) {
      case '迅捷': {
        b = b.filter(i => i.gears.some(gear => gear.name === 'SPEED'))
        break
      }
      case '恢复': {
        b = b.filter(i => i.gears.some(gear => gear.name === 'HEALTH'))
        break
      }
      case '强攻': {
        b = b.filter(i => i.gears.some(gear => gear.name === 'DAMAGE'))
        break
      }
      case '洞察': {
        b = b.filter(i => i.gears.some(gear => gear.name === 'VISION'))
        break
      }
      case '护盾': {
        b = b.filter(i => i.gears.some(gear => gear.name === 'SHIELD'))
        break
      }
      case '巧手': {
        b = b.filter(i => i.gears.some(gear => gear.name === 'RELOAD SPEED'))
        break
      }
      case '速充': {
        b = b.filter(i => i.gears.some(gear => gear.name === 'SUPER CHARGE'))
        break
      }
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
.titleWarp {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  position: relative;
}
.power {
  position: absolute;
  left: 0;
  top: 1px;
  background-color: black;
  padding: 2px 4px 0 4px;
  font-family: 'lato',serif;
  font-weight: bold;
}
.name {
  font-size: 18px;
  text-shadow: 1px 1px black;
}
.brawlerIcon {
  width: 60px;
  margin-right: 10px;
}
.title-r {
  width: 50%;
}
.curTro {
  font-size: 18px;
  color: rgb(252,188,33);
  font-family: 'djvb',serif;
}
.brawlInfo {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  padding: 10px 0;
}
.brawlInfo h4 {
  font-weight: normal;
  margin-bottom: 8px;
}
.bpic {
  height: 30px;
  margin: 0 10px;
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
</style>
