import request from '@/utils/request'
// 在这里封装用户相关api

// 注册
export const userRegister = (data) => {
  return request.post('/api/reg', data)
}

// 登录
export const userLogin = ({ username, password }) => {
  return request.post('/api/login', { username, password })
} // 解构写法

// 获取用户的信息
// 这里用户的登录信息在token里
export const getUserInfo = () => {return request.get('/my/userinfo')}