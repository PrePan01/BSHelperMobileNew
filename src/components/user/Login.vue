<template>
  <div class="login-warp">
    <div class="login-title">
      <h1>登录</h1>
      <n-button size="large" type="success">注册</n-button>
    </div>
    <div class="login-main">
      <n-input v-model:value="username" type="text" placeholder="用户名或邮箱" />
      <n-input v-model:value="password" type="password" placeholder="密码" />
      <n-button type="info" ghost size="large" class="login-main-btn" @click="login">登录</n-button>
      <n-button size="large" class="login-main-btn">忘记密码</n-button>
    </div>
  </div>
</template>

<script setup>
import {NButton, NInput} from 'naive-ui'
import {ref} from "vue";

let username = ref(null)
let password = ref(null)

</script>

<style scoped>
.login-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.login-main {
  margin-top: 20px;
  text-align: center;
}
.login-main * {
  margin: 10px 0;
}
.login-main-btn {
  margin: 10px 10px 0 10px;
}
</style>
