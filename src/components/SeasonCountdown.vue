<template>
  <div class="cdWarp">
    <span>{{((new Date(targetDate) - new Date())/1000/3600/24).toFixed((0))}}天 </span>
    <NCountdown :duration="duration" :active="true"/>
  </div>
</template>

<script setup>
import {NCountdown} from 'naive-ui'
import {computed, onMounted, ref} from "vue";
import axios from "axios";

let targetDate = ref(null)

let duration = computed(() => {
  let now = new Date()
  if(now.getHours() >= 16) {
    return (86400 - ( now -  new Date(`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`) )/1000 + 16*3600)*1000
  } else {
    return new Date(`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} 16:00`) - now
  }
})

onMounted(() => {
  axios({
    method: 'GET',
    url: 'https://prepan.top/bs_m/seasonTime.json'
  }).then(res => {
    targetDate.value = res.data
  })
})
</script>

<style scoped>
.cdWarp {
  font-style: italic;
  font-size: 18px;
}
</style>
