<template>
  <div>
    <main-title />
    <div class="row mb-2">
      <div class="col-md-6">
        <el-input
          v-model="inputSearch"
          placeholder="請輸入巡檢點或編號"
          class="input-with-select"
        >
          <template #prepend>
            <el-select
              v-model="selectSearch"
              placeholder="搜尋類型"
              style="width: 115px"
            >
              <el-option label="巡檢點" value="1" />
              <el-option label="編號" value="2" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="'Search'" />
          </template>
        </el-input>
      </div>
      <div class="col-md-6">
        <router-link :to="{ name: 'AddInspection' }">
          <el-button type="primary" class="float-end"
            >建立巡檢點</el-button
          ></router-link
        >
      </div>
    </div>
    <div class="bg-white">
      <el-table label-width="100px" :data="fakeData" width="100%">
        <el-table-column label="巡檢點編號" prop="id" />
        <el-table-column label="巡檢點名稱" prop="name" />
        <el-table-column label="巡檢類型" prop="type" />
        <el-table-column label="是否開啟">
          <template #default="scope">
            <span v-if="scope.row.isOpen === true">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >編輯</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >刪除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:currentPage="currentPage1"
        :page-size="10"
        :small="true"
        :background="true"
        layout="total, prev, pager, next"
        :total="200"
        class="justify-content-end p-3"
      />
    </div>
  </div>
</template>

<script lang="ts">
import MainTitle from "@/components/layout/MainTitle.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  name: "MechatronicsRecord",
  components: { MainTitle },
  setup() {
    let inputSearch = ref("");
    let selectSearch = ref("");
    const fakeData = [
      {
        id: "X2022070801",
        name: "中華電信北區分公司A棟二樓左側樓梯旁機電室",
        type: "機電修繕",
        isOpen: true,
      },
      {
        id: "X2022070802",
        name: "中華電信北區分公司A棟二樓左側樓梯旁機電室",
        type: "機電修繕",
        isOpen: false,
      },
      {
        id: "X2022070803",
        name: "中華電信北區分公司A棟二樓左側樓梯旁機電室",
        type: "機電修繕",
        isOpen: true,
      },
      {
        id: "X2022070804",
        name: "中華電信北區分公司A棟二樓左側樓梯旁機電室",
        type: "機電修繕",
        isOpen: true,
      },
      {
        id: "X2022070805",
        name: "中華電信北區分公司A棟二樓左側樓梯旁機電室",
        type: "機電修繕",
        isOpen: true,
      },
    ];
    const router = useRouter();
    const currentPage = router.currentRoute.value.matched.length === 2;
    const currentPage1 = ref(5);

    const handleEdit = (index: any, row: any) => {
      console.log(index, row);
    };
    const handleDelete = (index: any, row: any) => {
      console.log(index, row);
    };

    return {
      inputSearch,
      selectSearch,
      fakeData,
      currentPage,
      currentPage1,
      handleEdit,
      handleDelete,
    };
  },
};
</script>
