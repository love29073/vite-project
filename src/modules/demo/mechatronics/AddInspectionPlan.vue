<template>
  <div>
    <main-title />
    <div class="mb-4 mt-n2">
      <router-link :to="{ name: 'InspectionPlan' }">
        <el-button type="info" :icon="'ArrowLeft'" link>
          返回列表</el-button
        ></router-link
      >
    </div>
    <div class="bg-white p-3">
      <el-form :label-position="'top'" label-width="100px">
        <div class="row p-1">
          <div class="col-md-5">
            <el-form-item label="任務名稱">
              <el-input v-model="fakeData.missionName" />
            </el-form-item>
          </div>
          <div class="col-md-8">
            <el-form-item label="新增巡檢點(可複選)">
              <el-select
                v-model="fakeData.place"
                multiple
                placeholder="選擇巡檢點"
                class="w-100"
              >
                <el-option
                  v-for="item in placeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-12">
            <el-form-item label="每" class="d-inline-block"></el-form-item>
            <el-input-number v-model="fakeData.period" :min="1" :max="60" />
            <el-select
              v-model="fakeData.periodType"
              placeholder="Select"
              style="width: 150px"
              class="mx-2"
            >
              <el-option
                v-for="item in periodOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-form-item
              label="巡檢一次"
              class="d-inline-block"
            ></el-form-item>
          </div>
          <div class="col-md-12">
            <el-form-item
              label="生效時間範圍"
              class="d-inline-block"
            ></el-form-item
            ><el-date-picker
              v-model="fakeData.startDate"
              type="date"
              placeholder="起始日期"
              size="default"
            /><el-form-item
              label="至"
              class="d-inline-block ms-2"
            ></el-form-item>
            <el-date-picker
              v-model="fakeData.endDate"
              type="date"
              placeholder="結束日期"
              size="default"
            />
          </div>
          <div class="col-md-12">
            <el-form-item
              label="此巡檢計劃在"
              class="d-inline-block"
            ></el-form-item
            ><el-date-picker
              v-model="fakeData.invalidDate"
              type="date"
              placeholder="設定失效日期"
              size="default"
            /><el-form-item
              label="後失效"
              class="d-inline-block ms-2"
            ></el-form-item>
          </div>
          <div class="col-md-4">
            <el-form-item label="計劃下次巡檢日期">
              <el-date-picker
                v-model="fakeData.nextDate"
                type="date"
                placeholder="設定巡檢日期"
                size="default"
                class="w-100"
              />
            </el-form-item>
          </div>
          <div class="col-md-4">
            <el-form-item label="安排巡檢人">
              <el-select v-model="fakeData.inspector" placeholder="選擇巡檢人">
                <el-option
                  v-for="item in inspectorOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>

          <div class="col-md-12">
            <el-checkbox
              v-model="fakeData.isRecheck"
              label="是否需要巡檢複核人"
              size="large"
            />
          </div>
          <div class="col-md-12">
            <el-checkbox
              v-model="fakeData.isRemind"
              label="是否開啟巡檢未執行提醒"
              size="large"
            />
          </div>
          <div class="col-md-12">
            <el-checkbox
              v-model="fakeData.isCrossLevel"
              label="是否發送跨級提醒"
              size="large"
            />
          </div>
          <div class="col-md-12">
            <el-checkbox
              v-model="fakeData.isUpload"
              label="是否強制上傳圖片"
              size="large"
            />
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
  name: "AddInspectionPlan",
  components: { MainTitle },
  setup() {
    const fakeData = reactive({
      missionName: "巡檢計劃名稱",
      place: "中華電信北區分公司A棟二樓左側樓梯旁機電室",
      period: 1,
      periodType: "",
      startDate: "",
      endDate: "",
      invalidDate: "",
      nextDate: "",
      inspector: "",
      isRecheck: false,
      isRemind: false,
      isCrossLevel: false,
      isUpload: false,
    });
    const placeOption = [
      {
        value: "中華電信北區分公司A棟二樓左側樓梯旁機電室",
        label: "中華電信北區分公司A棟二樓左側樓梯旁機電室",
      },
      {
        value: "中華電信北區分公司B棟二樓右側樓梯旁機電室",
        label: "中華電信北區分公司B棟二樓右側樓梯旁機電室",
      },
      {
        value: "中華電信北區分公司B棟五樓機電室",
        label: "中華電信北區分公司B棟五樓機電室",
      },
    ];
    const periodOptions = [
      {
        value: "天",
        label: "天",
      },
      {
        value: "時",
        label: "時",
      },
    ];
    const inspectorOptions = [
      {
        value: "巡檢人A",
        label: "巡檢人A",
      },
      {
        value: "巡檢人B",
        label: "巡檢人B",
      },
    ];

    const onSubmit = () => {
      console.log("fakeSubmit");
      ElMessage({
        message: "巡檢計劃新增成功。",
        type: "success",
      });
    };
    const router = useRouter();
    const onCancel = () => {
      router.push({ name: "InspectionPlan" });
    };

    return {
      fakeData,
      placeOption,
      periodOptions,
      inspectorOptions,
      onSubmit,
      onCancel,
    };
  },
};
</script>

<style lang="scss" scope>
.el-input__wrapper,
.el-select {
  width: 100%;
}
.el-checkbox.el-checkbox--large .el-checkbox__label {
  font-weight: 400;
}
</style>
