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

    <n-spin size="large" v-if="curLoading" class="curLoading">
      <template #description>
        正在获取当前对战数据...
      </template>
    </n-spin>

    <n-data-table
        v-if="mapData.stats"
        :columns="curOp === '单人'? colSolo: colTeam"
        :data="mapData.stats"
        :scroll-x="curOp === '单人'? undefined: 750"
    >
      <template #empty>
        <div>
          <img src="../assets/sad.png" alt="" style="width: 150px;text-align: center">
          <h2 style="text-align: center">暂无此地图数据</h2>
        </div>
      </template>
    </n-data-table>
  </div>
</template>

<script setup>
import {useStore} from "@/store";
let store = useStore()
import {nanoid} from 'nanoid'
import {NDataTable, NBackTop, NButton, NDropdown, NSpin} from 'naive-ui'
import {defineComponent, h, onBeforeMount, reactive, ref} from "vue";
import { NavBar, Loading  } from 'vant';
import router from "@/router";
import MapTranslate from "@/utils/MapTranslate";
import ModeTranslate from "@/utils/ModeTranslate";
import axios from "axios";

let showLoading = ref(false)

/*let curOp = ref('全杯段')
let options = [
  {
    label: '全杯段',
    key: "全杯段"
  },
  {
    label: '0-299',
    key: '0-299',
    disabled: true
  },
  {
    label: '300-599',
    key: '300-599',
    disabled: true
  },
  {
    label: '600+',
    key: '600+',
    disabled: true
  }
]*/

let curOp = ref('单人')
let options = [
  {
    label: '单人',
    key: "单人"
  },
  {
    label: '队伍',
    key: '队伍'
  }
]
function handleSelect(data) {
  // showLoading.value = true
  curOp.value = data
  changeSoloTeamSelect()
}

const colSolo = [
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
          <div
              style={{color: row.winRate?.toFixed(2) > 60 ? 'red' : row.winRate?.toFixed(2) < 45 ? 'green':'black'}}
          >{row.winRate?.toFixed(2)}%</div>
      )
    }
  },
  {
    title: 'Pick率',
    key: 'useRate',
    sorter: (row1, row2) => row1.useRate - row2.useRate,
    render (row) {
      return h(
          <div
              style={{color: row.useRate?.toFixed(2) > 3 ? 'red' : row.useRate?.toFixed(2) < 1 ? 'green':'black'}}
          >{row.useRate?.toFixed(2)}%</div>
      )
    }
  },
  {
    title: 'MVP率',
    key: 'starRate',
    sorter: (row1, row2) => row1.starRate - row2.starRate,
    render (row) {
      return h(
          <div
              style={{color: row.starRate?.toFixed(2) > 3 ? 'red' : row.starRate?.toFixed(2) < 1 ? 'green':'black'}}

          >{row.starRate?.toFixed(2) || '暂无数据'}%</div>
      )
    }
  }]
const colTeam = [
  {
    title: '英雄',
    key: 'brawler',
    width: 120,
    fixed: 'left',
    render (row) {
      return h(
          <div>
            <img src={'https://prepan.top/bsAssets/brawlers/' + row.brawler1 + '.png'} alt="" style="width: 30px"/>
            <img src={'https://prepan.top/bsAssets/brawlers/' + row.brawler2 + '.png'} alt="" style="width: 30px"/>
            <img src={'https://prepan.top/bsAssets/brawlers/' + row.brawler3 + '.png'} alt="" style="width: 30px"/>
          </div>
      )
    }
  },
  {
    title: '胜率',
    key: 'winRate',
    width: 90,
    sorter: (row1, row2) => row1.data.winRate - row2.data.winRate,
    render (row) {
      return h(
          <div
              // style={{color: row.data.winRate?.toFixed(2) > 60 ? 'red' : row.data.winRate?.toFixed(2) < 45 ? 'green':'black'}}
          >{row.data.winRate?.toFixed(2)}%</div>
      )
    }
  },
  {
    title: 'Pick率',
    key: 'useRate',
    width: 90,
    sorter: (row1, row2) => row1.data.useRate - row2.data.useRate,
    render (row) {
      return h(
          <div
              // style={{color: row.data.useRate?.toFixed(2) > 3 ? 'red' : row.data.useRate?.toFixed(2) < 1 ? 'green':'black'}}
          >{row.data.useRate?.toFixed(2)}%</div>
      )
    }
  },
  {
    title: '胜利场次',
    key: 'wins',
    sorter: (row1, row2) => row1.data.wins - row2.data.wins,
    render (row) {
      return h(
          <div>{row.data.wins}</div>
      )
    }
  },
  {
    title: '战败场次',
    key: 'losses',
    sorter: (row1, row2) => row1.data.losses - row2.data.losses,
    render (row) {
      return h(
          <div>{row.data.losses}</div>
      )
    }
  },
  {
    title: '平局场次',
    key: 'draws',
    sorter: (row1, row2) => row1.data.draws - row2.data.draws,
    render (row) {
      return h(
          <div>{row.data.draws}</div>
      )
    }
  },
  {
    title: '总场次',
    key: 'total',
    sorter: (row1, row2) => row1.data.total - row2.data.total,
    render (row) {
      return h(
          <div>{row.data.total}</div>
      )
    }
  }]

let mapData = reactive({
  stats: null,
  mode: null,
  map: null
})

let target

let tmp
let curLoading = ref(false)
function getData() {
  curLoading.value = true
  axios({
    url: `https://api.brawlapi.com/v1/events`,
    method: 'GET'
  }).then (res =>{
    tmp = res.data[target.type][target.index]
    mapData.stats = tmp.map.stats
    mapData.mode = tmp.map.gameMode.name
    mapData.map = tmp.map.name
    showLoading.value = false
    curLoading.value = false
  })
}
function changeSoloTeamSelect() {
  curOp.value === '单人'? mapData.stats = tmp.map.stats: mapData.stats = tmp.map.teamStats
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
.curLoading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
