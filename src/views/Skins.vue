<template>
    <div class="skin-warp">
      <div class="brawlerChoice">
        <img
            class="brawlerIcon"
            v-for="(item, index) in brawlersList"
            :key="item"
            :src="('https://prepan.top/bsAssets/brawlers/'+ item +'.png')"
            alt=""
            @click="choose(item, index)"
        >
      </div>
      <div class="skinShowWarp">
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
              style="width: 70%"
          >
            <template v-slot:loading>
              <n-spin size="medium" />
            </template>
          </VanImage>

          <div>
            <p class="price">
              <span>价格：</span>
              <img v-if="item[2] !== 'free' && item[2] !== 'rmb'" :src="require('../assets/' + item[2] + '.png')" alt="" class="priceIcon">
              <span>{{item[3]===''?'免费':item[3]}}</span>
            </p>
            <p class="price" v-if="item[2] !== 'free' && item[2] !== 'coin' && item[2] !== 'ticket'">
              <span>史低：</span>
              <img v-if="item[2] !== 'rmb'" :src="require('../assets/' + item[2] + '.png')" alt="" class="priceIcon">
              <span>{{item[4]===''?'暂无数据':item[4]}}</span>
            </p>
          </div>
        </div>
      </div>
      <n-button-group vertical class="feedback">
        <n-button ghost style="color: white" @click="showPop = true">
          数据有误
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
        <h2 style="color: black">数据更新时间： {{updateTime}}</h2>
        <h2 style="color: black">皮肤数据贡献名单</h2>
        <span v-for="(item, index) in contributor" :key="index" class="contributor">{{ item }}</span>
        <h4 style="color: black">感谢每一位提交更新数据的小伙伴！</h4>
      </Popup>
</div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import { Tag, Image as VanImage, Popup  } from 'vant';
import { NSpin, NButton, NButtonGroup } from 'naive-ui'
import BrawlerTranslate from "@/utils/BrawlerTranslate";
import axios from "axios";

let curBrawler = ref(16000000)
let curBrawlerIndex = ref(0)

function choose(item, index){
  curBrawler.value = item
  curBrawlerIndex.value = index
}

let brawlersList = []
function createBrawlersList(){
  let num = 0
  for(let i = 0; i <= 60; i++,num++){
    if(num===33 || num===55) num++
    brawlersList[i] = 16000000 + num
  }
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

onMounted(() => {
  createBrawlersList()
  // 获取皮肤数据
  axios({
    methods:'GET',
    url: '/demo/skinData.json'
  }).then( res => {
    updateTime.value = res.data[0][0]
    contributor.value = res.data[0][1]
    skinsData.value = res.data[1]
  })
})
</script>

<style scoped>
.skin-warp {
  display: flex;
  flex-direction: row;
}
.brawlerChoice {
  height: 100vh;
  overflow: scroll;
  width: 20vw;
  display: flex;
  flex-direction: column;
}
.brawlerIcon {
  width: 20vw;
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
  font-size: 22px;
  width: 60%;

}
.name {
  padding: 20px 0 6px 0;
  text-align: center;
  font-size: 32px;
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
}
.priceIcon {
  width: 20px;
  margin: 0 4px;
}
.feedback {
  position: fixed;
  right: 5vw;
  bottom: 5vw;
}
.contributor {
  color: black;
  margin-right: 10px;
}
</style>
