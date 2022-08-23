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
import { useRouter } from "vue-router";

const router = useRouter();
const breadList = computed(() => {
  return router.currentRoute.value.matched.filter(
    (item) => item.meta.breadcrumb !== false
  );
});
</script>
