import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  // 定义设置和获取方法
  const getToken = () => {
    return localStorage.getItem('token')
  }
  const token = ref(getToken()) // 已经实现双向数据绑定
  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }
  const removeToken = () => {
    token.value = ''
    localStorage.removeItem('token')
  }
  // 存入用户数据
  const user = ref({}) // 存入数据是一个对象类型
  const getUser = async () => {
    const res = await getUserInfo()
    user.value = res.data.data
    localStorage.setItem('user', JSON.stringify(res.data.data))
  }
  // 用户登出
  const logout = () => {
    removeToken() // 清除token
    user.value = {} //清除userInfo
    localStorage.removeItem('user')
  }
  // 导出token和用户数据
  return {
    token,
    setToken,
    removeToken,
    getUser,
    user,
    logout
  }
})
