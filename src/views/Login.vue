<template>
  <main class="col-md-4 col-12">   
    <section class="login-wrapper p-5">        
          <h2 class="title">Login</h2>
          <a :href="url">Login</a>
        </section>
    <!-- <suspense>
      <template v-slot:default>
				<section class="login-wrapper p-5">        
          <h2 class="title">Login</h2>
          <a :href="url">Login</a>
        </section>
			</template>
      <template v-slot:fallback>
				<h3>loading...</h3>
			</template>      
    </suspense> -->
  </main>
</template>

<script lang="ts">
import { useUserConfig } from '@/store/userConfig';
import { onMounted, ref } from 'vue';

export default {
 setup(){
    const store = useUserConfig();    
    const { getUrl } = store;

    let url = ref('');
    onMounted(() => {
      getUrl().then( data => {
        url.value = data;
      })
    })

    return{ url }
  }
}

</script>

<style lang="scss">
</style>