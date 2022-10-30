<template>
  <div class="container f">
    <Map :event="event"></Map>
    <div class="brawler-warp">
      <div class="brawler">
        <img :src="'https://prepan.top/bsAssets/brawlers/'+ myBrawler[0] + '.png'" alt="" class="brawler-icon">
        <span class="trophy">{{myBrawler[2]}}</span>
        <Tag
            class="tag"
            type="warning"
            size="small"
            mark
            v-if="battle.starPlayer?.tag == store.profile.tag"
        >
          MVP
        </Tag>
      </div>
      <p class="trophy__title">
        <img src="@/assets/trophy_cur.png" alt="" style="width: 18px;">
        <span>{{myBrawler[1]}}</span>
      </p>
    </div>
    <div>
      <p class="result" :style="{color: 'var(--' + battle.result + ')'}">{{result(battle.result)}}</p>
      <p class="time">{{TTrans(battleTime)}}</p>
    </div>
  </div>
</template>

<script setup>
import '@/css/battleLogsTitle.css'
import {NTag} from 'naive-ui'
import { Tag } from 'vant';
import {computed} from "vue";
import Map from '../Map'
import TTrans from '../../../utils/battle/BattleTimeFromNow'
import {result} from '@/utils/battle/BattleResult'
import {useStore} from "@/store";
const store = useStore()
let props = defineProps(['data'])
let {battleTime, event, battle} = props.data

let myBrawler = computed(() => {
  for(let i of battle.teams) {
    for(let p of i) {
      if(p.tag === store.profile.tag) {
        return [p.brawler.id, p.brawler.trophies, p.brawler.power]
      }
    }
  }
})

</script>

<style scoped>
.brawler {
  position: relative;
  height: 50px;
}
.trophy {
  position: absolute;
  left: 0;
  background-color: black;
  padding: 0 3px;
  font-family: 'lato', serif;
}
.tag {
  position: absolute;
  bottom: 0;
  left: 0;
}
.trophy__title {
  display: flex;
  align-items: center;
}
</style>
