<template>
  <div ref="pieWarp" style="width: 95%;height: 200px;padding-left: 10px"></div>
</template>

<script setup>
import bTrans from '../../utils/BrawlerTranslate'
import * as echarts from 'echarts'
import {onMounted, ref} from "vue";
import pieSerise from '@/utils/pieSerise'
let pieWarp = ref(null)
let props = defineProps(['brawlersData', 'title', 'battleResult'])
let brawler = []
let handlerIcon = []
let handlerIconTmp = Object.keys(props.brawlersData).sort((a, b) => {
  return props.brawlersData[b] - props.brawlersData[a]
})
for(let item in props.brawlersData) {
  brawler.push({value: props.brawlersData[item], name: bTrans(item)})
}
brawler.sort((a, b) => b.value - a.value)
function sortBattleResult() {
  let t = []
  let _bResult = props.battleResult
  brawler.forEach(i => {
    if(!t.includes(i.name)) {
      t.push(i.name)
    }
  })
  _bResult.sort((a, b) =>
    t.indexOf(a.name) - t.indexOf(b.name)
  )

  return _bResult
}

handlerIconTmp.forEach(item => {
  handlerIcon.push(
      {
        name: bTrans(item),
        icon: 'image://https://prepan.top/bsAssets/brawlers/' + item + '.png'
      }
  )
})


function getSerise() {
  if(props.title === '我的成分') {
    return pieSerise(brawler, sortBattleResult())
  } else {
    return [pieSerise(brawler)[0]]
  }
}

onMounted(() => {
  let myChart = echarts.init(pieWarp.value);
  let option = {
    tooltip: {
      trigger: 'item'
    },
    title: {
      text: props.title,
      textStyle: {
        color: 'rgb(239,239,239)',
        fontSize: 14
      },
    },
    legend: {
      show: true,
      type: 'scroll',
      height: '190px',
      pageIconColor: 'rgba(255,255,255,0.5)',
      pageIconInactiveColor: 'rgba(255,255,255,0.2)',
      pageTextStyle: {
        color: 'white'
      },
      orient: 'vertical',
      right: '0',
      top: '0',
      itemWidth: 20,
      itemHeight: 20,
      pageButtonGap: 5,
      pageIconSize: 10,
      textStyle: {
        color: 'rgb(239,239,239)',
      },
      data: handlerIcon,
      formatter: function (params) {
        for(let i of brawler) {
          if(i.name === params){
            return `${i.value}次`
          }
        }
      }
    },
    series: getSerise()
  };
  myChart.setOption(option)
})
</script>

<style scoped>

</style>
