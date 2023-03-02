<template>
  <div class="topnav_warp">
    <TopNav :to="'/more'" :title="'战术板'"/>
    <n-button style="color: white" class="map_btn" @click="mapSelectWarp = true">更换地图</n-button>
  </div>

  <!--地图选择-->
  <n-drawer v-model:show="mapSelectWarp" placement="left">
    <div class="mapselect_warp">
      <div class="mapselect_warp_title">
        <span>地图选择</span>
        <n-switch :rail-style="railStyle" @update:value="update_map_class">
          <template #checked>
            星光联赛
          </template>
          <template #unchecked>
            全部地图
          </template>
        </n-switch>
      </div>

      <!--模式选择-->
      <div class="mapselect_mode_warp">
        <img
            v-for="(item, index) in maps"
            :key="index"
            :src="('https://prepan.top/bsAssets/modes/'+ item +'.png')"
            alt=""
            @click="selectMode(item)"
        >
      </div>

      <!--地图选择-->
      <div
          class="mapselect_maps_warp"
          v-for="(item, index) in Object.keys(mappics)"
          :key="index"
          @click="selectMap(item)"
          v-show="!mapclass || mappics[item].curSeason === 'true'"
      >
        <span v-if="mappics[item].curSeason === 'true'" class="cur_season">S17</span>
        <img
            :src="('https://prepan.top/bsAssets/map/'+ item +'.png')"
            alt="" class="mapimg"
        >
        <div class="map_title">{{MapTrans(mappics[item].name)}}</div>
      </div>
    </div>
  </n-drawer>

  <div class="container">
    <div class="map_warp">
      <div class="selectmap_title">{{MapTrans(selectmap.name)}}</div>
      <img :src="('https://prepan.top/bsAssets/map/'+ selectmap.id +'.png')" alt="" class="mapimg">
      <div class="select_pins" v-for="(item, index) in picks" :key="item" v-draggable>
        <img src="@/assets/delete.png" alt="" class="del_btn" @click="deletePick(item)" v-show="showControlBtn.includes(item)">
        <img
            @click="controlBtn(item)"
            :src="('https://prepan.top/bsAssets/brawlerPins/happy/'+ item +'.png')"
            alt=""
            :style="{width: iconSize[item] + 'px'}"
        >
        <n-slider
            class="size_slider"
            v-model:value="iconSize[item]"
            :step="10"
            v-show="showControlBtn.includes(item)"
            :min="50"
            :max="150"
        />
      </div>
    </div>
    <!--英雄选择-->
    <div class="pin_warp">
      <img
          :src="('https://prepan.top/bsAssets/brawlers/'+ item +'.png')"
          alt=""
          v-for="(item, index) in brawlersList"
          :key="index"
          class="pins"
          @click="addBrawler(item)"
      >
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import TopNav from '../components/TopNav'
import {getCurrentInstance, ref} from "vue";
import {NSlider, NButton, NDrawer, NSwitch} from 'naive-ui'
import MapTrans from '@/utils/MapTranslate'
let brawlersList = getCurrentInstance()?.appContext.config.globalProperties.$brawlers

import vDraggable from '@/directives/draggable'

let picks = ref([])
function addBrawler(b) {
  if(picks.value.includes(b)) {
    window.$message.info('这个英雄已经在场上啦')
    return
  }
  iconSize.value[b] = 80
  picks.value.push(b)
  console.log(picks)
}

let showControlBtn = ref([])
let iconSize = ref({})
function controlBtn(b) {
  if(showControlBtn.value.includes(b)) {
    showControlBtn.value = showControlBtn.value.filter(item => item !== b)
  } else {
    showControlBtn.value.push(b)
  }
}
function deletePick(b) {
  picks.value = picks.value.filter(item => item !== b)
  showControlBtn.value = showControlBtn.value.filter(item => item !== b)
}

let mapSelectWarp = ref(false)
// 宝石 足球 赏金 金库 热区 淘汰赛 擂台赛 篮球
let maps = [0,1,2,3,4,6,9,12]
let mappics = ref({})
let selectmode = ref(0)
let selectmap = ref({id: 15000007, name: 'Hard Rock Mine'})
function selectMode(mode) {
  selectmode.value = mode
  axios({
    // url: `/prepan/bsAssets/map/data/${mode}.json`,
    url: `https://prepan.top/bsAssets/map/data/${mode}.json`,
    methods: 'GET'
  }).then(res => {
    mappics.value = res.data
  })
}
selectMode(0)
function selectMap(map) {
  selectmap.value = {
    id: map,
    name: mappics.value[map].name
  }
}

let mapclass = ref(false)
function update_map_class(e) {
  mapclass.value = e
}

let railStyle = ({
  focused,
  checked
}) => {
  const style = {};
  if (checked) {
    style.background = "#d03050";
  } else {
    style.background = "#2080f0";
  }
  return style;
}

</script>

<style scoped>
.topnav_warp {
  position: relative;
}
.map_btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.container {
  height: 93vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.map_warp {
  text-align: center;
  border: 3px solid black;
  max-height: 70vh;
  max-width: 90vw;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  position: relative;
  overflow: hidden;
  margin-top: 10px;
  padding-bottom: 10px;
}
.selectmap_title {
  padding-top: 10px;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 1px 1px black;
}
.mapimg {
  max-width: 90%;
  height: 90%;
  object-fit: cover;
}
.pin_warp {
  width: 100vw;
  height: 15vh;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  flex-wrap: wrap;
  margin: 0 auto;
}
.pins {
  height: 7vh;
  display: inline-block;
}
.select_pins{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.del_btn {
  position: absolute;
  left: -15px;
  top: -15px;
  width: 30px;
}
.size_slider {
  position: absolute;
  bottom: -10px;
}
.mapselect_warp {
  padding: 10px;
}
.mapselect_warp_title {
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mapselect_warp_title span {
  font-size: 22px;
  font-weight: bold;
}
.mapselect_mode_warp {
  height: 40px;
  overflow: scroll;
  display: flex;
  border: 1px solid black;
  padding: 10px 0;
}
.mapselect_mode_warp img {
  padding: 0 8px;
  border-right: 1px solid black;
}
.mapselect_mode_warp img:last-child {
  border: none;
}
.mapselect_maps_warp {
  width: 100%;
  position: relative;
  margin-bottom: 10px;
}
.cur_season {
  position: absolute;
  top: 5px;
  left: 5px;
  color: white;
  padding: 3px 6px;
  background-color: red;
  border-radius: 10px;
  font-family: 'djvb', serif;
}
.mapselect_maps_warp img {
  width: 100%;
}
.map_title {
  text-align: center;
}
</style>
