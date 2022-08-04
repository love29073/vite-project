<template>
  <main class="col-md-4 col-12">   
    <Transition name="fade-scale" mode="out-in">
      <section class="login-wrapper p-5">
        <h2 class="title">Login</h2>
        <el-form ref="refForm" label-width="0" :model="form" class="login-form" size="large">
          <el-form-item prop="username" :rules="[{ required: true, message: '帳號不能為空' }]">
            <el-input v-model="form.username">
              <template #prefix>
                <el-icon size="1.1rem">
                  <User />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" :rules="[{ required: true, message: '密碼不能為空' }]">
            <el-input v-model="form.password" :type="form.showPassword ? 'text' : 'password'">
              <template #prefix>
                <el-icon size="1.1rem">
                  <Lock />
                </el-icon>
              </template>
              <template #suffix>
                <el-icon size="1.1rem">
                  <SvgIcon :iconName="form.showPassword ? 'eye-open' : 'eye'"
                    @click="form.showPassword = !form.showPassword"></SvgIcon>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="remember" style="margin-bottom: .5rem;">
            <el-checkbox v-model="form.remember" label="記住我" />
          </el-form-item>
          <ElButton type="primary" style="width: 100%;" size="large" :loading="loading.login" @click="login">登入
          </ElButton>
        </el-form>
      </section>
    </Transition>
  </main>
</template>

  <script setup lang="ts">
  import { reactive, ref } from 'vue'
  // import { userStore } from '@/stores/user'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import { User, Lock } from '@element-plus/icons-vue'
  import type { ComponentPublicInstance } from 'vue'
  import type { FormInstance } from 'element-plus'
  import axios from 'axios';

  interface LoginForm {
    username: string
    password: string
    remember: boolean
    showPassword: boolean
  }

  const refForm = ref<ComponentPublicInstance<FormInstance> | null>(null)
  const form = reactive<LoginForm>({
    username: 'david',
    password: '123456',
    showPassword: false,
    remember: true
  })
  const loading = reactive({
    login: false
  })
  const router = useRouter()
  // const user = userStore()

  function login() {
    router.replace('/')
    axios.get('/oauth2/authorize')
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
        console.log(error, '失敗');
    })
    // if (!refForm.value) return
    // refForm.value.validate((valid, fields) => {
    //   if (!valid) return false
    //   loading.login = true
    //   user.login(form.username, form.password).then(_ => {
    //     router.replace('/dashboard')
    //   }).catch(err => {
    //     loading.login = false
    //     ElMessage.error(err)
    //   })
    // })
  }
</script>

<style lang="scss">
</style>