<template>
  <main class="col-md-4 col-12">   
    <section class="login-wrapper p-5">
      <h2 class="title">Login</h2>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue';
import { useUserConfig } from '@/store/userConfig'

const route = useRoute();
const store = useUserConfig();    
const { getToken } = store;

onMounted(() => {
  let code:any = route.query.code;
  getToken(code);
})
</script>

<style lang="scss">
</style>