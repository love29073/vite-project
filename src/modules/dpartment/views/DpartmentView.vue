<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-md-4 py-sm-2">
    <el-button @click="addDepartmentVisible = true" class="mb-3">新增部門</el-button>
    <!-- table start -->
    <el-table label-width="100px" :data="fetchDepartment" width="100%">
      <el-table-column label="部門ID" prop="deptno" />
      <el-table-column label="部門名稱" prop="dname" />
      <el-table-column label="部門地點" prop="loc" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <!-- add dialog start -->
    <el-dialog v-model="addDepartmentVisible" title="新增部門">
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
          <el-button type="primary" @click="updateDepartment">確定修改</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- update dialog end -->
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, computed } from 'vue';
import type IDepartmentVo from '../models/IDepartmentVo';
import useDpartment from '../services/useDpartment';
import { ElMessage, ElMessageBox } from 'element-plus';

export default defineComponent({
  name: 'DpartmentView',
  setup(){
    let department = ref<IDepartmentVo[]>([]);
    let search = ref('');
    const addDepartmentVisible = ref(false);
    const updateDepartmentVisible = ref(false);
    const formDepartment = reactive({
      dname: '',
      loc: ''
    });
    const formLabelWidth = '100px';

    //掛載時，載入部門全部資訊
    onMounted(() => {
      useDpartment.getAll().then((res) => {
        department.value = res.data;
        // console.log(department.value)
      })
      .catch((error) => {
          console.log(error, '失敗');
      })
    })

    //搜尋部門關鍵字
    const fetchDepartment = computed(() =>
      department.value.filter(
        (data) =>
          !search.value ||
          data.dname.toLowerCase().includes(search.value.toLowerCase())
      )
    )

    //抓取部門全部資訊
    const getDepartment = () => {
      useDpartment.getAll().then((res) => {
        department.value = res.data;
        // console.log(department.value)
      })
      .catch((error) => {
          console.log(error, '失敗');
      })
    }

    //新增部門
    const addDepartment = () => {
      let data = {
        dname: formDepartment.dname,
        loc: formDepartment.loc
      }

      let nameIndex = department.value.map(function(e) { return e.dname; }).indexOf(formDepartment.dname);

      if(nameIndex == -1){
        useDpartment.create(data)
        .then((res) => {
          addDepartmentVisible.value = false;
          getDepartment();
          ElMessage({
            message: '新增部門成功。',
            type: 'success',
          })
        })
        .catch((error) => {
          console.log(error, '失敗');
        })
      }else{
        ElMessage.error('部門名稱不可重複。');
      }
    }

    //編輯(更新)部門
    const handleEdit= (index: number, row: IDepartmentVo) => {
      console.log(index,row.deptno)

      formDepartment.dname = row.dname;
      formDepartment.loc = row.loc;
      updateDepartmentVisible.value = true;

      
      let data = {
        dname: formDepartment.dname,
        loc: formDepartment.loc
      }
    }

    //刪除部門
    const handleDelete = (index: number, row: IDepartmentVo) => {
      ElMessageBox.confirm(
        '確定要刪除此部門？',
        '提示',
        {
          confirmButtonText: '確認',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
      .then(() => {
        useDpartment.delete(row.deptno)
        .then((res) => {
          getDepartment();
          ElMessage({
            message: '刪除部門成功。',
            type: 'success',
          })
        })
        .catch((error) => {
          console.log(error, '失敗');
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消刪除',
        })
      })
    }
    
    return{
      fetchDepartment,
      search,
      addDepartmentVisible,
      formDepartment,
      formLabelWidth,
      updateDepartmentVisible,
      addDepartment,
      handleEdit,
      handleDelete
    }
  }
})
</script>