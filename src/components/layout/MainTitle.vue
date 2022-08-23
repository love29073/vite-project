<template>
  <el-breadcrumb>
    <template v-for="(item, index) in breadList">
      <h4
        v-if="item.name && item.meta.menuType !== 3"
        :key="index"
        class="px-md-2 title"
      >
        {{ item.meta.title }}
      </h4>
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

<style lang="scss" scoped>
.title {
  color: #439aeb;
}
</style>
