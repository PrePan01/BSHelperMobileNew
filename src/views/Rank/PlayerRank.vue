<template>
  <n-spin size="large" class="spin" v-show="data === null" :stroke="'rgb(255,190,32)'"/>
  <div class="rank_warp">
    <PlayerItem v-for="item in data" :key="item.tag" :player="item" @click="searchPlayer"/>
  </div>
</template>

<script setup>
import officalApi from '@/api/officalApi'
import PlayerItem from '@/components/rank/PlayerItem'
import {NSpin} from 'naive-ui'
import {ref,watch} from "vue";

let emits = defineEmits(['searchPlayer'])
function searchPlayer() {
  emits('searchPlayer', true)
}

let props = defineProps(['region'])
let region = ref(props.region)
watch(() => props.region, newVal => {
  region.value = newVal
  data.value = null
  getData()
})

let data = ref(null)
function getData() {
  officalApi.get(`/playStatsApi/v1/rankings/${props.region}/players`).then(res => {
    data.value = res.data.items
  })
}

getData()

</script>

<style scoped>
.rank_warp {
  padding-bottom: 50px;
}
.spin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
