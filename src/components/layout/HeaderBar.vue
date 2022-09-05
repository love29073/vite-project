<template>
  <header class="border-bottom sticky-top">
    <div class="container-fluid">
      <div class="row d-flex align-items-center">
        <div
          class="col-lg-2 col-md-3 col-sm-3 col-5 d-flex align-items-center justify-content-between logo-bar"
        >
          <div class="logo">
            <img src="@/assets/img/example.png" alt="logo" />
          </div>
          <div
            @click="toggleSidebar()"
            class="toggle-btn d-flex align-items-center"
          >
            <svg
              data-v-715ce9d0=""
              version="1.1"
              viewBox="0 0 1024 1024"
              class="svg-icon svg-fill"
              style="width: 20px; height: 20px"
            >
              <path
                pid="0"
                d="M408 442h480a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8H408a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8zm-8 204a8 8 0 0 0 8 8h480a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8H408a8 8 0 0 0-8 8v56zm504-486H120a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8h784a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8zm0 632H120a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8h784a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8zM142.4 642.1L298.7 519a8.8 8.8 0 0 0 0-13.9L142.4 381.9a8.9 8.9 0 0 0-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
              />
            </svg>
          </div>
        </div>
        <div
          class="col-lg-10 col-md-9 col-sm-9 col-7 ms-sm-auto px-md-4 d-flex align-items-center justify-content-between"
        >
          <breadcrumb-item />
          <el-dropdown :hide-on-click="false">
            <span class="d-flex align-items-center el-dropdown-link">
              <el-avatar :icon="UserFilled" :size="32" fit="contain" />
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>個人資料</el-dropdown-item>
                <el-dropdown-item divided>
                  <a :href="logoutUrl" @click="logout">登出</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { UserFilled } from "@element-plus/icons-vue";
import { useThemeConfig } from "@/store/useThemeConfig";
import { useUserConfig } from "@/store/useUserConfig";
import { storeToRefs } from "pinia";
import BreadcrumbItem from "./BreadcrumbItem.vue";

const storeTheme = useThemeConfig();
const storUser = useUserConfig();
const { toggleSidebar } = storeTheme;
const { logoutUrl } = storeToRefs(storUser);

// console.log(logoutUrl.value);

const logout = () => {
  localStorage.setItem("isAuthenticated", "false");
};
</script>

<style lang="scss" scoped>
.logo-bar {
  height: 45px;
  user-select: none;
  border-right: 1px solid #ddd;
  .logo {
    position: relative;
    display: block;
    min-width: 150px;
    max-height: 40px;
    @include res(padair, to-mb) {
      min-width: 100px;
    }
    img {
      width: auto;
      height: 25px;
    }
  }
  .toggle-btn {
    width: 35px;
    height: 35px;
    padding: 7px;
    svg {
      fill: #333;
    }
    &:hover {
      cursor: pointer;
      svg {
        fill: #888;
      }
    }
  }
}
</style>
