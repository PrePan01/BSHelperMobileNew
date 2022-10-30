<template>
  <div class="empty-warp">
    <img src="../assets/empty.png" alt="" class="pic">
    <h2>暂无数据，快搜索一个吧！</h2>
    <span class="back" @click="$router.push('/')">返回首页</span>
  </div>
</template>

<script>

</script>

<style scoped>
.empty-warp {
  margin-top: 20vh;
  text-align: center;
}
.pic {
  width: 60vw;
}
.back {
  display: inline-block;
  padding: 10px;
  margin-top: 20px;
  font-size: 16px;
  border: 1px solid black;
}
</style>
