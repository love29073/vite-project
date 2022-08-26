<template>
  <div>
    <el-button @click="addDepartmentVisible = true" class="mb-3"
      >新增部門</el-button
    >
    <!-- table start -->
    <el-table
      label-width="100px"
      :data="fetchDepartment"
      width="100%"
      height="60vh"
    >
      <el-table-column fixed label="部門編號" prop="deptno" />
      <el-table-column label="部門名稱" prop="dname" />
      <el-table-column label="部門地點" prop="loc" />
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
    <!-- add dialog start -->
    <el-dialog v-model="addDepartmentVisible" title="新增部門">
      <el-form :model="formDepartment">
        <el-form-item label="部門編號" :label-width="formLabelWidth">
          <el-input-number
            v-model="formDepartment.deptno"
            min="0"
            :step="10"
            step-strictly
          />
        </el-form-item>
        <el-form-item label="部門名稱" :label-width="formLabelWidth">
          <el-input v-model="formDepartment.dname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="部門地點" :label-width="formLabelWidth">
          <el-input v-model="formDepartment.loc" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDepartmentVisible = false">取消</el-button>
          <el-button type="primary" @click="addDepartment">新增</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- add dialog end -->
    <!-- update dialog start -->
    <el-dialog v-model="updateDepartmentVisible" title="修改部門">
      <el-form :model="formDepartment">
        <el-form-item label="部門名稱" :label-width="formLabelWidth">
          <el-input v-model="formDepartment.dname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="部門地點" :label-width="formLabelWidth">
          <el-input v-model="formDepartment.loc" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="updateDepartmentVisible = false">取消</el-button>
          <el-button type="primary" @click="updateDepartmentConfirm"
            >確定修改</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- update dialog end -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, computed } from "vue";
import type IDepartmentVo from "../models/IDepartmentVo";
import apiDepartment from "../services/apiDepartment";
import { ElMessage, ElMessageBox } from "element-plus";

export default defineComponent({
  name: "DpartmentView",
  setup() {
    let department = ref<IDepartmentVo[]>([]);
    let search = ref("");
    const addDepartmentVisible = ref(false);
    const updateDepartmentVisible = ref(false);
    const formDepartment = reactive({
      deptno: 0,
      dname: "",
      loc: "",
    });
    const formLabelWidth = "100px";
    const confirmUpdate = ref(false);

    //掛載時，載入部門全部資訊
    onMounted(() => {
      getDepartment();
    });

    //搜尋部門關鍵字
    const fetchDepartment = computed(() =>
      department.value.filter(
        (data) =>
          !search.value ||
          data.dname.toLowerCase().includes(search.value.toLowerCase())
      )
    );

    //抓取部門全部資訊
    const getDepartment = () => {
      apiDepartment
        .getAll()
        .then((res) => {
          department.value = res.data;
        })
        .catch((error) => {
          console.log(error, "失敗");
        });
    };

    //新增部門
    const addDepartment = () => {
      let data = {
        deptno: formDepartment.deptno,
        dname: formDepartment.dname,
        loc: formDepartment.loc,
      };

      let idIndex = department.value
        .map(function (e) {
          return e.deptno;
        })
        .indexOf(formDepartment.deptno);
      let nameIndex = department.value
        .map(function (e) {
          return e.dname;
        })
        .indexOf(formDepartment.dname);

      if (nameIndex == -1 && idIndex == -1) {
        apiDepartment
          .create(data)
          .then((res) => {
            addDepartmentVisible.value = false;
            getDepartment();
            ElMessage({
              message: "新增部門成功。",
              type: "success",
            });
          })
          .catch((error) => {
            console.log(error, "失敗");
          });
      } else {
        ElMessage.error("部門編號 / 部門名稱不可重複。");
      }
    };

    //編輯(更新)部門
    const handleEdit = (index: number, row: IDepartmentVo) => {
      console.log(index, row.deptno);

      formDepartment.deptno = row.deptno;
      formDepartment.dname = row.dname;
      formDepartment.loc = row.loc;
      updateDepartmentVisible.value = true;
    };
    const updateDepartmentConfirm = () => {
      confirmUpdate.value = true;
      let data = {
        deptno: formDepartment.deptno,
        dname: formDepartment.dname,
        loc: formDepartment.loc,
      };

      apiDepartment
        .update(formDepartment.deptno, data)
        .then((res) => {
          updateDepartmentVisible.value = false;
          getDepartment();
          ElMessage({
            message: "更新部門成功。",
            type: "success",
          });
        })
        .catch((error) => {
          console.log(error, "失敗");
        });
    };

    //刪除部門
    const handleDelete = (index: number, row: IDepartmentVo) => {
      ElMessageBox.confirm("確定要刪除此部門？", "提示", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          apiDepartment
            .delete(row.deptno)
            .then((res) => {
              getDepartment();
              ElMessage({
                message: "刪除部門成功。",
                type: "success",
              });
            })
            .catch((error) => {
              console.log(error, "失敗");
            });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消刪除",
          });
        });
    };

    return {
      fetchDepartment,
      search,
      addDepartmentVisible,
      formDepartment,
      formLabelWidth,
      updateDepartmentVisible,
      addDepartment,
      handleEdit,
      handleDelete,
      updateDepartmentConfirm,
    };
  },
});
</script>
