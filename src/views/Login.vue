<template>
  <div class="container-fluid">
    <div
      class="row p-5 d-flex justify-content-center align-content-center login-bg"
    >
      <div
        class="row g-0 full-column col-sm-12 col-md-10 col-lg-8 col-xl-6 col-md-offset-1 col-lg-offset-2 col-xl-offset-3"
      >
        <div class="col-md-4 col-sm-4 left-column">
          <div>
            <div class="logo mb-4">
              <img src="@/assets/img/example.png" alt="logo" />
            </div>
            <h2 class="title mb-2 text-white">中華物業管理系統</h2>
            <p class="subtitle">歡迎回來! Welcome Back!</p>
          </div>
        </div>
        <div class="col-md-8 col-sm-8 right-column">
          <div>
            <h2 class="title mb-5">登入Sign In</h2>
            <el-form
              label-position="top"
              label-width="100px"
              :model="userInfo"
              style="max-width: 460px"
            >
              <el-form-item label="帳號">
                <el-input
                  v-model="userInfo.account"
                  type="email"
                  placeholder="請輸入帳號"
                />
              </el-form-item>
              <el-form-item label="密碼">
                <el-input
                  v-model="userInfo.password"
                  type="password"
                  placeholder="請輸入密碼"
                  show-password
                /> </el-form-item
              ><el-button type="primary" class="mt-4 w-100" round
                >登入</el-button
              >
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useUserConfig } from "@/store/useUserConfig";
import { useRoute, useRouter } from "vue-router";

const store = useUserConfig();
const route = useRoute();
const router = useRouter();

const userInfo = reactive({
  account: "",
  password: "",
});
</script>

<style lang="scss" scope>
.login-bg {
  min-height: 100vh;
  @include backgroundImageCenter("@/assets/img/bg.jpg");
}
.full-column {
  padding: 0;
  border-radius: 8px;
  // box-shadow: 10px 10px 10px #d1d9e6, -4px -4px 10px rgba(220, 225, 229, 0.35);
  .left-column,
  .right-column {
    height: 450px;
    text-align: center;
  }
  .left-column {
    text-align: left;
    @include flexbox(center);
    background-color: $secondColor;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    @include res(phone, to-mb) {
      display: none;
    }
    .title {
      @include fontStyle($font-en-title, 20px, 600, default);
    }
    .subtitle {
      @include fontStyle($font-en-title, 12px, 400, #a0a5a8);
    }
    .logo {
      position: relative;
      display: block;
      min-width: 150px;
      max-height: 40px;
      @include res(padair, to-mb) {
        min-width: 100px;
      }
      img {
        width: auto;
        height: 25px;
      }
    }
  }
  .right-column {
    padding: 25px;
    @include flexbox(center);
    background-color: $greyColor;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    @include res(phone, to-mb) {
      height: 380px;
      border-radius: 8px;
    }
    .el-form--label-top .el-form-item {
      min-width: 235px;
    }
  }
}
</style>
