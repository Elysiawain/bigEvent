import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/index.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      redirect: 'article/channel', // 重定向路由
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})
// 配置路由全局导航
// 默认放行，当返回值为true和undefined时也会放行
router.beforeEach((to) => {
  // 检查是否存在token
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login' // 返回对应的地址
})
export default router
