<template>
  <HeaderBar></HeaderBar>
  <div class="container-fluid">
    <div class="row">
      <SideBar></SideBar>
      <main class="ms-sm-auto px-md-4 py-md-4 py-sm-2" :class="[isCollapse ? 'col-md-9 col-lg-10' : 'col-md-12 col-lg-12']">
          <!-- <transition name="fade-scale" mode="out-in">
            <slot></slot>
          </transition> -->
          <RouterView v-slot="{ Component, route }">
          <Transition name="fade-scale" mode="out-in">
            <!-- 
              vite的hmr和keepalive组件冲突会导致vite热更新后路由失效，
              https://github.com/vuejs/core/pull/5165
              开发过程注释掉keepalive
            -->
            <!-- <KeepAlive :include="getKeepAlivePages"> -->
            <component :is="Component" :key="route.path" />
            <!-- </KeepAlive> -->
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<script  lang="ts">
import HeaderBar from '@/components/layout/HeaderBar.vue'
import SideBar from '@/components/layout/SideBar.vue'
import { defineComponent } from 'vue'
import { useThemeConfig } from '@/store/themeConfig'
import { storeToRefs } from 'pinia'
  
export default defineComponent({
  name: 'MainLayout',
  components: {HeaderBar, SideBar},
  setup() {
    const store = useThemeConfig();
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