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

onMounted(() => {
  showSpin.value = true
  axios({
    url: `/playStatsApi/${searchTag}`,
    method: 'GET'
  }).then(res => {
    console.log(res.data)
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
</style>
