<template>
  <div>
    <el-button @click="addEmployeeVisible = true" class="mb-3"
      >新增員工</el-button
    >
    <!-- table start -->
    <el-table
      label-width="100px"
      :data="fetchEmployee"
      style="width: 100%"
      height="60vh"
    >
      <el-table-column label="員工編號" prop="empno" />
      <el-table-column label="員工名稱" prop="ename" />
      <el-table-column label="入職時間" prop="hireDate" />
      <el-table-column label="職位" prop="job" />
      <el-table-column label="薪水" prop="sal" />
      <el-table-column align="right">
        <template #header>
          <el-input
            v-model="search"
            size="small"
            placeholder="輸入員工名稱以搜尋"
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
    <el-dialog v-model="addEmployeeVisible" title="新增員工">
      <el-form :model="formEmployee">
        <el-form-item label="員工編號" :label-width="formLabelWidth">
          <el-input-number
            v-model="formEmployee.empno"
            min="0"
            :step="1"
            step-strictly
          />
        </el-form-item>
        <el-form-item label="員工名稱" :label-width="formLabelWidth">
          <el-input v-model="formEmployee.ename" autocomplete="off" />
        </el-form-item>
        <el-form-item label="入職時間" :label-width="formLabelWidth">
          <el-input v-model="formEmployee.hireDate" autocomplete="off" />
        </el-form-item>
        <el-form-item label="職位" :label-width="formLabelWidth">
          <el-input v-model="formEmployee.job" autocomplete="off" />
        </el-form-item>
        <el-form-item label="薪水" :label-width="formLabelWidth">
          <el-input v-model="formEmployee.sal" autocomplete="off" />
        </el-form-item>
        <el-form-item label="部門名稱" :label-width="formLabelWidth">
          <el-input v-model="formEmployee.deptVo.dname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="部門地點" :label-width="formLabelWidth">
          <el-input v-model="formEmployee.deptVo.loc" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addEmployeeVisible = false">取消</el-button>
          <el-button type="primary" @click="addEmployee">新增</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- add dialog end -->
    <!-- update dialog start -->
    <el-dialog v-model="updateEmployeeVisible" title="修改員工資訊">
      <el-form :model="formEmployee" :label-position="'top'">
        <div class="row">
          <div class="col-md-6">
            <el-form-item label="員工名稱" :label-width="formLabelWidth">
              <el-input v-model="formEmployee.ename" autocomplete="off" />
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item label="入職時間" :label-width="formLabelWidth">
              <el-date-picker
                v-model="formEmployee.hireDate"
                type="date"
                placeholder="Pick a day"
                size="default"
                autocomplete="off"
              />
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item label="職位" :label-width="formLabelWidth">
              <el-input v-model="formEmployee.job" autocomplete="off" />
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item label="薪水" :label-width="formLabelWidth">
              <el-input v-model="formEmployee.sal" autocomplete="off" />
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item label="部門名稱" :label-width="formLabelWidth">
              <el-input
                v-model="formEmployee.deptVo.dname"
                autocomplete="off"
              />
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item label="部門地點" :label-width="formLabelWidth">
              <el-input v-model="formEmployee.deptVo.loc" autocomplete="off" />
            </el-form-item>
          </div>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="updateEmployeeVisible = false">取消</el-button>
          <el-button type="primary" @click="updateEmployeeConfirm"
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
import type IEmployeeVo from "../models/IEmployeeVo";
import apiEmployee from "../services/apiEmployee";
import { ElMessage, ElMessageBox } from "element-plus";

