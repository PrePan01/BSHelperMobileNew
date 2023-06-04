<template>
  <div class="topnav">
    <TopNav :to="'/more'" :title="'皮肤图鉴 - 全部'"/>
    <!--英雄搜索-->
    <div class="search-warp" :style="{'right': searchActive?'2vw':'-31vw'}">
      <img
          :src="require(`../../assets/${searchActive?'toright':'search'}.png`)"
          alt=""
          class="search-icon"
          @click="searchActive = !searchActive"
      >
      <n-select
          v-model:value="brawlerSelected"
          filterable
          placeholder="搜索"
          :options="brawlerOptions"
          class="brawlerSelect"
          size="small"
          @update:value="searchBrawler"
      />
    </div>

  </div>
    <div class="brawlerChoice" ref="brawlerChoice">
    <img
        class="brawlerIcon"
        v-for="(item, index) in brawlersList"
        :key="item"
        :src="('https://prepan.top/bsAssets/brawlers/'+ item +'.png')"
        alt=""
        @click="choose(item, index)"
        :class="{
          'curSelect': index === curBrawlerIndex,
          'shine': index === curBrawlerIndex && isSearch
        }"
    >
  </div>

  <div class="skin-warp">
    <!--皮肤列表-->
    <div class="skinShowWarp" ref="skinShowWarp">
      <h2 class="name">
        <span>{{BrawlerTranslate(curBrawler)}}</span>
        <span class="skinNum">共 {{skinsData[curBrawlerIndex]?.length}} 皮肤</span>
      </h2>

      <!--筛选-->
      <div class="skin-filter">
        <div @click="filterSelected = '全部'" class="skin-filter-option" :class="{'skin-filter-option__selected': filterSelected === '全部'}">全部</div>
        <div @click="filterSelected = '未绝版'" class="skin-filter-option" :class="{'skin-filter-option__selected': filterSelected === '未绝版'}">未绝版</div>
        <div @click="filterSelected = '绝版'" class="skin-filter-option" :class="{'skin-filter-option__selected': filterSelected === '绝版'}">绝版</div>
      </div>
      <div class="skinShow" v-for="(item, index) in skinsData[curBrawlerIndex]" :key="index">
        <div v-show="filterSelected === '全部' || (filterSelected === '未绝版' && !item[6]) || (filterSelected === '绝版' && item[6])">
          <SkinItem :skinitem="item" :curBrawlerIndex="curBrawlerIndex"/>
        </div>
      </div>
    </div>

    <n-button-group vertical class="feedback">
      <n-button ghost size="small" style="color: white" @click="showPop = true">
        数据有误/更新
      </n-button>
      <n-button ghost size="small" style="color: white" @click="openContribute = true">
        贡献名单
      </n-button>
    </n-button-group>

    <Popup v-model:show="showPop" position="bottom" :style="{ height: '60%' }" close-icon-position="top-right" @close="closePop">
      <iframe
          ref="ifr"
          height = 100%
          width = 100%
          src="https://wj.qq.com/s2/10412556/bf33/"
          frameborder="0"
          allowfullscreen
          sandbox="allow-same-origin allow-scripts allow-modals allow-downloads allow-forms allow-popups">
      </iframe>
    </Popup>

    <Popup v-model:show="openContribute" position="top" :style="{ height: '30%' }" style="padding: 15px">
      <h2 class="updateTime">数据更新时间： {{updateTime}}</h2>
      <h2 style="color: black">皮肤数据贡献名单</h2>
      <span v-for="(item, index) in contributor" :key="index" class="contributor">{{ item }}</span>
      <h4 class="thx">感谢每一位提交更新数据的小伙伴！</h4>
    </Popup>
</div>
</template>

<script setup>
import {getCurrentInstance, onMounted, ref} from "vue";
import { Popup } from 'vant';
import { NButton, NButtonGroup,NSelect } from 'naive-ui'
import BrawlerTranslate from "@/utils/BrawlerTranslate";
import axios from "axios";
import TopNav from '@/components/TopNav'
import brawlerOptions from '@/utils/brawlerOptions'
import SkinItem from '@/components/skin/SkinItem'

