<template>
  <HeaderBar></HeaderBar>
  <div class="container-fluid">
    <div class="row">
      <SideBar></SideBar>
      <main class="ms-sm-auto px-md-4 py-md-4 py-sm-2" :class="[isCollapse ? 'col-md-9 col-lg-10' : 'col-md-12 col-lg-12']">
        <transition name="fade-scale" mode="out-in">
          <slot />
        </transition>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import HeaderBar from '@/components/layout/HeaderBar.vue';
import SideBar from '@/components/layout/SideBar.vue';
import { computed, defineComponent } from 'vue';
import { useThemeConfig } from '@/store/themeConfig';
  
export default defineComponent({
  name: 'DashboardLayout',
  components: {HeaderBar, SideBar},
  setup() {
    const store = useThemeConfig()
    const isCollapse = computed(()=> store.isCollapse)

    return{ isCollapse }
  }   
})
</script>

<style lang="scss" scoped>
main{
  height: 100vh;
}
</style>