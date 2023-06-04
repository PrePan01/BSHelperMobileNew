<template>
  <div class="player_warp flex" @click="searchPlayer(player.tag)">
    <div class="flex">
      <div class="rank">#{{player.rank}}</div>
      <img :src="'https://prepan.top/bsAssets/avatar/' + player.icon.id + '.png'" alt="暂无头像" class="avatar">
      <div class="name">{{player.name}}</div>
    </div>
    <div class="flex">
      <img src="@/assets/trophy_cur.png" alt="" class="trophy_icon">
      <div class="trophies">{{player.trophies}}</div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "@/store";

let props = defineProps(['player'])

let { player } = props

const store = useStore()
function searchPlayer(tag) {
  store.searchPlayer(tag.split('#')[1])
}
</script>

<style scoped>
.flex {
  display: flex;
  align-items: center;
}
.player_warp {
  justify-content: space-between;
  padding: 10px;
}
.rank {
  margin-right: 10px;
  font-size: 20px;
  font-family: 'djvb', serif;
}
.avatar {
  width: 40px;
  margin-right: 6px;
}
.name {
  font-size: 20px;
  width: 40vw;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  word-break:keep-all;
}
.trophy_icon {
  width: 30px;
  margin-right: 4px;
}
.trophies {
  font-size: 22px;
  font-family: 'lato', serif;
}
</style>
