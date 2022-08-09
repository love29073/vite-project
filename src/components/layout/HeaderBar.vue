<template>
  <header class="border-bottom sticky-top">
     <div class="container-fluid">
      <div class="row d-flex align-items-center">
        <div class="col-lg-2 col-md-3 col-sm-3 col-5 d-flex align-items-center justify-content-between logo-bar">
          <div class="logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Service_mark.svg/1280px-Service_mark.svg.png" alt="">
          </div>
          <div @click="toggleSidebar()" class="toggle-btn d-flex align-items-center">
            <svg data-v-715ce9d0="" version="1.1" viewBox="0 0 1024 1024" class="svg-icon svg-fill" style="width: 20px; height: 20px;">
              <path pid="0" d="M408 442h480a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8H408a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8zm-8 204a8 8 0 0 0 8 8h480a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8H408a8 8 0 0 0-8 8v56zm504-486H120a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8h784a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8zm0 632H120a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8h784a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8zM142.4 642.1L298.7 519a8.8 8.8 0 0 0 0-13.9L142.4 381.9a8.9 8.9 0 0 0-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"/>
            </svg>
          </div>
        </div>
        <div class="col-lg-10 col-md-9 col-sm-9 col-7 ms-sm-auto px-md-4">
          <div class="d-flex align-items-center justify-content-end">
            <el-dropdown :hide-on-click="false">
              <span class="d-flex align-items-center el-dropdown-link">
                <el-avatar :icon="UserFilled" :size="32" fit="contain" />
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>個人資料</el-dropdown-item>
                  <el-dropdown-item divided @click="logout">登出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router'
import { UserFilled } from '@element-plus/icons-vue';
import { useThemeConfig } from '@/store/themeConfig';

export default defineComponent({
  name: 'HeaderBar',
  setup() {
    const router = useRouter();
    const store = useThemeConfig();
    const { toggleSidebar } = store;

    const logout = () => {
      router.replace('/userlogin')
    }
    return { UserFilled, toggleSidebar, logout };
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
  .logo-bar{
    height: 45px;
    user-select: none;
    border-right: 1px solid #ddd;
    .logo{
      position: relative;
      display: block;
      min-width: 150px;
      max-height: 40px;
      @include res(padair, to-mb) {
        min-width: 100px;
      }
      img{        
        width: auto;
        height: 40px;
      }
    }
    .toggle-btn{
      width: 35px;
      height: 35px;
      padding: 7px;
      svg{
        fill: #333;
      }
      &:hover{
        cursor: pointer;
        svg{
          fill: #888;
        }
      }
    }
  }
</style>