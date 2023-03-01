<template>
  <div class="warp">
    <h2 @click="$router.push('/events')">
      <img src="../assets/flag.png" alt="" class="h-icon">
      天梯活动
    </h2>
    <h2 @click="toSkin">
      <img src="../assets/diaopai.png" alt="" class="h-icon">
      皮肤图鉴
      <span class="skin-d" @click="$router.push('/skins')" :style="{'right': to_skin?'0':'-240px'}">全部皮肤</span>
      <span class="skin-d" @click="$router.push('/assort_skins')" :style="{'right': to_skin?'0':'-240px'}">分类查看</span>
    </h2>
    <h2 @click="$router.push('/brawlerData')">
      <img src="../assets/bdata_icon.png" alt="" class="h-icon">
      英雄数据
    </h2>
    <h2 @click="$router.push('/club')">
      <img src="../assets/house.png" alt="" class="h-icon">
      战队查询
    </h2>
    <h2 @click="$router.push('/join')">
      <img src="../assets/club_icon.png" alt="" class="h-icon" style="width: 17vw">
      加入我们
    </h2>
    <div class="warp-b">
      <!--<h3 @click="openNewPage('https://www.tapechat.net/uu/6CL6M5/QW3O5XXP?uid=5779398')">问题反馈</h3>-->
      <h3 @click="openNewPage('https://wj.qq.com/s2/11777083/4b84/')">问题反馈</h3>
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
import {ref} from "vue";

function openNewPage(url) {
  window.open(url,'_blank');
}

function demo() {
  window.$message.info('即将上线！')
}

let to_skin = ref(false)
function toSkin() {
  to_skin.value = !to_skin.value
}

</script>

<style scoped>
.warp {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 10vh;
}
.warp h2,h3 {
  width: 65vw;
  padding-right: 15vw;
  height: 15vh;
  line-height: 15vh;
  font-size: 38px;
  border: 3px solid black;
  box-shadow: 3px 3px black;
  text-shadow: 3px 3px 1px black;
  color: white;
  text-align: right;
  transform: skew(-3deg);
  letter-spacing: 6px;
  margin: 2vh 1vw;
  position: relative;
  overflow: hidden;
}
.warp h3 {
  height: 12vw;
  letter-spacing: 2px;
  line-height: 12vw;
  width: 40vw;
  padding-right: 0;
  text-align: center;
  font-size: 20px;
  border: 2px solid black;
  box-shadow: 2px 2px black;
}
.h-icon {
  position: absolute;
  left: 6%;
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

.skin-d {
  font-size: 24px;
  letter-spacing: 3px;
  position: absolute;
  right: -100px;
  height: 50%;
  line-height: 7.5vh;
  transition: all .3s;
  padding:0 50px;
  background: linear-gradient(to right,rgba(217,194,162, 0.4), rgba(203,148,44, 0.7));
  text-shadow: 1px 1px 1px black;
}

.skin-d:last-child {
  top: 50%;
  border-top: 2px solid white;
}
</style>
