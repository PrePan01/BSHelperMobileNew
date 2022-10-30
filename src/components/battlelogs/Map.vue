<template>
  <div class="f">
    <img :src="'https://prepan.top/bsAssets/modes/'+ modes.indexOf(props.event.mode) + '.png'" alt="" class="mode-icon">
    <span class="map">{{MTrans(props.event.map)}}</span>
  </div>
</template>

<script setup>
import MTrans from '../../utils/MapTranslate'
let props = defineProps(['event'])

import {getCurrentInstance} from "vue";
let modes = getCurrentInstance()?.appContext.config.globalProperties.$modes

</script>

<style scoped>
.f {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.mode-icon {
  height: 40px;
  margin-right: 2px;
}

.map {
  width: 25vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
  word-break:keep-all;
  font-size: 16px;
}
</style>