export default defineComponent({
  name: "EmployeeView",
  setup() {
    let employee = ref<IEmployeeVo[]>([]);
    let search = ref("");
    const addEmployeeVisible = ref(false);
    const updateEmployeeVisible = ref(false);
    const formEmployee = reactive({
      comm: 0,
      empno: 0,
      ename: "",
      hireDate: "",
      job: "",
      sal: 0,
      deptVo: {
        deptno: 0,
        dname: "",
        loc: "",
      },
    });
    const formLabelWidth = "100px";
    const confirmUpdate = ref(false);

    //掛載時，載入員工全部資訊
    onMounted(() => {
      getEmployee();
    });

    //搜尋員工關鍵字
    const fetchEmployee = computed(() =>
      employee.value.filter(
        (data) =>
          !search.value ||
          data.ename.toLowerCase().includes(search.value.toLowerCase())
      )
    );

    //抓取員工全部資訊
    const getEmployee = () => {
      apiEmployee
        .getAll()
        .then((res) => {
          employee.value = res.data;
          // console.log(employee.value)
        })
        .catch((error) => {
          console.log(error, "失敗");
        });
    };

    //新增員工
    const addEmployee = () => {
      let data = {
        comm: formEmployee.comm,
        empno: formEmployee.empno,
        ename: formEmployee.ename,
        hireDate: formEmployee.hireDate,
        job: formEmployee.job,
        sal: formEmployee.sal,
        deptVo: {
          deptno: formEmployee.deptVo.deptno,
          dname: formEmployee.deptVo.dname,
          loc: formEmployee.deptVo.loc,
        },
      };

      let idIndex = employee.value
        .map(function (e) {
          return e.empno;
        })
        .indexOf(formEmployee.empno);
      let nameIndex = employee.value
        .map(function (e) {
          return e.ename;
        })
        .indexOf(formEmployee.ename);

      if (nameIndex == -1 && idIndex == -1) {
        apiEmployee
          .create(data)
          .then((res) => {
            addEmployeeVisible.value = false;
            getEmployee();
            ElMessage({
              message: "新增員工成功。",
              type: "success",
            });
          })
          .catch((error) => {
            console.log(error, "失敗");
          });
      } else {
        ElMessage.error("員工編號 / 員工名稱不可重複。");
      }
    };

    //編輯(更新)員工
    const handleEdit = (index: number, row: IEmployeeVo) => {
      console.log(index, row.empno);
      console.log(row.deptVo);

      formEmployee.comm = row.comm;
      formEmployee.empno = row.empno;
      formEmployee.ename = row.ename;
      formEmployee.hireDate = row.hireDate;
      formEmployee.job = row.job;
      formEmployee.sal = row.sal;
      formEmployee.deptVo.deptno = row.deptVo.deptno;
      formEmployee.deptVo.dname = row.deptVo.dname;
      formEmployee.deptVo.loc = row.deptVo.loc;
      updateEmployeeVisible.value = true;
    };
    const updateEmployeeConfirm = () => {
      confirmUpdate.value = true;
      let data = {
        comm: formEmployee.comm,
        empno: formEmployee.empno,
        ename: formEmployee.ename,
        hireDate: formEmployee.hireDate,
        job: formEmployee.job,
        sal: formEmployee.sal,
        deptVo: {
          deptno: formEmployee.deptVo.deptno,
          dname: formEmployee.deptVo.dname,
          loc: formEmployee.deptVo.loc,
        },
      };

      apiEmployee
        .update(formEmployee.empno, data)
        .then((res) => {
          updateEmployeeVisible.value = false;
          getEmployee();
          ElMessage({
            message: "更新員工成功。",
            type: "success",
          });
        })
        .catch((error) => {
          console.log(error, "失敗");
        });
    };

    //刪除員工
    const handleDelete = (index: number, row: IEmployeeVo) => {
      ElMessageBox.confirm("確定要刪除此員工？", "提示", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          apiEmployee
            .delete(row.empno)
            .then((res) => {
              getEmployee();
              ElMessage({
                message: "刪除員工成功。",
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
      fetchEmployee,
      search,
      addEmployeeVisible,
      formEmployee,
      formLabelWidth,
      updateEmployeeVisible,
      addEmployee,
      handleEdit,
      handleDelete,
      updateEmployeeConfirm,
    };
  },
});
</script>

<style lang="scss" scope>
// custom element plus
.el-date-editor.el-input,
.el-date-editor.el-input__wrapper {
  width: 100% !important;
  .el-input__wrapper {
    width: 100%;
  }
}
</style>
