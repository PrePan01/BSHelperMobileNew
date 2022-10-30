<template>
  <div class="warp">
    <h2 @click="$router.push('/events')">
      <img src="../assets/flag.png" alt="" class="h-icon">
      天梯活动
    </h2>
    <h2 @click="$router.push('/club')">
      <img src="../assets/house.png" alt="" class="h-icon">
      战队查询
    </h2>
    <h2 @click="$router.push('/skins')">
      <img src="../assets/diaopai.png" alt="" class="h-icon">
      皮肤图鉴
    </h2>
    <h2 @click="$router.push('/join')">
      <img src="../assets/club_icon.png" alt="" class="h-icon" style="width: 17vw">
      加入我们
    </h2>
    <div class="warp-b">
      <h3 @click="openNewPage('https://www.tapechat.net/uu/6CL6M5/QW3O5XXP?uid=5779398')">问题反馈</h3>
      <h3 @click="openNewPage('https://www.wolai.com/dcq38esZ4mkBvuKPMnQMKz')">更新日志</h3>
      <n-popconfirm :positive-text="null" :negative-text="null" :show-icon="false" style="box-shadow: 3px 3px black">
        <template #trigger>
          <h3>
            支持赞助
          </h3>
        </template>
        <div class="support">
          <h4 style="width: 200px;margin-right: 20px">服务器费用是一笔不小的开销，感谢每一位赞助的朋友！</h4>
          <img src="@/assets/alipay.png" alt="" style="width: 190px;display: block">
        </div>
      </n-popconfirm>
      <h3 @click="openNewPage('http://prepan.top/download/latest.apk')">游戏下载</h3>
    </div>
  </div>

  <BottomNav></BottomNav>
</template>

<script setup>
import BottomNav from '../components/BottomNav'
import {NPopconfirm} from 'naive-ui'

function openNewPage(url) {
  window.open(url,'_blank');
}
</script>

<style scoped>
.warp {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  height: 95vh;
}
.warp h2,h3 {
  width: 80vw;
  height: 14vh;
  line-height: 14vh;
  font-size: 38px;
  border: 3px solid black;
  box-shadow: 3px 3px black;
  text-shadow: 2px 2px black;
  color: white;
  text-align: center;
  transform: skew(-3deg);
  letter-spacing: 6px;
  margin-bottom: 3vw;
  position: relative;
}
.warp h3 {
  height: 12vw;
  letter-spacing: 2px;
  line-height: 12vw;
  width: 40vw;
  font-size: 20px;
  border: 2px solid black;
  box-shadow: 2px 2px black;
}
.h-icon {
  position: absolute;
  left: 5%;
  top: 50%;
  opacity: 0.8;
  z-index: -1;
  transform: translateY(-50%);
  width: 20vw;
}
.warp-b {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}
.support {
  display: flex;
  flex-direction: column;
}
</style>
