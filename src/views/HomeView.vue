<template>
  <HeaderBar></HeaderBar>
  <div class="container-fluid">
    <div class="row">
      <SideBar></SideBar>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-md-4 py-sm-2" :class="setCollapseStyle">
        <DpartmentView></DpartmentView>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import {ref} from 'vue';
import HeaderBar from '@/components/header/HeaderBar.vue';
import SideBar from '@/components/sidebar/SideBar.vue';
import DpartmentView from '@/modules/dpartment/views/DpartmentView.vue';

export default{
  name: 'HomeView',
  components: {HeaderBar, SideBar, DpartmentView},

  setup(){

    return{  }
  }
}
</script>

<style lang="scss">
  .content{
    width: calc(100% - 280px);
  }
</style>