<template>
  <div class="topnav_warp">
    <TopNav :to="'/tactics_board'" :title="`${MapTrans(mapname)}`"/>
    <n-dropdown trigger="hover" :options="options" @select="handleSelect">
      <n-button style="color: white" class="sort_btn">{{options[sortKey].label}}</n-button>
    </n-dropdown>
  </div>
  <div class="map_warp" :style="{'height': showMap? '70%': '5%'}">
    <img
        src="@/assets/close_map.png" alt=""
        class="map_control"
        @click="showMap = !showMap"
        :style="{'transform': showMap? 'rotate(0deg)': 'rotate(180deg)'}"
    >
    <img
        :src="('https://prepan.top/bsAssets/map/'+ mapid +'.png')"
        alt="" class="map"
    >
  </div>
  <div class="table_title" ref="title">
    <n-switch :rail-style="railStyle" style="font-size: 12px" @update:value="changeShowData">
      <template #checked>
        仅头像
      </template>
      <template #unchecked>
        显示数据
      </template>
    </n-switch>
    <span class="table_title_text" v-show="showData">胜率</span>
    <span class="table_title_text" v-show="showData">出场率</span>
  </div>
  <div class="spin-warp" v-if="brawlersStats===null">
    <n-spin size="large" />
    <p>正在获取数据...</p>
  </div>
  <div class="rank_warp">
    <div class="rank_item" v-for="(item, index) in brawlersStats" :key="item.brawler" :style="{'width': showData?'100%': 'auto'}">
      <div class="rank_index" v-show="!showData">
        #{{index+1}}
      </div>
      <RankItem
          :data="item"
          :winLine="winLine"
          :showData="showData"
          :style="{'margin-bottom': showData? '0px': '10px'}"
      />
    </div>
  </div>
  <div class="from">
    <span>数据来自</span> <img src="@/assets/brawlify.png" alt="">
  </div>
</template>

<script setup>
import {onBeforeMount, onMounted, reactive, ref} from "vue";
import { NDropdown, NButton, NSpin, NSwitch } from 'naive-ui'
import router from "@/router";
import TopNav from '../components/TopNav'
import RankItem from '../components/map_rank/RankItem'
import MapTrans from '@/utils/MapTranslate'
import axios from "axios";

let showData = ref(true)

let mapname = ref(null)
let mapid = ref(null)
let brawlersStats = ref(null)
let showMap = ref(false)

let winLine = ref([0,0])

let options =  [
  {
    label: '默认排序',
    key: '0'
  },{
    label: '胜率升序',
    key: '1'
  },{
    label: '出场率降序',
    key: '2'
  },{
    label: '出场率升序',
    key: '3'
  },
]
let sortKey = ref(0)
function handleSelect(e) {
  sortKey.value = e
  if(e === '0') {
    brawlersStats.value.sort((a, b) => b.winRate - a.winRate)
  } else if(e === '1') {
    brawlersStats.value.sort((a, b) => a.winRate - b.winRate)
  } else if(e === '2') {
    brawlersStats.value.sort((a, b) => b.useRate - a.useRate)
  } else if(e === '3') {
    brawlersStats.value.sort((a, b) => a.useRate - b.useRate)
  }
}

function getData(mapid) {
  axios({
    url: `https://api.brawlapi.com/v1/maps/${mapid}`,
    method: 'GET',
    timeout: 12000
  }).then(res => {
    brawlersStats.value = res.data.stats
    winLine.value = [res.data.stats[10].winRate, res.data.stats[55].winRate]
  }).catch(err => {
    window.$message.error('加载失败，请稍后或使用加速器重试')
  })
}

function changeShowData(e) {
  showData.value = !e
}

onBeforeMount(() => {
  mapid.value = router.currentRoute.value.query.id
  getData(mapid.value)
  mapname.value = router.currentRoute.value.query.name
})

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
.sort_btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.map_warp {
  position: relative;
  width: 100%;
  transition: .3s;
  margin-top: 4px;
}
.map_control {
  width: 40px;
  position: absolute;
  bottom: 0;
  right: 2%;
  transition: .3s;
}
.map {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.table_title {
  height: 30px;
  font-size: 18px;
  text-align: right;
  padding: 4px 0 4px 10px;
  margin-top: 6px;
  font-weight: bold;
  background-color: rgba(255,255,255,0.3);
  color: white;
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table_title .table_title_text {
  margin-right: 24px;
}
.spin-warp {
  text-align: center;
  margin: 50px auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.rank_warp {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.rank_item {
  position: relative;
}
.rank_index {
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  font-family: 'djv', serif;
  font-size: 16px;
  background-color: black;
  color: white;
  padding: 2px 4px;
}
.from {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
.from img {
  height: 30px;
  margin-left: 10px;
}
</style>
