<template>
  <div class="container-fluid">
    <div
      class="row p-5 d-flex justify-content-center align-content-center"
      style="min-height: 100vh; background-color: #ecf0f3"
    >
      <div
        class="row g-0 full-column col-sm-12 col-md-10 col-lg-8 col-xl-6 col-md-offset-1 col-lg-offset-2 col-xl-offset-3"
      >
        <div class="col-md-4 col-sm-3 left-column">
          <div>
            <h2 class="title mb-3">Welcome Back !</h2>
            <p class="subtitle">Enter your personal details and start.</p>
          </div>
        </div>
        <div class="col-md-8 col-sm-9 right-column">99</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserConfig } from "@/store/useUserConfig";
import { useRoute, useRouter } from "vue-router";

const store = useUserConfig();
const route = useRoute();
const router = useRouter();
</script>

<style lang="scss" scope>
.full-column {
  padding: 0;
  border-radius: 8px;
  box-shadow: 10px 10px 10px #d1d9e6, -4px -4px 10px rgba(220, 225, 229, 0.35);
  .left-column,
  .right-column {
    height: 450px;
    padding: 25px;
    text-align: center;
  }
  .left-column {
    @include flexbox(center);
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: 4px 4px 10px #d1d9e6, 0px 0px 0px rgba(248, 248, 248, 0.25);
    .title {
      @include fontStyle($font-en-title, 20px, 600, default);
    }
    .subtitle {
      @include fontStyle($font-en-title, 12px, 400, #a0a5a8);
    }
  }
  .right-column {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}
</style>
