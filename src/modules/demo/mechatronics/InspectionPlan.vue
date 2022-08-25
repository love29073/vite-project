<template>
  <div>
    <div v-if="currentPage">
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
          <router-link :to="{ name: 'AddInspection' }">
            <el-button type="primary" class="float-end"
              >建立巡檢點</el-button
            ></router-link
          >
        </div>
      </div>
      <div class="bg-white">
        <div class="mission-state">
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
                :style="{ backgroundColor: progess.color }"
                class="progess-column"
              >
                {{ progess.title }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="巡檢點編號" prop="id" />
          <el-table-column label="任務名稱" prop="name" />
          <el-table-column label="人員">
            <template #default="scope">
              <div>巡檢執行人：{{ scope.row.person }}</div>
            </template>
          </el-table-column>
          <el-table-column label="時間">
            <template #default="scope">
              <div>巡檢開始：{{ scope.row.time.start }}</div>
              <div>巡檢結束{{ scope.row.time.end }}</div>
            </template>
          </el-table-column>
          <el-table-column label="巡檢結果" prop="result" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
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
    <router-view v-else></router-view>
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
    let progess = reactive({
      title: "",
      color: "",
    });
    const router = useRouter();
    const currentPage = router.currentRoute.value.matched.length === 2;
    const currentPage1 = ref(5);

    fakeData.forEach((item) => {
      console.log(item);
      if (item.state === "1") {
        progess.title = "處理完成";
        progess.color = "#169523";
      } else if (item.state === "2") {
        progess.title = "處理中";
        progess.color = "#2ebdea";
      } else if (item.state === "3") {
        progess.title = "暫時無法處理";
        progess.color = "#707070";
      } else if (item.state === "4") {
        progess.title = "未處理";
        progess.color = "#d94242";
      }
    });

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
      progess,
      handleEdit,
      handleDelete,
    };
  },
};
</script>

<style lang="scss" scope>
.mission-state {
  display: inline-flex;
  padding: 15px 10px;
  .square {
    width: 15px;
    height: 15px;
    margin-right: 8px;
  }
  .progress-1,
  .progress-2,
  .progress-3,
  .progress-4 {
    font-size: 14px;
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
  min-width: 80px;
  padding: 2px 4px;
  text-align: center;
  border-radius: 5px;
  background-color: #ddd;
  color: #fff;
  display: inline-block;
}
</style>
