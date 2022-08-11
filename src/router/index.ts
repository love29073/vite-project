import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/components/layout/MainLayout.vue'

/**
 * 如果需要緩存頁面，在meta裡新增 keepAlive: true
 * **/

export const dashboardRoute: RouteRecordRaw = {
  path: '',
  component: MainLayout,
  redirect: '/dashboard',
  meta: { title: '首頁', breadcrumb: false, menuType: 1 },
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
    meta: { hidden: true, title: '頁面跳轉' },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/Redirect.vue'),
        meta: { hidden: true }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: '404', hidden: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登入', hidden: true }
  },
  {
    path: '/dpartment',
    name: 'dpartment',
    component: MainLayout,
    redirect: '/dpartment/index',
    meta: { title: '部門', breadcrumb: false, menuType: 2 },
    children: [
      {
        path: 'index',
        name: 'DpartmentView',
        component: () => import('@/modules/dpartment/views/DpartmentView.vue'),
        meta: { title: '部門' }
      }
    ]
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