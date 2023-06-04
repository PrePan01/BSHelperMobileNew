<template>
  <div>
    <n-back-top :right="20" :visibility-height="500" :bottom="70"/>

    <AssortSkins
        :title="assort_title[skin_index][0]"
        :color="assort_title[skin_index][1]"
        :cover="assort_title[skin_index][2]"
        :key="assort_title[skin_index][2]"
    />
    <div class="skinWarp">
      <div v-for="(item, index) in skinsdata" :key="item[0]" class="skin-item">
        <div class="info" v-if="assort_data[skin_index][index][2]">
          {{assort_data[skin_index][index][2]}}
        </div>
        <h2 class="name">
          {{item[1]}}
          <span class="jb" v-if="item[6]">绝版</span>
        </h2>
        <div class="picwarp">
          <VanImage
              slot="cover"
              :src="'https://prepan.top/bs_m/img/skins/' + assort_data[skin_index][index][0] + '/' + item[0] + '.png'"
              style="width: 90%"
          >
            <template v-slot:loading>
              <n-spin size="medium" />
            </template>
          </VanImage>
        </div>
        <div>
          <div class="price">
            <span>价格：</span>
            <div>
              <div v-for="(price, index) in (Array.isArray(item[2])? item[2]: [item[2]])" :key="index" class="curPrice">
                <img v-if="price !== 'free' && price !== 'rmb'" :src="require('../../assets/' + price + '.png')" alt="" class="priceIcon">
                <span>{{(price=== 'ticket'||item[3]==='')?'免费':item[3]}}</span>

                <div class="curPrice" v-if="price === 'gems' && item[3] !== '49' && item[3] !== '299' && item[3] !== '199' && item[7] !== 'nobling'">
                  <img src="../../assets/bling.png" alt="" class="priceIcon">
                  <span>{{item[3] === '149'? 5000:item[3] === '79'?2750:1000}}</span>
                </div>

              </div>
            </div>
          </div>
          <p class="price" v-if="item[2] === 'gems'">
            <span>史低：</span>
            <img v-if="item[2] !== 'rmb'" :src="require('../../assets/' + item[2] + '.png')" alt="" class="priceIcon">
            <span>{{item[4]===''?'暂无数据':item[4]}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Image as VanImage } from 'vant';
import { NSpin, NBackTop } from 'naive-ui'
import router from "@/router";
import {onMounted, ref} from "vue";
import assort_data from '@/assets/skins/assortData.js'
import assort_title from '@/assets/skins/assortTitle.json'
import AssortSkins from '@/components/skin/AssortTitle'

import axios from "axios";

const type = ['starpoint', 'powerleague', 'clubcoin', 'brawlpass']

let skin_index = ref(router.currentRoute.value.query.i)
const title = ['星光皮肤','星光联赛皮肤','战队商店皮肤','通行证皮肤']

let skinsdata = ref([])
onMounted(() => {
  // 获取皮肤数据
  let skindata_tmp
  axios({
    methods:'GET',
    url: 'https://prepan.top/bs_m/skinData.json'
    // url: '/demo/skinData.json'
  }).then( res => {
    skindata_tmp = res.data[1]
    assort_data[skin_index.value].forEach(item => {
      skinsdata.value.push(skindata_tmp[item[0]][item[1] - 1])
    })
  })

})
</script>

<style scoped>
.info {
  border-top: 2px solid rgb(107,96,131);
  box-shadow: 2px 2px rgba(107,95,135, 0.2);
  transform: skew(-3deg);
  padding: 2px 0 2px 6px;
  font-weight: bold;
  font-size: 13px;
  background-color: rgba(51,59,78,0.8);
  margin-bottom: 6px;
  width: 80%;
}
.title {
  text-align: center;
  font-size: 10vw;
  transform: skew(-3deg);
  text-shadow: 2px 2px black;
  letter-spacing: 5px;
  width: 80vw;
  margin: 20px auto 0 auto;
  vertical-align: middle;
}
.icon {
  width: 10vw;
  vertical-align: middle;
}
.skinWarp {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: space-between;
}
.skin-item {
  width: 45%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.picwarp {
  height: 250px;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.name {
  position: relative;
  text-shadow: 2px 2px black;
  font-size: 6vw;
}
.jb {
  position: absolute;
  color: red;
  left: 20%;
  top: 0;
  transform: rotate(-45deg);
}
.price {
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
  font-family: 'lato', serif;
}
.priceIcon {
  width: 20px;
  margin: 0 4px;
}
.curPrice img,span {
  vertical-align: middle;
}
</style>
