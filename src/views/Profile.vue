<template>
  <div class="warp" v-if="Object.keys(store.profile).length !== 0">
      <Tabs
          v-model:active="active"
          animated
          background="transparent"
          color="rgb(255,221,80)"
          title-active-color="wheat"
          title-inactive-color="white"
      >
        <Tab title="个人数据">
          <PData/>
        </Tab>
        <Tab title="我的英雄">
          <Brawlers/>
        </Tab>
      </Tabs>
    </div>
    <Empty v-if="Object.keys(store.profile).length === 0"/>

  <BottomNav></BottomNav>
    <div class="calc" v-if="active === 1" :style="{right: calcActive?0: '-92vw'}">
      <img src="@/assets/close.png"
           @click="calcActive = !calcActive" alt=""
           :style="{transform: calcActive?'rotate(90deg)': 'rotate(-90deg)'}"
      >
      <UpdateCalc class="calc__main"></UpdateCalc>
    </div>
</template>

<script setup>
import { Tab, Tabs } from 'vant';
import BottomNav from '../components/BottomNav'
import Empty from '../components/Empty'
import {ref} from "vue";
import PData from './Profile/PData';
import Brawlers from './Profile/Brawlers';
import UpdateCalc from '@/components/brawlerData/UpdateCalc';

import {useStore} from "@/store";
const active = ref(0)
const store = useStore()

let calcActive = ref(false)
</script>

<style scoped>
.calc {
  display: flex;
  align-items: center;
  position: fixed !important;
  top: 60vh;
  transition: .5s;
}
.calc img {
  width: 20px;
  transition: .5s;
}
.calc__main {
  width: 92vw;
}

</style>
