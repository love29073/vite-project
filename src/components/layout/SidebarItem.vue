<template v-if="!props.menu.meta?.hidden">
  <el-sub-menu
    v-if="props.menu.meta?.menuType === 3"
    :index="menuPath"
    key="second-floor"
  >
    <template #title>
      <el-icon>
        <component :is="props.menu.meta?.icon"></component>
      </el-icon>
      <span>{{ props.menu.meta?.title }}</span>
    </template>
    <template v-for="children in props.menu.children" :key="children.path">
      <sidebar-item
        v-if="!children.meta?.hidden"
        :menu="children"
        :path="`${menuPath}/${children.path}`"
      />
    </template>
  </el-sub-menu>
  <router-link v-else :to="menuPath" key="normal-floor">
    <el-menu-item :index="menuPath" v-if="!props.menu.meta?.hidden">
      <template #title>
        <el-icon
          v-if="
            props.menu.meta?.menuType &&
            props.menu.meta?.menuType !== 3 &&
            props.menu.children
          "
        >
          <component :is="props.menu.meta?.icon"></component>
        </el-icon>
        <span>{{
          props.menu.meta?.menuType === 1
            ? props.menu.children && props.menu.children[0].meta?.title
            : props.menu.meta?.title
        }}</span>
      </template>
    </el-menu-item>
  </router-link>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { PropType } from "vue";
import type { RouteRecordRaw } from "vue-router";

const props = defineProps({
  menu: {
    type: Object as PropType<RouteRecordRaw>,
    required: true,
  },
  path: {
    type: String,
    default: "",
    required: true,
  },
});

const menuPath = computed(() => {
  if ([1, 2].includes(props.menu.meta?.menuType as number)) {
    return (
      (props.path === "/dashboard" ? props.path : props.path + "/") +
      props.menu.children![0].path
    );
  }
  return props.path;
});
</script>

<style lang="scss" scoped>
.el-menu-item,
.el-sub-menu .el-icon {
  color: #304156;
}
.el-menu-item .el-icon {
  margin-bottom: -1.5px;
}
.el-sub-menu__title {
  color: #304156;
}
.el-menu-item.is-active {
  background-color: var(--el-menu-hover-bg-color);
}
</style>
