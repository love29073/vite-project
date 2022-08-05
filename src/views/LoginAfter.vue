<template>
  <main class="col-md-4 col-12">   
    <section class="login-wrapper p-5">
      <h2 class="title">Login</h2>
      {{code}}
    </section>
  </main>
</template>

<script setup lang="ts">
import { useUserConfig } from '@/store/userConfig'
import { useRoute } from 'vue-router'

const user = useUserConfig();
const route = useRoute();
const code = route.query.code;
console.log(route.query)
</script>

<style lang="scss">
</style>