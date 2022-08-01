<template>
  <HeaderBar></HeaderBar>
  <div class="container-fluid">
    <div class="row">
      <SideBar></SideBar>
      <DpartmentView></DpartmentView>
    </div>
  </div>
</template>

<script lang="ts">
import HeaderBar from "@/components/header/HeaderBar.vue";
import SideBar from "@/components/sidebar/SideBar.vue";
import DpartmentView from "@/modules/dpartment/views/DpartmentView.vue";

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