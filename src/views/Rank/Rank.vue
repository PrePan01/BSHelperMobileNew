<template>
  <n-spin size="large" class="spin" :show="showSpin" :stroke="'rgb(255,190,32)'">
    <div class="topnav_warp">
      <TopNav :to="'/more'" :title="'排行榜'"/>
      <n-dropdown trigger="hover" :options="options" @select="handleSelect" style="height: 70vh;overflow: scroll">
        <n-button class="select_btn">{{select.label}}</n-button>
      </n-dropdown>
    </div>
    <div class="bottom_nav">
      <div class="bottom_nav_item" :class="curType === 0? 'selected':'notselected'" @click="curType = 0">总奖杯</div>
      <div class="bottom_nav_item" :class="curType === 1? 'selected':'notselected'" @click="curType = 1">单英雄</div>
    </div>
    <div class="rank_warp">
      <PlayerRank :region="select.key" v-if="curType===0" @searchPlayer="searchPlayer"/>
      <BrawlerRank :region="select.key" v-if="curType===1" @searchPlayer="searchPlayer"/>
    </div>
  </n-spin>
</template>

<script setup>
import {NDropdown, NButton, NSpin} from 'naive-ui'
import TopNav from '@/components/TopNav'
import PlayerRank from '@/views/Rank/PlayerRank'
import BrawlerRank from '@/views/Rank/BrawlerRank'
import {onUnmounted, ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()

let curType = ref(0)
import RegionCode from '@/utils/RegionCode'
let options = Object.keys(RegionCode).map(item =>
  item = {'label': item, 'key': RegionCode[item]}
)
let select = ref({
  label: '全服',
  key: 'global',
})
function handleSelect(_,obj) {
  select.value = obj
}


let showSpin = ref(false)
function searchPlayer(data) {
  showSpin.value = data
}

onUnmounted(() => {
  showSpin.value = false
})

</script>

<style scoped>
.topnav_warp {
  position: relative;
}
.select_btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
}
.bottom_nav {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  font-size: 16px;
  background-color: #fff;
  color: rgb(239,177,43);
  font-weight: bold;
}
.bottom_nav_item {
  height: 100%;
  width: 50%;
  text-align: center;
  padding: 8px 0;
}
.bottom_nav_item:first-child {
  border-right: 1px solid transparent;
}
.notselected {
  background-color: white;
  color: rgb(239,177,43);
  transition: .2s;
}
.selected {
  background-color: rgb(239,177,43);
  color: white;
  transition: .2s;
}
.spin {
  height: 100vh;
}
.rank_warp {
  height:100vh;
  overflow: scroll;
}
</style>
