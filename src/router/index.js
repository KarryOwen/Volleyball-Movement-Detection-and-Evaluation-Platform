import { createRouter, createWebHistory,  } from 'vue-router';
import Home from '@/views/home/homeIndex.vue'
import Login from '@/views/login/loginIndex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    }
  ], parseQuery(query) {
    // 防止解析blob URL为路由
    if (query.startsWith('blob:')) {
      return {}
    }
    return Object.fromEntries(new URLSearchParams(query))
  }
})

export default router
