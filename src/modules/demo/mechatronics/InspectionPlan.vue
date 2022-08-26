<template>
  <div>
    <main-title />
    <div class="row mb-2">
      <div class="col-md-6">
        <el-input
          v-model="inputSearch"
          placeholder="請輸入巡檢單編號或任務名稱"
          class="input-with-select"
        >
          <template #prepend>
            <el-select
              v-model="selectSearch"
              placeholder="搜尋類型"
              style="width: 115px"
            >
              <el-option label="巡檢單編號" value="1" />
              <el-option label="任務名稱" value="2" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="'Search'" />
          </template>
        </el-input>
      </div>
      <div class="col-md-6">
        <el-button type="primary" class="float-end">建立巡檢計劃</el-button>
      </div>
    </div>
    <div class="bg-white">
      <div class="mission-state mb-3">
        <div
          class="progress-1 d-flex justify-content-center align-items-center"
        >
          <div class="square"></div>
          處理完成
        </div>
        <div
          class="progress-2 d-flex justify-content-center align-items-center"
        >
          <div class="square"></div>
          處理中
        </div>
        <div
          class="progress-3 d-flex justify-content-center align-items-center"
        >
          <div class="square"></div>
          暫時無法處理
        </div>
        <div
          class="progress-4 d-flex justify-content-center align-items-center"
        >
          <div class="square"></div>
          未處理
        </div>
      </div>
      <el-table label-width="100px" :data="fakeData" width="100%">
        <el-table-column label="狀態" prop="state" sortable>
          <template #default="scope">
            <div
              v-if="scope.row.state == '1'"
              style="background-color: #169523"
              class="progess-column"
            >
              處理完成
            </div>
            <div
              v-if="scope.row.state == '2'"
              style="background-color: #2ebdea"
              class="progess-column"
            >
              處理中
            </div>
            <div
              v-if="scope.row.state == '3'"
              style="background-color: #707070"
              class="progess-column"
            >
              暫時無法處理
            </div>
            <div
              v-if="scope.row.state == '4'"
              style="background-color: #d94242"
              class="progess-column"
            >
              未處理
            </div>
          </template>
        </el-table-column>
        <el-table-column label="巡檢點編號" prop="id" />
        <el-table-column label="任務名稱" prop="name" />
        <el-table-column label="人員" prop="person" :formatter="formatPerson" />
        <el-table-column label="時間">
          <template #default="scope">
            <div>巡檢開始：<br />{{ scope.row.time.start }}</div>
            <div>巡檢結束：<br />{{ scope.row.time.end }}</div>
          </template>
        </el-table-column>
        <el-table-column label="巡檢結果" prop="result" />
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
import { ref, reactive } from "vue";

export default {
  name: "DispatchRecord",
  components: { MainTitle },
  setup() {
    let inputSearch = ref("");
    let selectSearch = ref("");
    const fakeData = [
      {
        state: "1",
        id: "X2022070801",
        name: "每日安全巡檢",
        person: "李小雨",
        time: {
          start: "2021-08-05 08:00",
          end: "2021-08-05 12:00",
        },
        result: "正常",
      },
      {
        state: "3",
        id: "X2022070802",
        name: "每日安全巡檢",
        person: "李小雨",
        time: {
          start: "2021-08-05 08:00",
          end: "2021-08-05 12:00",
        },
        result: "異常",
      },
      {
        state: "4",
        id: "X2022070803",
        name: "每日安全巡檢",
        person: "李小雨",
        time: {
          start: "2021-08-05 08:00",
          end: "2021-08-05 12:00",
        },
        result: "正常",
      },
    ];
    const router = useRouter();
    const currentPage = router.currentRoute.value.matched.length === 2;
    const currentPage1 = ref(5);

    const formatPerson = (row: any, column: any) => {
      return "巡檢執行人：" + row.person;
    };

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
      formatPerson,
      handleEdit,
      handleDelete,
    };
  },
};
</script>

<style lang="scss" scope>
.mission-state {
  display: inline-flex;
  padding: 15px 13px;
  .square {
    width: 12px;
    height: 12px;
    margin-right: 8px;
    margin-bottom: -1px;
  }
  .progress-1,
  .progress-2,
  .progress-3,
  .progress-4 {
    font-size: 13px;
    margin-right: 15px;
  }
  .progress-1 {
    .square {
      background-color: #169523;
    }
  }
  .progress-2 {
    .square {
      background-color: #2ebdea;
    }
  }
  .progress-3 {
    .square {
      background-color: #707070;
    }
  }
  .progress-4 {
    .square {
      background-color: #d94242;
    }
  }
}
.progess-column {
  min-width: 70px;
  padding: 2px 4px;
  text-align: center;
  border-radius: 6px;
  background-color: #ddd;
  color: #fff;
  display: inline-block;
  font-size: 13px;
}
</style>
