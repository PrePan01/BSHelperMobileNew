<template>
  <div ref="pieWarp" style="width: 95%;height: 200px;padding-left: 10px"></div>
</template>

<script setup>
import bTrans from '../../utils/BrawlerTranslate'
import * as echarts from 'echarts'
import {onMounted, ref} from "vue";
let pieWarp = ref(null)
let props = defineProps(['brawlersData', 'title'])
let brawler = []
let handlerIcon = []
let handlerIconTmp = Object.keys(props.brawlersData).sort((a, b) => {
  return props.brawlersData[b] - props.brawlersData[a]
})
for(let item in props.brawlersData) {
  brawler.push({value: props.brawlersData[item], name: bTrans(item)})
}
brawler.sort((a, b) => b.value - a.value)
handlerIconTmp.forEach(item => {
  handlerIcon.push(
      {
        name: bTrans(item),
        icon: 'image://https://prepan.top/bsAssets/brawlers/' + item + '.png'
      }
  )
})

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
    series: [
      {
        name: 'Access From',
        type: 'pie',
        right: '4%',
        radius: ['30%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          color: 'white',
          lineHeight: 18,
          formatter: (params => {
            return `${params.name}`
          })
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        labelLine: {
          show: true,
          length2: '2'
        },
        labelLayout: {
          hideOverlap: true
        },
        data: brawler,
        tooltip: {
          trigger: 'item',
          formatter: ((params) => {
            return `${params.name}：${params.value}次`
          })
        }
      }
    ]
  };
  myChart.setOption(option)
})
</script>

<style scoped>

</style>
