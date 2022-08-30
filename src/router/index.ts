import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import MainLayout from "@/components/layout/MainLayout.vue";

/**
 * 如果需要緩存頁面，在meta裡新增 keepAlive: true
 *
 * menuType
 * 1 一般為首頁 / -> 只顯示第一個子項
 * 2 為無子選單的選單項 /system -> /system/one 無上下級
 * 3 正常選單 /system -> /system/first | /system/second 有上下級
 *
 * roles: ['admin', 'editor']
 * **/

export const dashboardRoute: RouteRecordRaw = {
  path: "",
  component: MainLayout,
  redirect: "/dashboard",
  meta: { title: "首頁", menuType: 1, icon: "HomeFilled" },
  children: [
    {
      path: "dashboard",
      name: "Dashboard",
      component: () => import("@/views/Dashboard.vue"),
      meta: { title: "首頁", breadcrumb: false },
    },
  ],
};

const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: MainLayout,
    meta: { hidden: true, title: "頁面跳轉" },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/Redirect.vue"),
        meta: { hidden: true },
      },
    ],
  },
  {
    path: "/404",
    component: () => import("@/views/NotFound.vue"),
    meta: { title: "404", hidden: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    meta: { hidden: true },
  },
];

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: { title: "登入", hidden: true },
  },
  {
    path: "/process",
    name: "LoginOAuth",
    component: () => import("@/views/LoginOAuth.vue"),
    meta: { title: "登入中...", hidden: true },
  },
  {
    path: "/dpartment",
    name: "dpartment",
    component: MainLayout,
    meta: { title: "部門資訊", menuType: 3 },
    children: [
      {
        path: "info",
        name: "DepartmentView",
        component: () => import("@/modules/dpartment/views/DepartmentView.vue"),
        meta: { title: "部門總覽" },
      },
    ],
  },
  {
    path: "/test",
    component: MainLayout,
    redirect: "/test/index",
    meta: { title: "測試yoyoyoyo", breadcrumb: false, menuType: 2 },
    children: [
      {
        path: "index",
        name: "DepartmentView9999",
        component: () => import("@/modules/dpartment/views/DepartmentView.vue"),
        meta: { title: "測試yoyoyoyo" },
      },
    ],
  },
];

function markRawWrap(routes: RouteRecordRaw[]) {
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      markRawWrap(route.children);
    }
  });
  return routes;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: markRawWrap([dashboardRoute, ...routes, ...constantRoutes]),
});

export default router;
