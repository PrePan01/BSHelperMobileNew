<template>
  <div class="popWarp">
    <n-spin size="large" stroke="#2A59DB" v-show="showSpin" class="spin">
      <template #description >
        <p style="color: #2A59DB">正在寻找玩家</p>
      </template>
    </n-spin>
    <div class="detail" v-show="!showSpin">
      <h3 class="name">{{playerData.name}}</h3>
      <p>
        <img src="../../assets/trophy_cur.png" alt="" >
        <span>奖杯数：{{playerData.trophies}}</span>
      </p>
      <p>
        <img src="../../assets/trophy_cur.png" alt="" >
        <span>最高奖杯数：{{playerData.highestTrophies}}</span>
      </p>
      <p>
        <img src="../../assets/3vs3.png" alt="" >
        <span>3V3胜场：{{playerData['3vs3Victories']}}</span>
      </p>
      <p>
        <img src="../../assets/soloSD.png" alt="" >
        <span>单鸡胜场：{{playerData.soloVictories}}</span>
      </p>
      <p>
        <img src="../../assets/duoSD.png" alt="" >
        <span>双鸡胜场：{{playerData.duoVictories}}</span>
      </p>
      <span class="toMore" @click="s">查看更多 ></span>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import {NSpin} from 'naive-ui'
import {onMounted, ref} from "vue";
let showSpin = ref(false)
let props = defineProps(['data'])
let {tag} = props.data
let searchTag = tag.slice(1)
let playerData = ref({})

import {useRouter} from "vue-router";
const router = useRouter()

import {useStore} from "@/store";
import officalApi from "@/api/officalApi";
const store = useStore()
let emits = defineEmits(['closePopover'])
function closePopover() {
  emits('closePopover')
}
function s() {
  closePopover()
  store.searchPlayer(tag.split('#')[1])
}

onMounted(() => {
  showSpin.value = true
  officalApi.get(`/playStatsApi/v1/players/%23${searchTag}`).then(res => {
    playerData.value = res.data
    showSpin.value = false
  })
})


</script>

<style scoped>
.popWarp {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
}
.spin {
  padding: 20px;
}
.detail img{
  width: 20px;
  margin-right: 3px;
}
.detail p {
  margin: 4px 0;
}
.detail p img,span {
  vertical-align: middle;
}
.toMore {
  color: rgb(42,89,219);
  font-size: 14px;
  margin-top: 6px;
  display: inline-block;
  border: 1px solid rgb(42,89,219);
  padding: 3px 6px;
  border-radius: 5px;
}
</style>
