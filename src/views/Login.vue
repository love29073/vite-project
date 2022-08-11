<template>
  <div class="container-fluid">
    <div class="row p-5 d-flex justify-content-center align-content-center">
      <main class="col-12">   
        <section class="login-wrapper p-5">        
          <h2 class="title">Login</h2>
          <a :href="url">Login</a>
        </section>
      </main>
    </div>
  </div>  
</template>

<script setup lang="ts">
import { useUserConfig } from '@/store/userConfig'
import { storeToRefs } from 'pinia'
import { onMounted, watch, ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const store = useUserConfig()
const route = useRoute()
const router = useRouter()
const { getToken } = store
const { getUrl } = store
const { loginSuccess } = storeToRefs(store)
let url = ref('')

onMounted(() => {

  let code:any = route.query.code;
  if(!code){
    getUrl().then( data => {
      url.value = data;
    })
  }else{
    getToken(code)
  }
})

watch(loginSuccess, (newValue, oldValue)=> {
  if(newValue == true){
    ElMessage({
      message: '登入成功。',
      type: 'success',
    })
    router.push({ name: "Dashboard" });
  }
})
</script>

<style lang="scss">
</style>