<template>
  <div class="container">
    <div class="pinfo">
      <img :src="'https://prepan.top/bsAssets/avatar/' + icon.id + '.png'" alt="暂无头像" class="avatar">
      <div>
        <p class="name">{{name}}</p>
        <p class="tag">
          {{showTag?tag:'********'}}
          <n-button quaternary circle color="#ffffff" @click="showTag = !showTag">
            <template #icon>
              <n-icon><EyeOutline v-if="showTag"/> <EyeOffOutline v-else/> </n-icon>
            </template>
          </n-button>
        </p>
      </div>
    </div>
    <!--当前杯数-->
    <div class="trophy">
      <div class="trophy-l">
        <img src="../../assets/trophy_cur.png" alt="" class="trophy-l--icon">
        <span class="trophy-l--title">当前杯数</span>
        <span class="trophies" :style='{"--number": `"${dataChange[0] && dataChange[0] != 0? dataChange[0]: ""}"`}'>{{trophies}}</span>
      </div>
      <div class="trophy-r">
        <div>
          <img src="../../assets/trophy_cur.png" alt="" class="trophy-r--icon">
          <span class="trophy-r--title">最高奖杯</span>
          <h4 class="highest">{{highestTrophies}}</h4>
        </div>
        <div class="difTro">
           [ {{highestTrophies - trophies === 0?'': '- '}}{{highestTrophies - trophies}} ]
        </div>
      </div>
    </div>
    <!--胜场-->
    <div class="win-number">
      <div class="win-number__item">
        <img src="../../assets/3vs3.png" alt="">
        <span>3V3胜场</span>
        <p class="lidata win-number__data1" :style='{"--tvt": `"${dataChange[1] && dataChange[1] != 0? dataChange[1]: ""}"`}'>{{store.profile['3vs3Victories']}}</p>
      </div>
      <div class="win-number__item">
        <img src="../../assets/soloSD.png" alt="">
        <span>单鸡胜场</span>
        <p class="lidata win-number__data2" :style='{"--solo": `"${dataChange[2] && dataChange[2] != 0? dataChange[2]: ""}"`}'>{{soloVictories}}</p>
      </div>
      <div class="win-number__item">
        <img src="../../assets/duoSD.png" alt="">
        <span>双鸡胜场</span>
        <p class="lidata win-number__data3" :style='{"--duo": `"${dataChange[3] && dataChange[3] != 0? dataChange[3]: ""}"`}'>{{duoVictories}}</p>
      </div>
    </div>
    <!--详情列表-->
    <ul>
      <li class="li-item">
        <div>
          <img class="li-icon" src="../../assets/icon_player_level.png" alt="">
          <span>等级</span>
        </div>
        <span class="lidata">Lv. {{expLevel}}</span>
      </li>
      <li class="li-item">
        <div>
          <img class="li-icon" src="../../assets/icon_championship.png" alt="">
          <span>十五胜挑战</span>
        </div>
        <span class="lidata">{{isQualifiedFromChampionshipChallenge? '√': '×'}}</span>
      </li>
      <li class="li-item">
        <div v-for="(item, index) in trophyranks" :key="index" >
          <div class="rankItem">
            <img :src="require(`../../assets/rankIcon/${index}.png`)" alt="">
            <span>{{item}}</span>
          </div>
        </div>
      </li>
      <li class="li-item">
        <div class="radar-info">
          <img src="@/assets/button_info.png" @click="showRadarInfo = true" alt="">
        </div>
        <n-modal v-model:show="showRadarInfo">
          <div class="radar-info--warp">
            <h2>战力星芒图</h2>
            <p>黄色 - 当前分类下所有英雄杯数的平均值</p>
            <p>绿色 - 当前分类下历史最高杯数英雄的杯数值</p>
            <p>英雄分类如下：</p>
            <div>
              <div v-for="(item, index) in BrawlerType" :key="index">
                <div>{{item}}</div>
                <img
                    v-for="(b, index) in __type[index]"
                    :src="('https://prepan.top/bsAssets/brawlers/'+ b +'.png')"
                    alt="">
              </div>
            </div>
            <p>如果对分类有更好的建议，欢迎反馈！</p>
          </div>
        </n-modal>
        <Radar :brawlers="brawlers"/>
      </li>
      <li class="li-item">
        <div>
          <img class="li-icon" src="../../assets/icon_club_league.png" alt="">
          <span>战队</span>
        </div>
        <div>
          <p class="lidata">{{club.name}}</p>
          <h5 style="text-align: right">{{club.tag}}</h5>
        </div>
      </li>
      <li class="li-item">
        <span>荣誉联赛结算后</span>
        <SeasonCountdown/>
        <div class="trophyEnd">
          <div>
            <img src="../../assets/trophy_cur.png" alt="">
            <p>
              <span style="margin-right: 10px">{{TLEnd[0]}}</span>
              <span>(↓{{trophies-TLEnd[0]}})</span>
            </p>
          </div>
          <div>
            <img src="../../assets/SeasonEndStarPoints.png" alt="">
            <span>{{TLEnd[1]}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {useStore} from "@/store";
import {NButton, NIcon, NModal} from 'naive-ui'
import {EyeOutline, EyeOffOutline} from '@vicons/ionicons5'
import Radar from '@/components/Radar'
let showTag = ref(true)
let showRadarInfo = ref(false)

import {type as BrawlerType, data as BrawlerTypeData} from '@/utils/BrawlerType'
let __type = []
Object.keys(BrawlerTypeData).forEach(i => {
  if(!Array.isArray(__type[BrawlerTypeData[i]])) {
    __type[BrawlerTypeData[i]] = []
  }
  __type[BrawlerTypeData[i]].push(i)
})

const store = useStore()
const {
  tag,
  name,
  icon,
  trophies,
  highestTrophies,
  expLevel,
  soloVictories,
  duoVictories,
  isQualifiedFromChampionshipChallenge,
  brawlers,
  club
} = storeToRefs(store).profile.value

import trophyRanks from "@/utils/trophyRanks";
let trophyranks = trophyRanks(brawlers)

import trophyLeagueEnd from "@/utils/trophyLeagueEnd";
import SeasonCountdown from '@/components/SeasonCountdown'
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
let TLEnd = trophyLeagueEnd(brawlers)

let dataChange = ref(['', '', '', ''])
onMounted(() => {
  if(localStorage.getItem(`data_change${tag}`)) {
    let tmp = JSON.parse(localStorage.getItem(`data_change${tag}`))
    dataChange.value = [
        (trophies - tmp[0] > 0? '+': '') + (trophies - tmp[0]),
        (store.profile['3vs3Victories']? '+': '') + (store.profile['3vs3Victories'] - tmp[1]),
        (soloVictories - tmp[2]? '+': '') + (soloVictories - tmp[2]),
        (duoVictories - tmp[3]? '+': '') + (duoVictories - tmp[3])
    ]
  }
  let dc = [trophies, store.profile['3vs3Victories'], soloVictories, duoVictories]
  localStorage.setItem(`data_change${tag}`, JSON.stringify(dc))
})

</script>

<style scoped>
.container {
  padding: 5vw;
  margin-bottom: 10vh;
}
.pinfo {
  margin-top: 14px;
  text-shadow: 2px 2px rgba(40,44,52, .8);
}
.pinfo, .trophy {
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar {
  width: 20vw;
  margin-right: 14px;
}
.name {
  font-size: 10vw;
  font-family: 'djvb',serif;
  max-width: 70vw;
  overflow:hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
}
.tag {
  font-size: 6vw;
  font-family: 'djv',serif;
}
.trophy {
  margin: 28px 0;
  text-shadow: 1px 1px black;
}
.trophy-l {
  width: 55%;
  text-align: center;
}
.trophy-r {
  width: 45%;
  text-align: center;
}
.trophy-l--title, .trophy-l--icon, .trophy-r--icon, .trophy-r--title {
  vertical-align: middle;
}
.trophy-l--title {
  font-size: 8vw;
}
.trophy-l--icon {
  height: 30px;
  margin-right: 6px;
}
.trophy-r--title {
  font-size: 4.2vw;
}
.trophies {
  font-size: 10vw;
  font-family: 'lato', serif;
  margin-top: 12px;
  color: rgb(255,193,41);
  font-weight: bold;
  position: relative;
}
.trophies::after {
  content: var(--number);
  position: absolute;
  left: 100%;
  top: -9px;
  font-size: 16px;
  font-weight: normal;
  text-shadow: none;
  color: white;
}
.trophy-r--icon {
  height: 20px;
  margin-right: 6px;
}
.highest {
  font-size: 8vw;
  font-family: 'lato', serif;
  font-weight: normal;
}
.difTro {
  font-size: 15px;
  margin-top: -4px;
  font-style: italic;
  opacity: 0.9;
}
.win-number {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  text-shadow: 1px 1px black;
}
.win-number__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
}
.win-number img{
  width: 40px;
}
.win-number span{
  font-size: 4.5vw;
}
.win-number p{
  letter-spacing: 1px;
  position: relative;
  margin-top: -2px;
}
.win-number__data1::after,
.win-number__data2::after,
.win-number__data3::after{
  position: absolute;
  left: 100%;
  top: -2px;
  font-size: 13px;
  font-weight: normal;
  text-shadow: none;
  color: white;
  letter-spacing: 0;
}
.win-number__data1::after {
  content: var(--tvt);
}
.win-number__data2::after {
  content: var(--solo);
}
.win-number__data3::after {
  content: var(--duo);
}


.li-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid rgba(40,44,52,0.6);
  font-size: 5vw;
  text-shadow: 1px 1px black;
  overflow: scroll;
}
.li-item:first-child {
  border-top: 1px solid rgba(40,44,52,0.6);
}
.li-item img, .li-item span {
  vertical-align: middle;
}
.li-item img {
  width: 30px;
}
.lidata {
  font-size: 6vw;
  font-weight: bold;
  font-family: 'lato', serif;
  margin-top: 4px;
}
.li-icon {
  margin-right: 8px;
}
.rankItem {
  margin-top: 4px;
  text-align: center;
  margin-right: 30px;
  width: 30px;
}
.li-item:last-child {
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
}
.radar-info {
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 100;
}
.radar-info img {
  width: 30px;
}
.radar-info--warp {
  background-color: #fff;
  width: 70vw;
  height: 60vh;
  padding: 20px;
  overflow: scroll;
}
.radar-info--warp p {
  margin: 10px 0;
  font-size: 18px;
}
.radar-info--warp img {
  width: 30px;
  height: 30px;
}
.trophyEnd {
  margin-top: 10px;
}
.trophyEnd div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
  width: 80vw;
}
.trophyEnd img {
  margin-right: 8px;
}
</style>
