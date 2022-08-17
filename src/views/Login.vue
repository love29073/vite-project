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
import { useUserConfig } from "@/store/useUserConfig";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const store = useUserConfig();
const route = useRoute();
const router = useRouter();
const { getUrl } = store;
let url = ref("");

onMounted(() => {
  getUrl().then((data) => {
    url.value = data;
  });
});
</script>

<style lang="scss" scope></style>
