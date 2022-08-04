<template>
  <HeaderBar></HeaderBar>
  <div class="container-fluid">
    <div class="row">
      <SideBar></SideBar>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-md-4 py-sm-2">
        <!--  :class="setCollapseStyle" -->        
        <Transition name="fade-scale" mode="out-in">
          <slot />
        </Transition>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
  import HeaderBar from '@/components/layout/HeaderBar.vue';
  import SideBar from '@/components/layout/SideBar.vue';
  
  export default {
    name: 'DashboardLayout',
    components: {HeaderBar, SideBar},
  }
</script>

<style lang="scss" scoped>
</style>