<template>
  <n-message-provider :placement="'top-left'">
    <MessageApi />
  </n-message-provider>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="appwarp">
      <UpdateInfo/>
      <router-view></router-view>
    </div>
  </n-config-provider>
</template>

<script setup>
import MessageApi from "./components/Message-api.vue";
import { NMessageProvider, NConfigProvider } from "naive-ui";
import { useStore } from "@/store";
const store = useStore()

// 更新提示
import UpdateInfo from "@/components/UpdateInfo";
import {onMounted} from "vue";

// NaiveUI主题配置
const themeOverrides = {
  Slider: {
    fillColor: '#FFCC01',
    fillColorHover: '#FE9901',
    handleSize: '10px',
  }
}

// 设备判断
onMounted(() => {
  if(document.body.clientWidth > document.body.clientHeight) {
    window.$message.warning(
        (() => <div>本页为移动端战绩小助手，请使用竖屏访问，大屏设备请访问：<a href="https://prepan.top/bs_p">战绩小助手PC端</a></div>),
        { duration: 5000 })
  }
})
</script>


<style>
:root {
  --victory: rgb(103,194,58);
  --defeat: rgb(245,108,108);
  --draw: rgb(64,158,255);
  --mvp: rgb(255,224,88);
  --noResult: rgb(64,106,223);
  --lv11: rgb(255,204,1);
}
@keyframes bgmove {
  from {
    background-position:0 0;
  }
  to {
    background-position:1000px -1000px;
  }
}
.appwarp {
  width: 100vw;
  height: 100vh;
  background: rgb(42, 89, 219) url("./assets/bg_ioc.png") repeat;
  background-size: 60%;
  animation: bgmove 80s infinite;
  color: white;
  overflow: scroll;
}
</style>
