<template>
  <div class="container-fluid">
    <div class="row p-5 d-flex justify-content-center align-content-center">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">  
  export default {
    name: 'EmptyLayout'      
  }
</script>