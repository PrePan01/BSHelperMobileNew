<template>
  <div class="container">
    <div class="pinfo">
      <img :src="'https://prepan.top/bsAssets/avatar/' + icon.id + '.png'" alt="暂无头像" class="avatar">
      <div>
        <p class="name">{{name}}</p>
        <p class="tag">
          {{tag}}
        </p>
      </div>
    </div>
    <div class="trophy">
      <div class="trophy-l">
        <img src="../../assets/trophy_cur.png" alt="" class="trophy-l--icon">
        <span class="trophy-l--title">当前杯数</span>
        <h2 class="trophies">{{trophies}}</h2>
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
          <img class="li-icon" src="../../assets/3vs3.png" alt="">
          <span>3V3胜场</span>
        </div>
        <span class="lidata">{{store.profile['3vs3Victories']}}</span>
      </li>
      <li class="li-item">
        <div>
          <img class="li-icon" src="../../assets/soloSD.png" alt="">
          <span>单鸡胜场</span>
        </div>
        <span class="lidata">{{soloVictories}}</span>
      </li>
      <li class="li-item">
        <div>
          <img class="li-icon" src="../../assets/duoSD.png" alt="">
          <span>双鸡胜场</span>
        </div>
        <span class="lidata">{{duoVictories}}</span>
      </li>
      <li class="li-item">
        <div>
          <img class="li-icon" src="../../assets/icon_championship.png" alt="">
          <span>十五胜挑战</span>
        </div>
        <span class="lidata">{{isQualifiedFromChampionshipChallenge? '√': '×'}}</span>
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
        <div v-for="(item, index) in trophyranks" :key="index" >
          <div class="rankItem">
            <img :src="require(`../../assets/rankIcon/${index}.png`)" alt="">
            <span>{{item}}</span>
          </div>
        </div>
      </li>
      <li class="li-item">
        荣誉联赛结算后
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
} = store.profile

import trophyRanks from "@/utils/trophyRanks";
let trophyranks = trophyRanks(brawlers)

import trophyLeagueEnd from "@/utils/trophyLeagueEnd";
let TLEnd = trophyLeagueEnd(brawlers)

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
  margin-bottom: 6px;
  max-width: 78vw;
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
  margin-right: 10px;
}
.trophies {
  font-size: 10vw;
  font-family: 'lato', serif;
  margin-top: 12px;
  color: rgb(255,193,41);
}
.trophy-r--icon {
  height: 20px;
  margin-right: 6px;
}
.highest {
  font-size: 8vw;
  font-family: 'lato', serif;
  margin-top: 6px;
  font-weight: normal;
}
.difTro {
  margin-top: 4px;
  font-size: 18px;
  font-style: italic;
  opacity: 0.9;
}
.li-item {
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
