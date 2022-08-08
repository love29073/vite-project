<template>
  <main class="col-md-4 col-12">   
    <section class="login-wrapper p-5">
      <h2 class="title">Login</h2>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useUserConfig } from '@/store/userConfig'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue';
import axios from 'axios';

const user = useUserConfig();
const route = useRoute();
const code:any = route.query.code;

onMounted(() => {
  getToken();
})

sessionStorage.setItem("code", code)

const getToken = () => {
  let formData = new FormData();
  formData.append('grant_type', 'authorization_code');
  formData.append('client_id', user.client_id);
  formData.append('code', code);
  formData.append('code_verifier', user.codeVerifier);
  formData.append('redirect_uri', user.redirect_uri);


  axios.post(`/oauth2/token/`, formData, {headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
  .then((res) => {
    console.log(res)
  })
  .catch((error) => {
      console.log(error, '失敗');
  })
}

</script>

<style lang="scss">
</style>