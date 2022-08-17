<template>
  <div class="container-fluid">
    <div class="row p-5 d-flex justify-content-center align-content-center">
      <main class="col-12">
        <section class="login-wrapper p-5">
          <h2 class="title">Login...</h2>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserConfig } from "@/store/useUserConfig";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const store = useUserConfig();
const route = useRoute();
const router = useRouter();
const { getToken } = store;
const { loginSuccess } = storeToRefs(store);

onMounted(() => {
  let code: any = route.query.code;
  getToken(code);
});
watch(loginSuccess, (newValue, oldValue) => {
  if (newValue === true) {
    ElMessage({
      message: "登入成功。",
      type: "success",
    });

    let toPath = sessionStorage.getItem("toPath");
    if (toPath) {
      router.push({ path: toPath });
      sessionStorage.removeItem("toPath");
    } else {
      router.push({ name: "Dashboard" });
    }
  }
});
</script>

<style lang="scss" scope></style>
