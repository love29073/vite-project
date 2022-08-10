<template>
  <main class="col-md-4 col-12">   
    <section class="login-wrapper p-5">
      <h2 class="title">Login</h2>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useRoute,useRouter } from 'vue-router'
import { onMounted, watch } from 'vue';
import { useUserConfig } from '@/store/userConfig';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const store = useUserConfig();    
const { getToken } = store;
const { loginSuccess } = storeToRefs(store);

onMounted(() => {
  let code:any = route.query.code;
  getToken(code);
})

watch(loginSuccess, (newValue, oldValue)=> {
  if(newValue == true){
    ElMessage({
      message: '登入成功。',
      type: 'success',
    })
    router.replace('/');
  }
})
</script>

<style lang="scss">
</style>