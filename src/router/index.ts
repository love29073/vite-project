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
    path: "/base",
    name: "base",
    component: MainLayout,
    meta: { title: "基本資料管理", menuType: 3, icon: "Setting" },
    children: [
      {
        path: "building",
        name: "BuildingManage",
        component: () => import("@/modules/demo/base/BuildingManage.vue"),
        meta: { title: "大樓資產管理" },
      },
      {
        path: "mechatronics",
        name: "MechatronicsManage",
        component: () => import("@/modules/demo/base/MechatronicsManage.vue"),
        meta: { title: "機電資產管理" },
      },
      {
        path: "firm",
        name: "FirmManage",
        component: () => import("@/modules/demo/base/FirmManage.vue"),
        meta: { title: "包商管理" },
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: MainLayout,
    meta: { title: "使用者管理", menuType: 3, icon: "User" },
    children: [
      {
        path: "account",
        name: "AccountManage",
        component: () => import("@/modules/demo/user/AccountManage.vue"),
        meta: { title: "帳號管理" },
      },
      {
        path: "role",
        name: "RoleManage",
        component: () => import("@/modules/demo/user/RoleManage.vue"),
        meta: { title: "角色管理" },
      },
      {
        path: "permission",
        name: "PermissionManage",
        component: () => import("@/modules/demo/user/PermissionManage.vue"),
        meta: { title: "權限管理" },
      },
    ],
  },
  {
    path: "/building",
    name: "building",
    component: MainLayout,
    meta: { title: "大樓管理", menuType: 3, icon: "OfficeBuilding" },
    children: [
      {
        path: "account",
        name: "AdministratorSetting",
        component: () =>
          import("@/modules/demo/building/AdministratorSetting.vue"),
        meta: { title: "大樓管理員設定" },
      },
    ],
  },
  {
    path: "/mechatronics",
    name: "mechatronics",
    component: MainLayout,
    meta: { title: "機電管理", menuType: 3, icon: "Discount" },
    children: [
      {
        path: "mechatronics-record",
        name: "MechatronicsRecord",
        component: () =>
          import("@/modules/demo/mechatronics/MechatronicsRecord.vue"),
        meta: { title: "通報紀錄", innerPage: true },
        children: [
          {
            path: "/mechatronics/add-inspection",
            name: "AddInspection",
            component: () =>
              import("@/modules/demo/mechatronics/AddInspection.vue"),
            meta: { title: "建立巡檢點", hidden: true },
          },
        ],
      },
      {
        path: "dispatch-record",
        name: "DispatchRecord",
        component: () =>
          import("@/modules/demo/mechatronics/DispatchRecord.vue"),
        meta: { title: "派工紀錄" },
      },
      {
        path: "inspection-plan",
        name: "InspectionPlan",
        component: () =>
          import("@/modules/demo/mechatronics/InspectionPlan.vue"),
        meta: { title: "巡檢計劃" },
      },
    ],
  },
  {
    path: "/security",
    name: "security",
    component: MainLayout,
    meta: { title: "保全管理", menuType: 3, icon: "Avatar" },
    children: [
      {
        path: "security-record",
        name: "SecurityRecord",
        component: () => import("@/modules/demo/security/SecurityRecord.vue"),
        meta: { title: "通報紀錄" },
      },
    ],
  },
  {
    path: "/sanitary",
    name: "sanitary",
    component: MainLayout,
    meta: { title: "清潔勞務管理", menuType: 3, icon: "TakeawayBox" },
    children: [
      {
        path: "sanitary-record",
        name: "SanitaryRecord",
        component: () => import("@/modules/demo/sanitary/SanitaryRecord.vue"),
        meta: { title: "通報紀錄" },
      },
    ],
  },
  {
    path: "/repair",
    name: "repair",
    component: MainLayout,
    meta: { title: "營建修繕管理", menuType: 3, icon: "FirstAidKit" },
    children: [
      {
        path: "repair-record",
        name: "RepairRecord",
        component: () => import("@/modules/demo/repair/RepairRecord.vue"),
        meta: { title: "通報紀錄" },
      },
    ],
  },
  {
    path: "/report",
    name: "report",
    component: MainLayout,
    meta: {
      title: "統計報表",
      breadcrumb: false,
      menuType: 2,
      icon: "Coin",
    },
    children: [
      {
        path: "report-form",
        name: "ReportForm",
        component: () => import("@/modules/demo/report/ReportForm.vue"),
        meta: { title: "統計報表" },
      },
    ],
  },
  {
    path: "/message",
    name: "message",
    component: MainLayout,
    meta: {
      title: "訊息管理",
      breadcrumb: false,
      menuType: 2,
      icon: "Message",
    },
    children: [
      {
        path: "message-form",
        name: "MessageManage",
        component: () => import("@/modules/demo/message/MessageManage.vue"),
        meta: { title: "訊息管理" },
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
