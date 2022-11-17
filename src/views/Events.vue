<template>
  <n-spin size="large" v-if="!eventData.active" class="spin">
    <template #description>
      正在获取当前对战...
    </template>
  </n-spin>
  <div class="eventsWarp" v-if="eventData.active">
    <h2 class="t-title">正在进行</h2>
    <div v-for="(item, index) in eventData.active" :key="item.map.name">
      <EventTitle
          :mode="item.map.gameMode.hash"
          :map="item.map.name"
          class="title"
          :time="[0,item.endTime]"
          @click="detail(['active', index])"
      />
    </div>
    <h2 class="t-title">即将到来</h2>
    <div v-for="(item, index) in eventData.upcoming" :key="item.map.name">
      <EventTitle
          :mode="item.map.gameMode.hash"
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
import {NSpin} from 'naive-ui'
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
.spin {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
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
