import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 定义设置和获取方法
  const getToken = () => {
    return localStorage.getItem('token')
  }
  const token = ref(getToken())// 已经实现双向数据绑定
  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }
  const removeToken = () => {
    token.value = ''
    localStorage.removeItem('token')
  }
  // 导出token
  return{
    token,
    setToken,
    removeToken
  }
})
