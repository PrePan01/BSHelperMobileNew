<template>
  <div class="hiswarp">
    <div class="title">
      <div>
        <div class="title__name">
          <h2 style="margin-right: 6px">{{brawlerTranslate(props.curHistory)}}</h2>
          <n-button circle size="small" @click="sortData">
            <template #icon>
              <n-icon>
                <ArrowSort16Regular/>
              </n-icon>
            </template>
          </n-button>
        </div>
        <h4>调整历史</h4>
      </div>
      <div>
        <div class="change__item">
          <span class="change__circle change__circle--suc"></span>
          <span class="suc">{{changesNums.success}}</span>
          <span> 次 </span>
          <span class="suc">增强</span>
        </div>
        <div class="change__item">
          <span class="change__circle change__circle--err"></span>
          <span class="err">{{changesNums.error}}</span>
          <span> 次 </span>
          <span class="err">削弱</span>
        </div>
      </div>
    </div>
    <n-timeline v-if="historyDatas" class="timeline">
      <n-timeline-item
          v-for="(historyData, i) in historyDatas"
          :type="historyData.type"
          :content="historyData.content"
          :time="historyData.time"
          :key="i"
      />
    </n-timeline>
    <n-timeline v-else class="timeline">
      <n-timeline-item v-for="item in new Array(6)">
        <template #default>
          <n-skeleton text :repeat="2"/>
        </template>
        <template #header>
          <n-skeleton text :repeat="1"/>
        </template>
      </n-timeline-item>
    </n-timeline>
  </div>
</template>

<script setup>
import {ArrowSort16Regular} from '@vicons/fluent'
import {NTimeline, NTimelineItem, NButton, NIcon, NSkeleton} from 'naive-ui'
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import brawlerTranslate from '../../utils/BrawlerTranslate'
let props = defineProps(['curHistory'])

let historyDatas = ref()
let changesNums = reactive({
  error: 0,
  success: 0
})

function cal(data) {
  let tmp = {
    error: 0,
    success: 0
  }
  data.forEach(i => {
    if(i.type === 'error' || i.type === 'success') {
      tmp[i.type]++
    }
  })
  changesNums.error = tmp.error
  changesNums.success = tmp.success
}

function sortData() {
  historyDatas.value.sort(() => -1)
}

onMounted(() => {
  axios({
    url: `https://prepan.top/bs_m/brawlerData/history/${props.curHistory}.json`,
    // url: `/demo/brawlerData/history/${props.curHistory}.json`,
    method: 'GET'
  }).then(res => {
    historyDatas.value = res.data
    cal(res.data)
  })
})

</script>
<style scoped>
.hiswarp {
  padding: 12px 20px 20px 20px;
  width: 70vw;
  background-color:white;
}
.timeline {
  max-height: 60vh;
  overflow: scroll;
}
.title {
  margin-bottom: 20px;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title__name {
  display: flex;
  align-items: center;
}
.change__item {
  text-align: right;
}
.change__item span {
  vertical-align: middle;
}
.change__circle {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
}
.change__circle--suc {
  border: 2px solid rgba(36,165,96, 0.7);
}
.change__circle--err {
  border: 2px solid rgba(208,48,80,0.7);
}
.suc {
  color: #24A560;
}
.err {
  color: #D03050;
}
</style>
