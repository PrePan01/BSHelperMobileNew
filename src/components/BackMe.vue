<template>
 <div class="backme-warp" v-if="show" @click="s">
   返回自己 >
 </div>
</template>

<script setup>
import {useStore} from "@/store";
import {onMounted, ref} from "vue";
const store = useStore()
import {useRouter} from "vue-router";
const router = useRouter()

let cur = store.profile.tag
let his = localStorage.getItem('search')

let show = ref(true)

function s() {
  store.searchPlayer(his)
}

onMounted(() => {

  if(!cur || cur === '#' + his) {
    show.value = false
  }
})

</script>

<style scoped>
.backme-warp {
  display: inline-block;
  background-color: rgba(255,255,255,0.7);
  padding: 6px 10px;
  color: black;
}
</style>
