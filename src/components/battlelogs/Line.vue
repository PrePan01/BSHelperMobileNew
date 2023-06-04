<template>
  <div style="position: relative;" class="line-warp">
    <div ref="lineWarp" style="width: 100%;height: 200px"></div>
    <n-button-group class="changeIconBtn">
      <n-button size="tiny" ghost text-color="white" @click="changeLineSymbol(1)">
        模式
      </n-button>
      <n-button size="tiny" ghost text-color="white" @click="changeLineSymbol(2)">
        英雄
      </n-button>
    </n-button-group>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import {onMounted, reactive, ref, getCurrentInstance} from "vue";
import {NButtonGroup, NButton} from 'naive-ui'
import {useStore} from "@/store";
const store = useStore()
let lineWarp = ref(null)
let modes = getCurrentInstance()?.appContext.config.globalProperties.$modes

let data = reactive({
  trophyChange: [],
  num: [],
  symbol: []
})

function drawModesSymbol() {
  data.symbol = []
  let tmp = [0]
  let cur = 0, num = 0
  let pbs = store.battlelogs
  for(let i = pbs.length - 1;i >= 0;i--) {
    if(pbs[i].battle.trophyChange === undefined) {
      if('players' in pbs[i].battle && pbs[i].battle.players[0].brawlers[0].trophyChange !== undefined) {
        let myIndex
        pbs[i].battle.players[0].tag === store.profile.tag? myIndex = 0: myIndex = 1
        pbs[i].battle.players[myIndex].brawlers.forEach(bitem => {
          cur = cur + bitem.trophyChange
        })
        tmp.push(cur)
      } else {
        tmp.push(cur)
      }
    } else {
      cur = cur + pbs[i].battle.trophyChange
      tmp.push(cur)
    }
    data.num.push(++num)
    data.symbol.push(`image://https://prepan.top/bsAssets/modes/${modes.indexOf(pbs[i].battle.mode)}.png`)
  }
  data.trophyChange = tmp
}


function drawBrawlersSymbol() {
  data.symbol = []
  let tmp = [0]
  let cur = 0, num = 0
  let pbs = store.battlelogs
  for(let i = pbs.length - 1;i >= 0;i--) {
    if(pbs[i].battle.trophyChange === undefined) {
      tmp.push(cur)
    } else {
      cur = cur + pbs[i].battle.trophyChange
      tmp.push(cur)
    }
    data.num.push(++num)
    if(pbs[i].battle.teams) {
      pbs[i].battle.teams.flat().forEach(item => {
        if(item.tag === store.profile.tag) {
          if(pbs[i].battle.result === 'defeat' || pbs[i].battle.rank > 4) {
            data.symbol.push(`image://https://prepan.top/bsAssets/brawlerPins/sad/${item.brawler.id}.png`)
          } else {
            data.symbol.push(`image://https://prepan.top/bsAssets/brawlerPins/happy/${item.brawler.id}.png`)
          }
        }
      })
    }
    else if(pbs[i].battle.players) {
      pbs[i].battle.players.flat().forEach(item => {
        if(item.tag === store.profile.tag) {
          if(pbs[i].battle.result === 'defeat' || pbs[i].battle.rank > 4) {
            data.symbol.push(`image://https://prepan.top/bsAssets/brawlerPins/sad/${item.brawler.id}.png`)
          } else {
            data.symbol.push(`image://https://prepan.top/bsAssets/brawlerPins/happy/${item.brawler.id}.png`)
          }
        }
      })
    }
  }
  data.trophyChange = tmp
}

onMounted(() => {
  drawModesSymbol()
  let myChart = echarts.init(lineWarp.value);
  myChart.setOption({
    title: {
      text: '对战杯数',
      textStyle: {
        fontSize: 14,
        color: 'rgb(239,239,239)'
      },
    },
    xAxis: {
      type: 'category',
      data: data.num,
      axisLine: {
        lineStyle: {
          color: 'white'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: 'white'
        }
      },
      splitLine: {
        lineStyle: {
          opacity: 0.4
        }
      }
    },
    lineStyle: {
      color: 'rgb(239,182,43)'
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      top: '20%',
      left: '7%',
      width: '89%',
      bottom: '25%'
    },
    dataZoom: {
      type: 'slider',
      top: '85%',
      height: '20',
      borderColor: 'rgb(255,255,255,.3)',
      moveHandleStyle: {
        color: 'rgb(255,255,255,.1)'
      },
      handleStyle: {
        color: 'rgb(64,106,223,.8)'
      }
    },
    series: [
      {
        data: data.trophyChange,
        type: 'line',
        smooth: true,
        itemStyle: {
          color: 'rgb(239,182,43)'
        },
        emphasis: {
          disabled: false
        },
        symbol: (value, params) => {
          params.symbol = data.symbol[params.dataIndex]
          return params.symbol
        },
        showAllSymbol: true,
        symbolSize: 20
      }
    ]
  });
})

function changeLineSymbol(type) {
  let myChart = echarts.init(lineWarp.value);
  if(type === 1) {
    drawModesSymbol()
  } else {
    drawBrawlersSymbol()
  }
  myChart.setOption({
    series: [
      {
        symbol: (value, params) => {
          params.symbol = data.symbol[params.dataIndex]
          return params.symbol
        }
      }
    ]
  })
}

</script>

<style scoped>
.line-warp {
  margin-left: 10px;
  margin-bottom: 15px;
}
.changeIconBtn {
  position: absolute;
  right: 10px;
  top: 0;
}
</style>
