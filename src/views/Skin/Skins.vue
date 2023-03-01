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

  <div class="skin-warp">
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
      <div class="skinShowWarp" ref="skinShowWarp">
        <n-back-top :right="20" :visibility-height="500" :bottom="100"/>
        <h2 class="name">
          {{BrawlerTranslate(curBrawler)}}
        </h2>
        <p class="skinNum">共 {{skinsData[curBrawlerIndex]?.length}} 皮肤</p>
        <div class="skinShow" v-for="(item, index) in skinsData[curBrawlerIndex]" :key="index">
          <p class="title">
            <img src="@/assets/button_info.png" alt="" class="infoBtn" @click="showMsg(item[5])">
            <span class="skinName">{{item[1]}}</span>
            <Tag :type="item[6]?'warning':'success'" size="large" class="tag">{{item[6]?'已绝版':'未绝版'}}</Tag>
          </p>
          <VanImage
              slot="cover"
              :src="'https://prepan.top/bs_m/img/skins/' + curBrawlerIndex + '/' + item[0] + '.png'"
              style="width: 60%"
          >
            <template v-slot:loading>
              <n-spin size="medium" />
            </template>
          </VanImage>

          <div>
            <p class="price">
              <span>价格：</span>
              <span v-for="(price, index) in (Array.isArray(item[2])? item[2]: [item[2]])" :key="index" class="price curPrice">
                <img v-if="price !== 'free' && price !== 'rmb'" :src="require('../../assets/' + price + '.png')" alt="" class="priceIcon">
                <span>{{(price=== 'ticket'||item[3]==='')?'免费':item[3]}}</span>
              </span>
            </p>
            <p class="price" v-if="item[4] !== ''">
              <span>史低：</span>
              <img v-if="item[2] !== 'rmb'" :src="require('../../assets/' + item[2] + '.png')" alt="" class="priceIcon">
              <span>{{item[4]}}</span>
            </p>
            <p class="price" v-if=" item[4] === '' && item[2] === 'gems'">
              <span>史低：暂无数据</span>
            </p>
          </div>
        </div>
      </div>

      <n-button-group vertical class="feedback">
        <n-button ghost style="color: white" @click="showPop = true">
          数据有误/更新
        </n-button>
        <n-button ghost style="color: white" @click="openContribute = true">
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
import { Tag, Image as VanImage, Popup  } from 'vant';
import { NSpin, NButton, NButtonGroup,NBackTop,NSelect } from 'naive-ui'
import BrawlerTranslate from "@/utils/BrawlerTranslate";
import axios from "axios";
import TopNav from '@/components/TopNav'
import brawlerOptions from '@/utils/brawlerOptions'

let curBrawler = ref(16000000)
let curBrawlerIndex = ref(0)
let skinShowWarp = ref(null)

function choose(item, index){
  isSearch.value = false
  curBrawler.value = item
  curBrawlerIndex.value = index
  skinShowWarp.value.scrollTo({top: 0})
}

function showMsg(data) {
  window.$message.info(data)
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
    top: 80*brawlerOptions.indexOf(item) - 2,
    behavior: 'smooth'
  })
  skinShowWarp.value.scrollTo({top: 0})
}

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
  height: 100vh;
  overflow: scroll;
  width: 82px;
  display: flex;
  flex-direction: column;
}
.brawlerIcon {
  width: 80px;
}
.skinShowWarp {
  width: 70vw;
  height: 100vh;
  overflow: scroll;
  padding: 0 5vw;
}
.skinShow {
  position: relative;
  margin: 25px 0 60px 0;
}
.title {
  display: flex;
  align-items: center;
}
.infoBtn {
  width: 26px;
  margin-right: 10px;
}
.skinName {
  font-size: 26px;
  width: 60%;
  font-weight: bold;
  text-shadow: 1px 1px 1px black;
}
.name {
  padding: 20px 0 6px 0;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  text-shadow: 2px 2px 1px black;
}
.skinNum {
  font-size: 16px;
  text-align: center;
  padding-bottom: 10px;
}
.tag {
  margin-left: auto;
}
.skinPic {
  width: 50vw;
}
.price {
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-size: 22px;
  font-family: 'lato', serif;
  font-weight: bold;
  text-shadow: 1px 1px black;
}
.priceIcon {
  width: 20px;
  margin: 0 4px;
}

.curPrice {
  margin-right: 10px;
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
