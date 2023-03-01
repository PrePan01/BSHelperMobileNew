<template>
  <TopNav :to="'/more'" :title="'皮肤图鉴 - 分类'"/>
  <AssortSkins
      v-for="(i, index) in assort_title"
      @click="$router.push(`/assort_skins/detail?i=${index}`)"
      :title="i[0]"
      :color="i[1]"
      :cover="i[2]"
      :key="i[2]"
  />
</template>

<script setup>
import AssortSkins from '@/components/skin/AssortTitle'
import assort_title from '@/assets/skins/assortTitle.json'
import TopNav from '@/components/TopNav'

</script>

<style scoped>

</style>
