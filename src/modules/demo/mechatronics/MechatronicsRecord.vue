<template>
  <main-title />
  <div>
    <el-button class="mb-3">新增部門</el-button>
    <!-- table start -->
    <el-table label-width="100px" :data="fakeData" width="100%" height="80vh">
      <el-table-column fixed label="巡檢點編號" prop="deptno" />
      <el-table-column label="巡檢點名稱" prop="dname" />
      <el-table-column label="巡檢類型" prop="loc" />
      <el-table-column label="是否開啟" prop="loc" />
      <el-table-column align="right">
        <template #header>
          <el-input
            v-model="search"
            size="small"
            placeholder="輸入部門名稱以搜尋"
          />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
  </div>
</template>

<script lang="ts">
import MainTitle from "@/components/layout/MainTitle.vue";
import { ref } from "vue";

export default {
  name: "DispatchRecord",
  components: { MainTitle },
  setup() {
    let fakeData = ref("");
    return { fakeData };
  },
};
</script>
