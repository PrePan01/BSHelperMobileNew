<template>
  <div class="warp">
    <van-dialog
        :show="showUpdateInfo"
        confirm-button-color="#2A59DB"
        confirm-button-text="知道啦"
        @confirm="closeUpdate"
    >
      <UpdateInfo/>
    </van-dialog>
    <img src="../assets/logo.png" alt="" class="logo">
    <WordSwiper class="ws"/>
    <div class="searchWarp">
      <input type="text" class="searchInput" v-model="tag">
      <span class="searchBtn" @click="search">搜索</span>
    </div>
    <div class="history" v-if="history">
      <span>是否想搜索：</span>
      <n-button type="warning" ghost @click="search">
        {{history}}
      </n-button>
    </div>
    <div class="more">
      <div @click="$router.push('/more')">直接进入</div>
      <div @click="$router.push('/update')">更新日志/公告</div>
    </div>
  </div>
</template>

<script setup>
import {NButton} from 'naive-ui'
import WordSwiper from '../components/WordSwiper'
import {ref} from "vue";
let tag = ref()
import {useStore} from "@/store";
const store = useStore()
import {useRouter} from 'vue-router'
import {Dialog} from "vant";
import UpdateInfo from "@/components/UpdateInfo";
const router = useRouter()

const VanDialog = Dialog.Component;
let showUpdateInfo = ref(true)
if(localStorage.getItem('update1022') === 'false') {
  showUpdateInfo.value = false
}
function closeUpdate() {
  showUpdateInfo.value = false
  localStorage.setItem('update1022', 'false')
}

let history = localStorage.getItem('search')

function search() {
  if(!history && tag.value === undefined) {
    window.$message.error('请输入玩家代码')
  } else {
    if(!history) {
      localStorage.setItem('search', tag.value)
    }
    store.searchPlayer(history||tag.value)
    router.push('/profile')
  }
}

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
.warp {
  width: 100vw;
  height: 100vh;
  background: rgb(42, 89, 219)  url("../assets/bg_ioc.png") repeat;
  background-size: 60%;
  animation: bgmove 80s infinite;
  color: white;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.logo {
  width: 80%;
  display: block;
  margin: 16vh 0 2vh 14%;
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
</style>
