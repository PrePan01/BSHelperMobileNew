<template>
  <div class="modeResult" :style="{backgroundColor: `var(--${result})`}">
    <img :src="'https://prepan.top/bsAssets/modes/'+ mode + '.png'" alt="">
  </div>
</template>

<script setup>
let props = defineProps(['mode', 'result'])
let { mode, result } = props

</script>

<style scoped>
.modeResult {
  display: flex;
  align-items: center;
  justify-content: center;
}
.modeResult img{
  width: 24px;
}
</style>
