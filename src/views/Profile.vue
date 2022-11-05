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

</template>

<script setup>
import { Tab, Tabs } from 'vant';
import BottomNav from '../components/BottomNav'
import Empty from '../components/Empty'
import {ref} from "vue";
import PData from './Profile/PData';
import Brawlers from './Profile/Brawlers';
import {useStore} from "@/store";
const active = ref(0)
const store = useStore()
</script>

<style scoped>


</style>
