<template>
  <div class="calc--warp">
    <div class="calc--left">
      <span>从</span>
      <n-select v-model:value="startLv" :options="$router.currentRoute.value.name === 'brawlerData'?lvoptions:lvoptions_o1" class="lvselect"/>
      <span>级</span>
      <p>到
        <span style="font-family: 'lato', serif" v-if="$router.currentRoute.value.name === 'brawlerData'">{{props.lv}}</span>
        <n-select v-model:value="targetLv" :options="lvoptions_o2" class="lvselect" v-if="$router.currentRoute.value.name !== 'brawlerData'"/>
        级所需资源
      </p>
    </div>
    <div class="calc--right">
      <div class="calc--right__item">
        <img src="@/assets/coins.png" alt="" class="calc--img">
        <p class="calc--num">{{coin}}</p>
      </div>
      <div class="calc--right__item">
        <img src="@/assets/powers.png" alt="" class="calc--img">
        <p class="calc--num">{{power}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NSelect } from 'naive-ui'
import {computed, ref, watch} from 'vue'
let props = defineProps(['lv'])
let startLv = ref(1)
let targetLv = ref(11)
let coin = ref(7765)
let power = ref(3740)
// 计算所需资源
const resource = [
    //[金币 能量]
    [20,20],
    [35,30],
    [75,50],
    [140,80],
    [290,130],
    [480,210],
    [800,340],
    [1250,550],
    [1875,890],
    [2800,1440]
]

watch([() => props.lv, startLv, targetLv], newVal => {
  if((newVal[0] || newVal[2]) <= startLv.value) {
    startLv.value = newVal[0] - 1 || 1
  }

  let _c = 0, _p = 0
  for(let i = newVal[1] - 1;i < (newVal[0] || newVal[2]) - 1;i++) {
    _c += resource[i][0]
    _p += resource[i][1]
  }
  coin.value = _c
  power.value = _p
})

let lvoptions = computed(() => {
  if(props.lv === 1) {
    return {
      label: 1, value: 1
    }
  } else {
    let tmp = []
    for(let i = 1;i<=props.lv - 1;i++) {
      tmp.push({
        label: i, value: i
      })
    }
    return tmp
  }
})

let lvoptions_o1 = computed(() => {
    let tmp = []
    for(let i = 1;i<=targetLv.value - 1;i++) {
      tmp.push({
        label: i, value: i
      })
    }
    return tmp
})
let lvoptions_o2 = computed(() => {
  let tmp = []
  for(let i = startLv.value + 1;i<=11;i++) {
    tmp.push({
      label: i, value: i
    })
  }
  return tmp
})
</script>

<style scoped>
.calc--warp {
  background-color: rgb(250,250,252);
  color: black;
  display: flex;
  padding: 10px 0;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: 1px solid gray;
  border-top: 1px solid gray;
}
.calc--left {
  text-align: center;
  font-size: 18px;
}
.calc--left span, .lvselect {
  vertical-align: middle;
}
.calc--right {
  display: flex;
}
.calc--right__item {
  text-align: center;
  width: 20vw;
}
.calc--img {
  display: inline-block;
  width: 30px;
}
.calc--num {
  font-size: 22px;
  line-height: 22px;
  font-family: 'lato', serif;
}
.lvselect {
  display: inline-block;
  width: 65px;
  margin: 0 5px;
}
</style>
