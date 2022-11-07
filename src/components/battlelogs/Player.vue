<template>
  <div class="warp">
    <img :src="'https://prepan.top/bsAssets/brawlers/' + brawler.id + '.png'" alt="" class="brawler-icon">
    <n-tag :color="powerColor" size="small">
      Lv.{{brawler.power}}
    </n-tag>
    <p class="name" :class="name === props.mvp?'mvp':name === myName?'me':''">{{name}}</p>
    <p class="trophy">
      <img :src="require('@/assets/' + (['soloRanked', 'teamRanked'].includes(props.type)?RankTrans(trophies)[1]:'trophy_cur') + '.png') " alt="" style="width: 18px;margin-right: 2px">
      <span>{{['soloRanked', 'teamRanked'].includes(props.type)?RankTrans(trophies)[0]:trophies}}</span>
    </p>
  </div>
</template>

<script setup>
import {NTag} from 'naive-ui'
import {computed} from "vue";
import {useStore} from "@/store";
const store = useStore()
const myName = store.profile.name
import RankTrans from "@/utils/battle/RankTrans";

let props = defineProps(['player', 'mvp', 'trophies', 'type'])
let {brawler, tag, name} = props.player

let powerColor = computed(() => {
  if(brawler.power === 11)  return {color: 'rgba(247,121,125,0.1)', textColor: 'rgba(247,121,125,1)', borderColor: 'rgba(247,121,125,1)'}
  else if (brawler.power === 10) return {color: 'rgba(251,215,134,0.1)', textColor: 'rgba(251,215,134,1)', borderColor: 'rgba(251,215,134,1)'}
  else return {color: 'rgba(198,255,221,0.1)', textColor: 'rgba(198,255,221,1)', borderColor: 'rgba(198,255,221,1)'}
})
</script>

<style scoped>
.warp {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.brawler-icon {
  height: 65px;
  width: 65px;
  margin:0 0 4px 0;
}
.name {
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
  word-break:keep-all;
  margin-top: 4px;
}
.me {
  font-weight: bold;
  font-family: 'djv', serif;
  color: lightgoldenrodyellow;
  text-shadow: 1px 1px black;
}
.mvp {
  font-weight: bold;
  font-family: 'djv', serif;
  color: rgb(255,190,32);
}
.trophy {
  display: flex;
  align-items: center;
}
</style>
