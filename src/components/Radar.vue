<template>
  <div ref="radarWarp" style="width: 100%;height: 300px"></div>
</template>

<script setup>
import TrophyRadarData from '@/utils/TrophyRadarData'
import * as echarts from 'echarts'
let radarWarp = ref(null)


let props = defineProps(['brawlers'])

let data = TrophyRadarData(props.brawlers)

watch(() => props.brawlers, (newVal) => {
  data = TrophyRadarData(newVal)
  option = {
    title: {
      // text: 'Basic Radar Chart'
    },
    radar: {
      // shape: 'circle',
      indicator: type.map(i => {
        return { name: i, max: 1250 }
      }),
      splitLine: {
        show: false
      },
      splitArea: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255,255,255,0.2)'
        }
      },
      axisName: {
        color: '#fff'
      }
    },
    series: [
      {
        name: 'Avarage',
        type: 'radar',
        data: [
          {
            value: data[0],
            name: 'Avarage',
            areaStyle: {
              color: 'rgba(255,190,32, 0.5)'
            },
            symbolSize: 0,
            lineStyle: {
              color: 'rgba(255,190,32,1)'
            },
            label: {
              show: true,
              color: 'rgba(255,203,75,1)',
              fontSize: 14,
              formatter: function (params) {
                return params.value;
              }
            }
          }
        ],
        labelLayout(params) {
//定义要返回的最值x，y
          let xpx,ypx;
//获取图片中心点
          let elem = radarWarp.value;
          let dot =[elem.offsetWidth/2,elem.offsetHeight/2];
//获取实际的长和宽
          let xlength = dot[0]-params.rect.x;
          let ylength = dot[1]-params.rect.y;
//根据勾股定理得到斜边长度
          let hypot = Math.sqrt(xlength*xlength+ylength*ylength);
//设置你要让label标签向内移动多少像素
          let leng = 20;
//得到倍数
          let mult = leng/hypot;
//判断标签与中心点位置关系（如果实际label的x轴的位置在中心右侧）
          if(params.rect.x>dot[0]){
//label的x轴位置左挪动（减的是 实际宽度*比例）
            xpx = params.rect.x + Math.abs(xlength)*mult;
//判断标签与中心点位置关系（如果实际label的x轴的位置在中心左侧）
          }else if(params.rect.x<dot[0]){
//label的x轴位置右挪动（加的是 实际宽度*比例）
            xpx = params.rect.x - Math.abs(xlength)*mult ;
//否则在和中心x轴相同，就不需要移动
          }else{
//label的x轴就在原来位置
            xpx = params.rect.x;
          }
//下面y轴同上
          if(params.rect.y>dot[1]){
            ypx = params.rect.y + Math.abs(ylength)*mult;
          }else if(params.rect.y<dot[1]){
            ypx = params.rect.y - Math.abs(ylength)*mult ;
          }else{
            ypx = params.rect.y;
          }
//返回坐标
          return {
            x: xpx,
            y: ypx,
            verticalAlign: 'middle',
            align: 'middle'
          }
        }
      },
      {
        name: 'Outline',
        type: 'radar',
        animation: false,
        data: [
          {
            value: new Array(type.length).fill(1250),
            name: 'OutLine',
            symbolSize: 0,

            lineStyle: {
              width: 1,
              color: 'rgba(255,255,255,0.8)'
            }
          }
        ]
      },
      {
        name: 'Max',
        type: 'radar',
        animation: false,
        data: [
          {
            value: data[1],
            name: 'Max',
            symbolSize: 0,
            lineStyle: {
              width: 1,
              color: 'rgba(70,230,126,1)'
            },
            label: {
              show: false,
              color: 'rgba(70,230,126,1)',
              fontSize: 14,
              formatter: function (params) {
                return params.value;
              }
            }
          }
        ],
        labelLayout(params) {
//定义要返回的最值x，y
          let xpx,ypx;
//获取图片中心点
          let elem = radarWarp.value;
          let dot =[elem.offsetWidth/2,elem.offsetHeight/2];
//获取实际的长和宽
          let xlength = dot[0]-params.rect.x;
          let ylength = dot[1]-params.rect.y;
//根据勾股定理得到斜边长度
          let hypot = Math.sqrt(xlength*xlength+ylength*ylength);
//设置你要让label标签向内移动多少像素
          let leng = 20;
//得到倍数
          let mult = leng/hypot;
//判断标签与中心点位置关系（如果实际label的x轴的位置在中心右侧）
          if(params.rect.x>dot[0]){
//label的x轴位置左挪动（减的是 实际宽度*比例）
            xpx = params.rect.x + Math.abs(xlength)*mult;
//判断标签与中心点位置关系（如果实际label的x轴的位置在中心左侧）
          }else if(params.rect.x<dot[0]){
//label的x轴位置右挪动（加的是 实际宽度*比例）
            xpx = params.rect.x - Math.abs(xlength)*mult ;
//否则在和中心x轴相同，就不需要移动
          }else{
//label的x轴就在原来位置
            xpx = params.rect.x;
          }
//下面y轴同上
          if(params.rect.y>dot[1]){
            ypx = params.rect.y + Math.abs(ylength)*mult;
          }else if(params.rect.y<dot[1]){
            ypx = params.rect.y - Math.abs(ylength)*mult ;
          }else{
            ypx = params.rect.y;
          }
//返回坐标
          return {
            x: xpx,
            y: ypx,
            verticalAlign: 'middle',
            align: 'middle'
          }
        }
      }
    ]
  }
  myChart.setOption(option)
})

