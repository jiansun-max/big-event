import 'vue/dist/vue.esm-bundler'
import {
  createRouter,
  createWebHistory
  // createWebHashHistory
} from 'vue-router'

import { useUserStore } from '@/stores'

// 'vue/dist/vue.esm-bundler' 才可解析template配置项
// const indexComponent = {
//   template: '<h1>I am index</h1>'
// }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      // 异步组件引入法
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      // 路由重定向
      redirect: '/article/manage',
      children: [
        {
          path: 'article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: 'article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },

        {
          path: 'user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: 'user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: 'user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  if (to.path !== '/login' && !userStore.token) {
    // 跳转中断，返回到from
    // return false

    // 重定向
    return '/login'
  }
})

export default router
