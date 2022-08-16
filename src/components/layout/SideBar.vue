<template>
  <nav class="sidebar" :class="[isCollapse ? 'col-md-3 col-lg-2' : 'notShow']">
    <div class="user">
      <div class="title py-3">
        <div class="d-flex align-items-center">
          <el-avatar
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          />
          <div class="ps-2">
            <div class="name">王小明</div>
            <div class="greeting">大樓管理員，您好！</div>
          </div>
        </div>
      </div>
    </div>
    <el-menu :default-active="activePath">
      <sidebar-item
        v-for="(menu, key) in allRoutes"
        :key="key"
        :menu="menu"
        :path="menu.path"
      />
    </el-menu>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useThemeConfig } from "@/store/useThemeConfig";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import SidebarItem from "./SidebarItem.vue";

const store = useThemeConfig();
const { isCollapse } = storeToRefs(store);
const route = useRoute();
const router = useRouter();

const allRoutes = router.options.routes;
const activePath = computed(() => {
  return route.path;
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.el-menu {
  border-right: 0px;
}
.sidebar {
  height: 100vh;
  transition: all 0.45s ease;
  transform: translateX(0%);
  border-right: 1px solid #ddd;
  @include res(phone, to-mb) {
    border-right: 0px;
  }
  ul {
    overflow: hidden;
  }
  &.notShow {
    position: absolute;
    flex: 0 0 auto;
    width: 0%;
    transform: translateX(-100%);
    div {
      display: none;
    }
  }
  .user {
    border-bottom: 1px solid #ddd;
    .name {
      font-size: 15px;
    }
    .greeting {
      font-size: 14px;
      color: #555;
    }
  }
}
</style>
