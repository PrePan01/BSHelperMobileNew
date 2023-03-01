<template>
  <TopNav :to="'/more'" :title="'战队查询'"/>
  <div class="club-warp">
    <!--加载遮罩-->
    <Overlay :show="showOverlay" z-index="100">
      <div class="wrapper">
        <Loading color="#1989fa" />
      </div>
    </Overlay>
    <!--搜索框-->
    <Search
        v-model="clubTag"
        placeholder="请输入战队标签 (无需#)"
        input-align="center"
        @search="search"
        background="transparent"
    />

    <div class="info" v-if="Object.keys(clubData).length !== 0">
      <div class="info-title">
        <span class="name">{{clubData.name}}</span>
        <div>
          <img src="../assets/trophy_cur.png" alt="" class="trophy">
          <span class="clubTro">{{clubData.trophies}}</span>
        </div>
      </div>
      <h4>{{clubData.members?.length}} 人</h4>
      <p class="desc">
        {{clubData.description}}
      </p>
    </div >

    <div>
      <ul>
        <li v-for="(item, index) in clubData.members" class="menber" :key="item.tag">
          {{item.name}}
          <div>
            <img src="../assets/trophy_cur.png" alt="" class="trophy">
            <span class="memberTro">{{item.trophies}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import {Overlay, Search, Loading } from 'vant'
import {ref} from "vue";
import TopNav from '@/components/TopNav'

let clubTag = ref('')
let clubData = ref({})
let showOverlay = ref(false)

function search(){
  showOverlay.value = true
  axios({
    methods: 'GET',
    url: '/playStatsApi/clubs/' + clubTag.value,
  }).then((res) =>{
    clubData.value = res.data
    showOverlay.value = false
    console.log(res.data)
  })
}
</script>

<style scoped>
.club-warp {
  padding-bottom: 10vh;
}
.info {
  padding: 20px;
  margin: 10px;
  border: 1px solid white;
}
.trophy {
  width: 30px;
  margin-right: 4px;
}
.info-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}
.name {
  font-size: 28px;
  font-weight: bold;
  font-family: 'lato', serif;
}
.clubTro {
  font-size: 24px;
  font-family: 'djv', serif;
}
.name,.clubTro {
  vertical-align: bottom;
}
.desc {
  margin-top: 10px;
  font-size: 16px;
}
.menber {
  padding: 15px 15px;
  margin: 0 15px;
  font-size: 16px;
  border-bottom: 1px solid white;
  display: flex;
  justify-content: space-between;
}
.trophy, .memberTro {
  vertical-align: middle;
}
.memberTro {
  font-size: 16px;
  font-family: 'djv', serif;
}
</style>
