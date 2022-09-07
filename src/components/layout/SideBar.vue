<template>
  <nav
    class="sidebar p-0"
    :class="[isCollapse ? 'col-md-3 col-lg-2 darkBg' : 'notShow']"
  >
    <div class="user">
      <div class="title py-3 px-4">
        <div class="name">
          <el-icon class="me-1"><UserFilled /></el-icon>王志明
        </div>
        <div class="greeting">大樓管理員，您好！</div>
      </div>
    </div>
    <el-scrollbar>
      <el-menu
        :default-active="activePath"
        background-color="#304156"
        active-text-color="#ffd04b"
        text-color="#bfcbd9"
      >
        <sidebar-item
          v-for="(menu, key) in allRoutes"
          :key="key"
          :menu="menu"
          :path="menu.path"
        />
      </el-menu>
    </el-scrollbar>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
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
.el-menu {
  border-right: 0px;
}
.sidebar {
  height: calc(100vh - 46px);
  overflow-y: hidden;
  transition: all 0.45s ease;
  transform: translateX(0%);
  border-right: 1px solid #ddd;
  background-color: $secondColor;
  @include res(phone, to-mb) {
    border-right: 0px;
  }
  ul {
    padding-bottom: 90px;
    background-color: $secondColor;
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
    .title {
      background-color: #394a5f;
    }
    .name {
      display: flex;
      align-items: center;
      font-size: 15px;
      color: $obviousTextColor;
      letter-spacing: 0.3px;
    }
    .greeting {
      font-size: 14px;
      color: $greyColor;
      letter-spacing: 0.3px;
    }
  }
  &.darkBg {
    .user {
      border-bottom: 0px;
    }
  }
}
</style>
