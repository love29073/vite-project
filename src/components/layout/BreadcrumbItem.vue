<template>
  <el-breadcrumb>
    <el-breadcrumb-item :to="{ path: '/dashboard' }">首頁</el-breadcrumb-item>
    <template v-for="(item, index) in breadList">
      <el-breadcrumb-item
        v-if="item.name && item.meta.menuType === 3"
        :key="index"
        class="menuHasNoLink"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
      <el-breadcrumb-item
        v-if="item.name && item.meta.menuType !== 3"
        :key="index"
        :to="item.path"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  useRoute,
  useRouter,
  type RouteLocationNormalizedLoaded,
  type RouteRecordNormalized,
} from "vue-router";

const router = useRouter();
const route = useRoute();
const breadList = computed(() => {
  if (route.meta.resolvePath) {
    let mathcedRouted: Array<
      RouteRecordNormalized | RouteLocationNormalizedLoaded
    > = [route];
    let routeMap = new Map(
      router.getRoutes().map((route) => [route.path, route])
    );
    let currentPath = router.currentRoute.value.path;
    while (currentPath.lastIndexOf("/") !== -1) {
      currentPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
      if (routeMap.has(currentPath)) {
        mathcedRouted.push(routeMap.get(currentPath) as RouteRecordNormalized);
      }
    }
    return mathcedRouted.reverse();
  }

  return router.currentRoute.value.matched.filter(
    (item) => item.meta.breadcrumb !== false
  );
});
</script>
