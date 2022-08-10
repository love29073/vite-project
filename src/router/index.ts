import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/components/layout/MainLayout.vue'

export const dashboardRoute: RouteRecordRaw = {
  path: '/',
  component: MainLayout,
  redirect: '/dashboard',
  meta: { breadcrumb: false },
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: { title: '首頁' }
    }
  ]
}

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: MainLayout,
    meta: { hidden: true, title: '頁面跳轉', hiddenTab: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/Redirect.vue')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/NotFound.vue'),
    meta: { hidden: true, title: '404' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: { hidden: true },
  }
]

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { hidden: true, title: '登入' }
  },
  {
    path: '/dpartment',
    name: 'Modal',
    component: MainLayout,
    redirect: '/dpartment/index',
    meta: { breadcrumb: false },
    children: [
      {
        path: 'index',
        name: 'DpartmentView',
        component: () => import('@/modules/dpartment/views/DpartmentView.vue'),
        meta: { title: '部門', askBeforeCloseTab: true }
      }
    ]
  },
  {
    path: '/https://github.com/1esse/vue-clownfish-admin-elem',
    component: undefined,
    redirect: 'https://github.com/1esse/vue-clownfish-admin-elem',
    meta: { title: 'github', external: true }
  }
]

function markRawWrap(routes: RouteRecordRaw[]) {
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      markRawWrap(route.children)
    }
  })
  return routes
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: markRawWrap([dashboardRoute, ...routes, ...constantRoutes])
})

export default router