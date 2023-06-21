<template>
  <NSpin :show="store.showSpin" stroke="rgb(255,255,1)" :size="60">
    <!--<n-button class="login" @click="showLogin = true">登录</n-button>
    <n-modal v-model:show="showLogin" class="login-model">
      <Login/>
    </n-modal>-->
    <div class="warp">
      <img src="../assets/logo.png" alt="" class="logo">
      <WordSwiper class="ws"/>
      <div class="searchWarp">
        <input type="text" class="searchInput" v-model.trim="tag">
        <span class="searchBtn" @click="search('cur')">搜索</span>
      </div>
      <div class="history" v-if="history">
        <span>是否想搜索：</span>
        <n-button type="warning" ghost @click="search('his')">
          {{history}}
        </n-button>
      </div>

      <SeasonCountdown/>

      <div class="more">
        <div @click="$router.push('/more')">直接进入</div>
        <div @click="$router.push('/update')">更新日志/公告</div>
      </div>
    </div>
    <template #description>
      <div class="spinInfo">
        正在获取远方的数据..
      </div>
    </template>
  </NSpin>
</template>

<script setup>
import {NButton, NSpin, NModal} from 'naive-ui'
import WordSwiper from '../components/WordSwiper'
import {ref} from "vue";
let tag = ref()
import {useStore} from "@/store";
const store = useStore()
import {useRouter} from 'vue-router'
const router = useRouter()
import Login from '@/components/user/Login'

let showLogin = ref(true)

let history = localStorage.getItem('search')

function search(type) {
  if(type === 'his')  tag.value = history
  if(!tag.value) window.$message.error('请输入玩家代码')
  else {
    if(type === 'cur')  localStorage.setItem('search', tag.value)
    store.router = router
    store.searchPlayer(tag.value)
  }
}

let showSpin = ref(false)

</script>

<style scoped>
@keyframes bgmove {
  from {
    background-position:0 0;
  }
  to {
    background-position:1000px -1000px;
  }
}

/*登录*/
.login {
  position: absolute;
  right: 20px;
  top: 20px;
  color: white;
}

.login-model {
  width: 70vw;
  background-color: #fff;
  padding: 20px;
}

.warp {
  width: 100vw;
  height: 100vh;
  background: rgb(42, 89, 219)  url("../assets/bg_ioc.png") repeat;
  background-size: 60%;
  animation: bgmove 80s infinite;
  color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.logo {
  width: 80%;
  display: block;
  margin: 15vh 0 2vh 14%;
}
.ws {
  min-height: 100px;
  margin-bottom: 10vh;
}
.searchWarp {
  border: 2px solid black;
  width: 80vw;
  margin: 0 auto;
  display: flex;
}
.searchInput {
  outline: none;
  border: none;
  border-right: 2px solid black;
  height: 40px;
  width: 100%;
  font-size: 30px;
  padding: 10px 0 10px 10px;
  background-color: transparent;
  color: white;
}
.searchWarp:before {
  content: '#';
  line-height: 60px;
  margin-left: 10px;
  font-size: 30px;
}
.searchBtn {
  display: inline-block;
  text-align: center;
  line-height: 60px;
  width: 110px;
  font-size: 22px;
  font-weight: bold;
}
.more {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  padding: 5vh 0;
}
.more div {
  font-size: 18px;
  display: inline-block;
  border: 2px solid black;
  padding: 10px 20px;
  margin: 10px 0;
  font-weight: bold;
}
.history {
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
}
.noticeBar {
  margin-top: 30px;
}
.spinInfo {
  color: rgb(255,255,1);
  margin-top: 20px;
  font-size: 16px;
}
</style>
