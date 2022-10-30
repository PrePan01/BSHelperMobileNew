<template>
  <div :key="nanoid()">
    <n-back-top :right="20" :visibility-height="500"/>
    <NavBar
        :title="ModeTranslate(mapData.mode) +' / '+ MapTranslate(mapData.map)"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    >
      <template #right>
        <n-dropdown :options="options" @select="handleSelect">
          <n-button  size="small">{{curOp}}</n-button>
        </n-dropdown>
      </template>
    </NavBar>
    <Loading class="loading"  color="#1989fa" v-if="showLoading"/>
    <n-data-table
        :columns="columns"
        :data="mapData.stats"
    />
  </div>
</template>

<script setup>
import {useStore} from "@/store";
let store = useStore()
import {nanoid} from 'nanoid'
import {NDataTable, NBackTop, NButton, NDropdown} from 'naive-ui'
import {h, onBeforeMount, reactive, ref} from "vue";
import { NavBar, Loading  } from 'vant';
import router from "@/router";
import MapTranslate from "@/utils/MapTranslate";
import ModeTranslate from "@/utils/ModeTranslate";
import axios from "axios";

let showLoading = ref(false)

let curOp = ref('全杯段')
let options = [
  {
    label: '全杯段',
    key: "全杯段"
  },
  {
    label: '0-299',
    key: '0-299'
  },
  {
    label: '300-599',
    key: '300-599'
  },
  {
    label: '600+',
    key: '600+'
  }
]
function handleSelect(data) {
  showLoading.value = true
  curOp.value = data
  getData()
}

const columns = [
  {
    title: '英雄',
    key: 'brawler',
    render (row) {
      return h(
          <img src={'https://prepan.top/bsAssets/brawlers/' + row.brawler + '.png'} alt="" style="width: 50px"/>
      )
    }
  },
  {
    title: '胜率',
    key: 'winRate',
    sorter: (row1, row2) => row1.winRate - row2.winRate,
    render (row) {
      return h(
          <div>{row.winRate.toFixed(2)}%</div>
      )
    }
  },
  {
    title: 'Pick率',
    key: 'useRate',
    sorter: (row1, row2) => row1.useRate - row2.useRate,
    render (row) {
      return h(
          <div>{row.useRate.toFixed(2)}%</div>
      )
    }
  },
  {
    title: 'MVP率',
    key: 'starRate',
    sorter: (row1, row2) => row1.starRate - row2.starRate,
    render (row) {
      return h(
          <div>{row.starRate.toFixed(2)}%</div>
      )
    }
  }]

let mapData = reactive({
  stats: null,
  mode: null,
  map: null
})

let target

function getData() {
  axios({
    url: `https://api.brawlapi.com/v1/events${curOp.value === '全杯段'?'':'/' + curOp.value}`,
    method: 'GET'
  }).then (res =>{
    let tmp = res.data[target.type][target.index]
    mapData.stats = tmp.map.stats
    mapData.mode = tmp.map.gameMode.name
    mapData.map = tmp.map.name
    showLoading.value = false
  })
}

onBeforeMount(() => {
  target = router.currentRoute.value.query
  getData()
})

function onClickLeft() {
  router.back()
}

</script>

<style scoped>
.loading {
  position: absolute;
  z-index: 1;
  top: 8px;
  right: 30px;
}
</style>
