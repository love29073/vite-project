<template>
  <header-bar/>
  <div class="container-fluid">
    <div class="row">
      <side-bar/>
      <main class="ms-sm-auto px-md-4 py-md-4 py-sm-2 main-content" :class="[isCollapse ? 'col-md-9 col-lg-10' : 'col-md-12 col-lg-12']">
        <router-view v-slot="{ Component, route }">
          <!-- 緩存頁面 -->
          <transition name="fade-scale" mode="out-in">
            <keep-alive>
              <component :is="Component" v-if="$route.meta.keepAlive" :key="route.path"/>
            </keep-alive>
          </transition>
          <!-- 非緩存頁面 -->
          <transition name="fade-scale" mode="out-in">
            <component :is="Component" v-if="!$route.meta.keepAlive" :key="route.path"/>
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import HeaderBar from '@/components/layout/HeaderBar.vue'
import SideBar from '@/components/layout/SideBar.vue'
import { defineComponent, computed, ref } from 'vue'
import { useThemeConfig } from '@/store/useThemeConfig'
import { storeToRefs } from 'pinia'
  
export default defineComponent({
  name: 'MainLayout',
  components: { HeaderBar, SideBar },
  setup() {
    const store = useThemeConfig()
    const { isCollapse } = storeToRefs(store)

    return{ isCollapse }
  }   
})
</script>

<style lang="scss" scoped>
  .main-content{
    height: 100vh;
    transition: all 0.45s ease;
  }
</style>