import {watch, onMounted, ref} from "vue";
import {type} from "@/utils/BrawlerType";

let myChart,option
onMounted(() => {
  myChart = echarts.init(radarWarp.value);
  option = {
    title: {
      // text: 'Basic Radar Chart'
    },
    radar: {
      // shape: 'circle',
      indicator: type.map(i => {
        return { name: i, max: 1250 }
      }),
      splitLine: {
        show: false
      },
      splitArea: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255,255,255,0.2)'
        }
      },
      axisName: {
        color: '#fff'
      }
    },
    series: [
      {
        name: 'Avarage',
        type: 'radar',
        data: [
          {
            value: data[0],
            name: 'Avarage',
            areaStyle: {
              color: 'rgba(255,190,32, 0.5)'
            },
            symbolSize: 0,
            lineStyle: {
              color: 'rgba(255,190,32,1)'
            },
            label: {
              show: true,
              color: 'rgba(255,203,75,1)',
              fontSize: 14,
              formatter: function (params) {
                return params.value;
              }
            }
          }
        ],
        labelLayout(params) {
//定义要返回的最值x，y
          let xpx,ypx;
//获取图片中心点
          let elem = radarWarp.value;
          let dot =[elem.offsetWidth/2,elem.offsetHeight/2];
//获取实际的长和宽
          let xlength = dot[0]-params.rect.x;
          let ylength = dot[1]-params.rect.y;
//根据勾股定理得到斜边长度
          let hypot = Math.sqrt(xlength*xlength+ylength*ylength);
//设置你要让label标签向内移动多少像素
          let leng = 20;
//得到倍数
          let mult = leng/hypot;
//判断标签与中心点位置关系（如果实际label的x轴的位置在中心右侧）
          if(params.rect.x>dot[0]){
//label的x轴位置左挪动（减的是 实际宽度*比例）
            xpx = params.rect.x + Math.abs(xlength)*mult;
//判断标签与中心点位置关系（如果实际label的x轴的位置在中心左侧）
          }else if(params.rect.x<dot[0]){
//label的x轴位置右挪动（加的是 实际宽度*比例）
            xpx = params.rect.x - Math.abs(xlength)*mult ;
//否则在和中心x轴相同，就不需要移动
          }else{
//label的x轴就在原来位置
            xpx = params.rect.x;
          }
//下面y轴同上
          if(params.rect.y>dot[1]){
            ypx = params.rect.y + Math.abs(ylength)*mult;
          }else if(params.rect.y<dot[1]){
            ypx = params.rect.y - Math.abs(ylength)*mult ;
          }else{
            ypx = params.rect.y;
          }
//返回坐标
          return {
            x: xpx,
            y: ypx,
            verticalAlign: 'middle',
            align: 'middle'
          }
        }
      },
      {
        name: 'Outline',
        type: 'radar',
        animation: false,
        data: [
          {
            value: new Array(type.length).fill(1250),
            name: 'OutLine',
            symbolSize: 0,

            lineStyle: {
              width: 1,
              color: 'rgba(255,255,255,0.8)'
            }
          }
        ]
      },
      {
        name: 'Max',
        type: 'radar',
        animation: false,
        data: [
          {
            value: data[1],
            name: 'Max',
            symbolSize: 0,
            lineStyle: {
              width: 1,
              color: 'rgba(70,230,126,1)'
            },
            label: {
              show: false,
              color: 'rgba(70,230,126,1)',
              fontSize: 14,
              formatter: function (params) {
                return params.value;
              }
            }
          }
        ],
        labelLayout(params) {
//定义要返回的最值x，y
          let xpx,ypx;
//获取图片中心点
          let elem = radarWarp.value;
          let dot =[elem.offsetWidth/2,elem.offsetHeight/2];
//获取实际的长和宽
          let xlength = dot[0]-params.rect.x;
          let ylength = dot[1]-params.rect.y;
//根据勾股定理得到斜边长度
          let hypot = Math.sqrt(xlength*xlength+ylength*ylength);
//设置你要让label标签向内移动多少像素
          let leng = 20;
//得到倍数
          let mult = leng/hypot;
//判断标签与中心点位置关系（如果实际label的x轴的位置在中心右侧）
          if(params.rect.x>dot[0]){
//label的x轴位置左挪动（减的是 实际宽度*比例）
            xpx = params.rect.x + Math.abs(xlength)*mult;
//判断标签与中心点位置关系（如果实际label的x轴的位置在中心左侧）
          }else if(params.rect.x<dot[0]){
//label的x轴位置右挪动（加的是 实际宽度*比例）
            xpx = params.rect.x - Math.abs(xlength)*mult ;
//否则在和中心x轴相同，就不需要移动
          }else{
//label的x轴就在原来位置
            xpx = params.rect.x;
          }
//下面y轴同上
          if(params.rect.y>dot[1]){
            ypx = params.rect.y + Math.abs(ylength)*mult;
          }else if(params.rect.y<dot[1]){
            ypx = params.rect.y - Math.abs(ylength)*mult ;
          }else{
            ypx = params.rect.y;
          }
//返回坐标
          return {
            x: xpx,
            y: ypx,
            verticalAlign: 'middle',
            align: 'middle'
          }
        }
      }
    ]
  };
  myChart.setOption(option)
})

</script>

<style scoped>

</style>
