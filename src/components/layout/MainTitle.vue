<template>
  <template v-for="(item, index) in breadList">
    <h4
      v-if="item.name && item.meta.menuType !== 3"
      :key="index"
      class="title px-md-1 mb-3"
    >
      {{ item.meta.title }}
    </h4>
  </template>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const breadList = computed(() => {
  return router.currentRoute.value.matched.filter(
    (item) => item.meta.breadcrumb !== false && route.path === item.path
  );
});
</script>

<style lang="scss" scoped>
.title {
  color: #439aeb;
}
</style>
