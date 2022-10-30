<template>
  <div class="eventsWarp">
    <h2 class="t-title">正在进行</h2>
    <div v-for="(item, index) in eventData.active" :key="item.map.name">
      <EventTitle
          :mode="item.map.gameMode.name"
          :map="item.map.name"
          class="title"
          :time="[0,item.endTime]"
          @click="detail(['active', index])"
      />
    </div>
    <!--@click="detail([item.map.gameMode.name, item.map.name, item.map.stats])"-->
    <h2 class="t-title">即将到来</h2>
    <div v-for="(item, index) in eventData.upcoming" :key="item.map.name">
      <EventTitle
          :mode="item.map.gameMode.name"
          :map="item.map.name"
          class="title"
          :time="[1,item.startTime]"
          @click="detail(['upcoming', index])"
      />
    </div>
  </div>
</template>

<script setup>
import EventTitle from "@/components/EventTitle";
import axios from "axios";
import {reactive} from "vue";
import {useStore} from "@/store";
import router from "@/router";
let store = useStore()

let eventData = reactive({
  active: null,
  upcoming: null
})

function detail(data) {
  router.push(`/detail?type=${data[0]}&index=${data[1]}`)
}

axios({
  url: 'https://api.brawlapi.com/v1/events',
  method: 'GET'
}).then(res => {
  eventData.active = res.data.active
  eventData.upcoming = res.data.upcoming
})

</script>

<style scoped>
.t-title {
  margin-top: 30px;
}
.eventsWarp {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  transform: skew(-3deg);
}
</style>
