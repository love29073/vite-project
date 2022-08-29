<template>
  <div>
    <main-title />
    <div class="mb-4 mt-n2">
      <router-link :to="{ name: 'MechatronicsRecord' }">
        <el-button type="info" :icon="'ArrowLeft'" link>
          返回列表</el-button
        ></router-link
      >
    </div>
    <div class="bg-white p-3">
      <el-form :label-position="'top'" label-width="100px">
        <div class="row p-1">
          <div class="col-md-4">
            <el-form-item label="巡檢點大樓">
              <el-input v-model="fakeData.building" />
            </el-form-item>
          </div>
          <div class="col-md-4">
            <el-form-item label="巡檢點名稱">
              <el-input v-model="fakeData.name" />
            </el-form-item>
          </div>
          <div class="col-md-4">
            <el-form-item label="巡檢點類型">
              <el-select
                v-model="fakeData.type"
                placeholder="巡檢點類型"
                class="w-100"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-4">
            <el-form-item label="打卡方式">
              <el-select
                v-model="fakeData.punch"
                placeholder="打卡方式"
                class="w-100"
              >
                <el-option
                  v-for="item in punchOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-4">
            <el-form-item label="啟用巡檢點">
              <el-checkbox
                v-model="fakeData.isOpen"
                label="是否開啟巡檢點"
                size="large"
              />
            </el-form-item>
          </div>
          <div class="col-md-12">
            <el-form-item class="float-end">
              <el-button @click="onCancel">取消</el-button>
              <el-button type="primary" @click="onSubmit">確認</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import MainTitle from "@/components/layout/MainTitle.vue";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { ElMessage } from "element-plus";

export default {
  name: "AddInspection",
  components: { MainTitle },
  setup() {
    const fakeData = reactive({
      building: "中華電信北區分公司A棟",
      name: "中華電信北區分公司A棟二樓左側樓梯旁機電室",
      type: "",
      punch: "",
      isOpen: false,
    });
    const typeOptions = [
      {
        value: "機電修繕",
        label: "機電修繕",
      },
      {
        value: "機電修繕",
        label: "機電修繕",
      },
      {
        value: "機電修繕",
        label: "機電修繕",
      },
    ];
    const punchOptions = [
      {
        value: "QRCode",
        label: "QRCode",
      },
    ];
    const router = useRouter();

    const onSubmit = () => {
      console.log("fakeSubmit");
      ElMessage({
        message: "巡檢計劃新增成功。",
        type: "success",
      });
    };
    const onCancel = () => {
      router.push({ name: "MechatronicsRecord" });
    };

    return { fakeData, typeOptions, punchOptions, onSubmit, onCancel };
  },
};
</script>

<style lang="scss" scope>
.el-checkbox.el-checkbox--large .el-checkbox__label {
  font-weight: 400;
}
</style>
