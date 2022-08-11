<template>
  <HeaderBar></HeaderBar>
  <div class="container-fluid">
    <div class="row">
      <SideBar></SideBar>
      <main class="ms-sm-auto px-md-4 py-md-4 py-sm-2" :class="[isCollapse ? 'col-md-9 col-lg-10' : 'col-md-12 col-lg-12']">
        <RouterView v-slot="{ Component, route }">
          <!-- 緩存頁面 -->
          <Transition name="fade-scale" mode="out-in">
            <keep-alive>
              <component :is="Component" v-if="$route.meta.keepAlive" :key="route.path"/>
            </keep-alive>
          </Transition>
          <!-- 非緩存頁面 -->
          <Transition name="fade-scale" mode="out-in">
            <component :is="Component" v-if="!$route.meta.keepAlive" :key="route.path"/>
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<script  lang="ts">
import HeaderBar from '@/components/layout/HeaderBar.vue'
import SideBar from '@/components/layout/SideBar.vue'
import { defineComponent, computed, ref } from 'vue'
import { useThemeConfig } from '@/store/themeConfig'
import { storeToRefs } from 'pinia'
  
export default defineComponent({
  name: 'MainLayout',
  components: {HeaderBar, SideBar},
  setup() {
    const store = useThemeConfig()
    const { isCollapse } = storeToRefs(store)

    return{ isCollapse }
  }   
})
</script>

<style lang="scss" scoped>
  main{
    height: 100vh;
  }
</style>