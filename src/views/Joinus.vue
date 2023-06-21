<template>
  <TopNav  :to="'/more'" :title="'加入我们'"></TopNav>
  <img src="../assets/joinUs.png" alt="" style="width: 100vw;">


  <div style="text-align: center">
    <Button type="primary" block class="joinBtn" @click="joinGlobal">加入国际服战队</Button>
    <Button type="primary" block class="joinBtn" @click="joinCn1">加入国服一队</Button>
    <Button type="primary" block class="joinBtn" @click="joinCn2">加入国服二队</Button>
    <Button type="primary" block class="joinBtn joinGroupBtn" data-clipboard-text = '957189136' @click="copyGroupNum">复制群号</Button>
  </div>
</template>

<script setup>
import {Button} from 'vant'
import TopNav from '@/components/TopNav'

function copyGroupNum(){
  new Clipboard('.joinGroupBtn')
  window.$message.info('复制成功')
}
function joinGlobal(){
  window.open('https://link.brawlstars.com/invite/band/cn?tag=RQV28LYC&token=ntnymehk')
}
function joinCn1(){
  window.$message.info('暂时满人，请先加群')
}
function joinCn2(){
  window.open('https://link.brawlstars.cn/invite/band/cn?tag=RGYR2C2&token=p2jfe4w9&platform=android&pub=yoozoo&bundle=com.youzu.bs')
}
</script>

<style scoped>

.joinBtn{
  width: 80vw;
  margin: 5vh auto;

}
</style>
