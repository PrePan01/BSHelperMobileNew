<template>
  <div class="topnav_warp">
    <TopNav :to="'/more'" :title="'战术板'"/>
    <div class="map_btn">
      <n-button style="color: white" @click="saveMap" class="map_btn_item">保存地图</n-button>
      <n-button style="color: white" @click="mapSelectWarp = true">更换地图</n-button>
    </div>
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
            :class="{mapselect_mode_selected: item === selectmode}"
        >
      </div>

      <!--地图选择-->
      <div class="mapselect_maps_container">
        <div
            class="mapselect_maps_warp"
            v-for="(item, index) in Object.keys(mappics)"
            :key="index"
            @click="selectMap(item)"
            v-show="!mapclass || mappics[item].curSeason === 'true'"
        >
          <span v-if="mappics[item].curSeason === 'true'" class="cur_season">S18</span>
          <img
              :src="('https://prepan.top/bsAssets/map/'+ item +'.png')"
              alt="" class="mapimg"
          >
          <div class="map_title" :class="{map_selected: selectmap.name === mappics[item].name}">{{MapTrans(mappics[item].name)}}</div>
        </div>
      </div>
    </div>
  </n-drawer>

  <div class="container">
    <img
        src="@/assets/title_icon.png"
        alt=""
        class="map_rank_icon"
        @click="$router.push(`/maprank?id=${selectmap.id}&name=${selectmap.name}`)"
    >
    <div class="map_warp" ref="map_pic">
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
            :min="30"
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
          :class="{brawlerSelected: picks.includes(item)}"
      >
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import TopNav from '../components/TopNav'
import {getCurrentInstance, onMounted, ref} from "vue";
import {NSlider, NButton, NDrawer, NSwitch} from 'naive-ui'
import MapTrans from '@/utils/MapTranslate'
import vDraggable from '@/directives/draggable'
import SavePic from '@/utils/SavePic'
let brawlersList = getCurrentInstance()?.appContext.config.globalProperties.$brawlers
let map_pic = ref(null)
function saveMap() {
  SavePic(map_pic.value)
}

let picks = ref([])
function addBrawler(b) {
  if(picks.value.includes(b)) {
    deletePick(b)
    // window.$message.info('这个英雄已经在场上啦')
    return
  }
  iconSize.value[b] = 50
  picks.value.push(b)
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
// 宝石 足球 赏金 金库 热区 淘汰赛 擂台赛 篮球 排球
let maps = [0,1,2,3,4,6,9,12, 20]
let mappics = ref({})
let selectmode = ref(0)
let selectmap = ref({id: 15000007, name: 'Hard Rock Mine', mode: 0})
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
    name: mappics.value[map].name,
    mode: selectmode.value
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
  display: inline-block;
  top: 50%;
  transform: translateY(-50%);
}
.map_btn_item {
  margin-right: 10px;
}
.container {
  height: 93vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.map_rank_icon {
  position: absolute;
  width: 65px;
  z-index: 1;
  top: 8%;
  right: 20px;
}
.map_warp {
  text-align: center;
  max-height: 70vh;
  max-width: 90vw;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}
.map_list_btn {
  position: absolute;
  bottom: 20%;
  right: 50%;
  transform: translateX(50%);
}
.selectmap_mode {
  position: absolute;
  left: 20px;
  z-index: 1;
  width: 65px;
}
.selectmap_title {
  margin-top: 10px;
  padding: 6px 16px;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 1px 1px black;
  background-color: rgb(64,106,223);
  transform: skew(-3deg);
  display: inline-block;
  border: 3px solid black;
}

.mapimg {
  max-width: 100%;
  height: 90%;
  object-fit: cover;
  display: block;
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
  left: -10px;
  top: -10px;
  width: 20px;
}
.size_slider {
  position: absolute;
  bottom: -10px;
}
.mapselect_warp {
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.mapselect_warp_title {
  margin-bottom: 8px;
  padding: 12px 10px 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mapselect_warp_title span {
  font-size: 22px;
  font-weight: bold;
}
.mapselect_mode_warp {
  overflow: scroll;
  min-height: 40px;
  display: flex;
  border: 1px solid black;
  padding: 10px 0;
  margin: 0 10px 10px 10px;
}
.mapselect_mode_warp img {
  height: 40px;
  padding: 0 8px;
}
.mapselect_mode_selected {
  filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.6));
}
.mapselect_maps_container {
  overflow: scroll;
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
  font-size: 16px;
  font-weight: bold;
  position: absolute;
  bottom: 0;
  left: 50%;
  color: white;
  text-shadow: 1px 1px black;
  border: 2px solid black;
  background-color: rgb(51,59,82);
  padding: 4px 6px;
  transform: translateX(-50%) skew(-5deg);
}
.map_selected {
  box-shadow: 2px 2px 2px black;
  background-color: rgb(64,106,223);
  transition: .3s;
}
@keyframes spark {
  0% {
    filter: brightness(100%);
  }
  50% {
    filter: brightness(150%);
  }
  100% {
    filter: brightness(100%);
  }
}
.brawlerSelected {
  animation: spark 2s infinite;
}
</style>
