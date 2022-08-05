<template>
    <nav class="sidebar collapse" :class="[isCollapse ? 'd-md-block col-md-3 col-lg-2' : 'd-md-none']">
      <div class="user">
        <div class="title py-3">
          <div class="d-flex align-items-center">
            <el-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
            <div class="ps-2">
              <div class="name">王小明</div>
              <div class="greeting">大樓管理員，您好！</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10">
        <router-link
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          to="/">首頁</router-link>
      </div>
      <div class="mt-10">
        <router-link
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          to="/employee">GENERAL</router-link>
      </div>
    </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useThemeConfig } from '@/store/themeConfig';

export default defineComponent({
  name: 'SideBar',
  setup() {
    const store = useThemeConfig()
    const isCollapse = computed(()=> store.isCollapse)

    return{ isCollapse }
  }    
})
</script>

<style lang="scss" scoped>
  .sidebar{
    height: 100vh;
    border-right: 1px solid #ddd;
    .user{
      border-bottom: 1px solid #ddd;
      .name{
        font-size: 15px;
      }
      .greeting{
        font-size: 14px;
        color: #555;
      }
    }
  }
</style>