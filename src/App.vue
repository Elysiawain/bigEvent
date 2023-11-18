<script setup>
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore() // 创建一个vue3的store实例
</script>

<template>
  <div>
    vue3项目启动！
   <test-dome></test-dome>
   <h2>token:{{ userStore.token }}</h2>
    <el-button type="success" @click="userStore.setToken('123456')">设置token</el-button>
    <el-button type="warning" @click="userStore.removeToken()">移除token</el-button>
  </div>
  <RouterView/>
</template>

<style scoped></style>
