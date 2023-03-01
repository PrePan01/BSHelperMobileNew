<template>
  <div ref="scatterWarp" style="width: 100%;height: 60vh"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import {onMounted, ref} from "vue";
let scatterWarp = ref(null)
let props = defineProps(['data'])

onMounted(() => {
  let myChart = echarts.init(scatterWarp.value);
  let option = {
    xAxis: {
      name: "胜率",
      nameLocation: "end",
      nameTextStyle:{
        padding: [0,0,0,-10]
      },
      axisLine: {
        lineStyle: {
          color: 'white'
        }
      },
      min: function (value) {
        return value.min - 5;
      }
    },
    yAxis: {
      name: "使用率",
      nameLocation: "end",
      axisLine: {
        lineStyle: {
          color: 'white'
        }
      },
      max: function (value) {
        return value.max + 2;
      }
    },
    dataZoom: [
      {
        id: 'dataZoomX',
        type: 'slider',
        xAxisIndex: [0],
        filterMode: 'filter',
        start: '70',
        end: '100',
        height: '20',
        handleSize: '150%',
        moveHandleSize: 10,
        moveHandleStyle: {
          color: 'rgb(255,255,255,.1)'
        },
        handleStyle: {
          color: 'rgb(64,106,223,.8)'
        }
      },
      {
        id: 'dataZoomY',
        type: 'slider',
        yAxisIndex: [0],
        filterMode: 'empty',
        start: '0',
        end: '40',
        moveHandleSize: 10,
        bottom: '21%',
        height: '63%',
        width: '20',
        right: '10',
        handleSize: '150%',
        moveHandleStyle: {
          color: 'rgb(255,255,255,.1)'
        },
        handleStyle: {
          color: 'rgb(64,106,223,.8)'
        }
      }
    ],
    series: [
      {
        symbolSize: 34,
        data: props.data,
        type: 'scatter',
        itemStyle: {
          color: 'gold'
        }
      }
    ]
  }
  myChart.setOption(option)
})
</script>

<style scoped>

</style>
