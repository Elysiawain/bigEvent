import request from '@/utils/request'
// 在这里封装用户相关api

// 注册
export const userRegister = (data) => {
  return request.post('/api/reg', data)
}

export const userLogin = ({ username, password }) => {
  return request.post('/api/login', { username, password })
} // 解构写法
