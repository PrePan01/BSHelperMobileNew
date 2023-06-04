<template>
  <div class="player_warp" :class="props.enemy?'player_warp_enemy':'player_warp'">
    <div :class="`brawler_portrait ${props.enemy?'brawler_portrait_enemy':''}`">
      <img
          :src="'https://prepan.top/bsAssets/brawlerPortraits/' + battlelog.brawler.id + '.png'" alt=""
          class="brawler_portrait_img"
      >
      <div class="brawler_portrait_info">
        <div :class="props.enemy?'trophy_warp_enemy':'trophy_warp'">
          <div v-if="!['soloRanked', 'teamRanked'].includes(type)">
            <img src="@/assets/trophy_cur.png" alt="" class="trophies_img">
            <span>{{battlelog.brawler.trophies}}</span>
          </div>
          <div v-else>
            <img :src="require('@/assets/rankIcon_number/' + battlelog.brawler.trophies + '.png') " alt="" style="height: 20px;">
          </div>
        </div>
        <div :class="props.enemy?'brawler_power_enemy':'brawler_power'" :style="{color: battlelog.brawler.power===11?'var(--lv11)':''}">
          <span style="font-size: 12px">Lv</span>{{battlelog.brawler.power}}
        </div>
      </div>
    </div>
    <n-spin :show="showSpin" style="width: 70%" :stroke="'gold'">
      <div class="playerInfo" :style="{flexDirection: props.enemy?'row-reverse':'row'}">
        <div class="player_name_warp">
          <div class="player_name" :style="{color: mvp === '#' + playerTag?'gold':'white'}">{{battlelog.name}}</div>
          <div class="recentWinRate" v-if="modeWinRate[1] != 0 && !isNaN(modeWinRate[1])">
            近期<span class="recent_name">{{ModeTrans(mode)}}</span>：<span :style="{color: 'var(--victory)'}">{{modeWinRate[0]}}胜</span>/ <span :style="{color: 'var(--defeat)'}">{{modeWinRate[1] - modeWinRate[0]}}负</span>
          </div>
          <div class="recentWinRate" v-if="brawlerWinRate[1] != 0 && !isNaN(brawlerWinRate[1])">
            近期<span class="recent_name">{{BrawlerTrans(battlelog.brawler.id)}}</span>：<span :style="{color: 'var(--victory)'}">{{brawlerWinRate[0]}}胜</span>/ <span :style="{color: 'var(--defeat)'}">{{brawlerWinRate[1] - brawlerWinRate[0]}}负</span>
          </div>
        </div>
        <div class="player_trophy">
          <img src="@/assets/trophy_cur.png" alt="" class="trophies_img">
          <span>{{playerInfo?.trophies}}</span>
        </div>
      </div>
    </n-spin>
  </div>
</template>

<script setup>
import {NSpin} from 'naive-ui'
import BattleResultData from '@/utils/battle/BattleResultData'
import ModeTrans from '@/utils/ModeTranslate'
import BrawlerTrans from '@/utils/BrawlerTranslate'
import officalApi from '@/api/officalApi'
import {reactive, ref} from "vue";
import axios from "axios";


let showSpin = ref(true)

let props = defineProps(['battlelog', 'enemy', 'playerTag','mode', 'mvp', 'type'])
let { battlelog, playerTag, mode, mvp, type } = props
let recentBattleData = ref(null)
let recentWinRate = ref(null)
let playerInfo = ref({})
let modeWinRate = ref([])
let brawlerWinRate = ref([])

function getModeWinRate(battlelogs) {
  let victory = 0, sum = 0
  battlelogs.forEach(b => {
    if(b.battle.mode === mode) {
      sum++
      if(b.battle.result === 'victory') victory++
    }
  })
  return [victory, sum]
}

function getBrawlerWinRate(battlelogs) {
  let victory = 0, sum = 0
  battlelogs.forEach(b => {
    if('battle' in b) {
      b.battle.teams?.forEach(team => {
        team.forEach(player => {
          if(player.tag === '#' + playerTag && player.brawler.id === battlelog.brawler.id) {
            sum++
            if(b.battle.result === 'victory') victory++
          }
        })
      })
    }
  })
  return [victory, sum]
}

axios.all([
  officalApi.get(`/playStatsApi/v1/players/%23${playerTag}/battlelog`),
  officalApi.get(`/playStatsApi/v1/players/%23${playerTag}`)
]).then(res => {
  recentBattleData.value = BattleResultData(res[0].data.items)
  recentWinRate.value = (recentBattleData.value.victory / (res[0].data.items.length) * 100).toFixed(0)
  playerInfo.value = res[1].data
  modeWinRate.value = getModeWinRate(res[0].data.items)
  brawlerWinRate.value = getBrawlerWinRate(res[0].data.items)
  showSpin.value = false
}).catch(err => {
  window.$message.error('未搜索到玩家，请重试')
  console.log(err)
  showSpin.value = false
})

</script>

<style scoped>
.player_warp, .player_warp_enemy {
  height: 10vh;
  display: flex;
  align-items: center;
}
.player_warp {
  background: linear-gradient(to right, rgba(61,129,255,.8), transparent);
}
.player_warp_enemy {
  background: linear-gradient(to left, rgba(204,44,38,.5), transparent);
  flex-direction: row-reverse;
  text-align: right;
}
.brawler_portrait {
  height: 100%;
  width: 30%;
  position: relative;
}
.brawler_portrait_enemy {
  text-align: right;
}
.brawler_portrait_enemy .brawler_portrait_img{
  transform: rotateY(180deg);
}
.brawler_portrait_info {
  position: absolute;
  background-color: rgb(0,0,0,.75);
  width: 100%;
  bottom: 0;
  height: 24%;
}
.brawler_power, .brawler_power_enemy {
  font-family: 'lato', serif;
  position: absolute;
  line-height: 15px;
  bottom: -1px;
  font-size: 18px;
  font-style: italic;
  font-weight: bold;
}
.brawler_power {
  right: 5px;
}
.brawler_power_enemy {
  left: 5px;
}
.brawler_portrait img {
  height: 100%;
  object-fit: cover;
}

.player_name {
  font-size: 5vw;
  font-weight: bold;
  text-shadow: 1px 1px #000000;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  word-break:keep-all;
}
.trophy_warp, .trophy_warp_enemy {
  position: absolute;
  bottom: 0;
  line-height: 18px;
}
.trophy_warp {
  left: 2px;
}
.trophy_warp_enemy {
  right: 2px;
}
.trophy_warp, .trophy_warp_enemy * {
  vertical-align: middle;
  font-size: 18px;
  font-family: 'djvb', serif;
  color: rgb(255,190,32);
  text-shadow: 1px 1px black;
}
.trophies_img {
  width: 16px;
  margin-right: 2px;
}
.playerInfo {
  padding: 0 6px;
  display: flex;
  align-items: center;
}
.player_name_warp {
  width: 60%;
  padding: 0 6px;
}
.recentWinRate {
  font-family: 'lato', serif;
  font-size: 14px;
}
.player_trophy {
  font-family: 'djvb', serif;
  font-size: 5vw;
}
.player_trophy * {
  vertical-align: middle;
}
.trophies_img {
  width: 5vw;
}
.recentWinRate {
  font-size: 12px;
}
.recent_name {
  font-weight: bold;
}
</style>