let curBrawler = ref(16000000)
let curBrawlerIndex = ref(0)
let skinShowWarp = ref(null)

function choose(item, index){
  isSearch.value = false
  curBrawler.value = item
  curBrawlerIndex.value = index
  skinShowWarp.value.scrollTo({left: 0})
}

let updateTime = ref()
let contributor = ref([])
let skinsData = ref([])

function closePop() {
  showPop.value = false
}
let showPop = ref(false)
let openContribute = ref(false)

let brawlersList = getCurrentInstance()?.appContext.config.globalProperties.$brawlers

let brawlerSelected = ref(null)
let searchActive = ref(false)
let brawlerChoice = ref()
let isSearch = ref(false)
function searchBrawler(data,item){
  curBrawler.value = data
  isSearch.value = true
  curBrawlerIndex.value = brawlerOptions.indexOf(item)
  brawlerChoice.value.scrollTo({
    left: 60*brawlerOptions.indexOf(item) - 2,
    behavior: 'smooth'
  })
  skinShowWarp.value.scrollTo({top: 0})
}

let filterSelected = ref('全部')

onMounted(() => {
  // 获取皮肤数据
  axios({
    methods:'GET',
    url: 'https://prepan.top/bs_m/skinData.json'
    // url: '/demo/skinData.json'
  }).then( res => {
    updateTime.value = res.data[0][0]
    contributor.value = res.data[0][1]
    skinsData.value = res.data[1]
  })
})
</script>

<style scoped>
.topnav {
  position: relative;
  overflow: hidden;
  width: 100vw;
}
.search-warp {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  transition: .5s;
}
.search-icon {
  width: 30px;
  margin-right: 4px;
}
.brawlerSelect {
  width: 30vw;
}
.skin-warp {
  display: flex;
  flex-direction: row;
}
.brawlerChoice {
  width: 100vw;
  overflow: scroll;
  height: 60px;
  display: flex;
  flex-direction: row;
}
.brawlerIcon {
  width: 80px;
}
.skinShowWarp {
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  padding: 0 5vw;
}

.skin-filter {
  display: flex;
  justify-content: space-evenly;
  margin: 10px 0 25px 0;
}
.skin-filter-option {
  border: 2px solid black;
  padding: 6px 15px;
  font-size: 18px;
  transform: skew(-3deg);
  text-shadow: 1px 1px 2px rgba(0,0,0,.75);
  font-weight: bold;
  transition: .3s;
}
.skin-filter-option__selected {
  /*background-color: rgb(255,215,0);*/
  background: linear-gradient(135deg, rgb(255,215,0), rgb(212,182,108));
  box-shadow: 1px 1px 2px rgba(0,0,0,1);
  transition: .3s;
}

.skinShow {
  position: relative;
  margin: 0 0 30px 0;
}
.name {
  position: relative;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  text-shadow: 2px 2px 1px black;
  margin: 14px 0;
}
.skinNum {
  font-size: 16px;
  text-align: center;
  position: absolute;
  right: 1%;
  top: 50%;
  transform: translateY(-50%);
}
.feedback {
  position: fixed;
  right: 5vw;
  bottom: 5vw;
}
.contributor {
  display: inline-block;
  margin: 4px 10px 4px 0;
  border-radius: 6px;
  padding: 0 4px;
  background-color: rgb(247,196,52);
  font-weight: bold;
  color: white;
  font-size: 16px;
}
.updateTime {
  color: black;
  margin-bottom: 10px;
}
.thx {
  margin-top: 10px;
  color: black;
}
.curSelect {
  border: 2px solid gold;
  box-sizing: border-box;
}
.shine {
  animation: shineSelect 3 .5s alternate;
  border: 2px solid gold;
  box-sizing: border-box;
}
@keyframes shineSelect {
  0% {
    border-color: gold;
  }
  50% {
    border-color: transparent;
  }
  100% {
    border-color: gold;
  }
}
</style>
