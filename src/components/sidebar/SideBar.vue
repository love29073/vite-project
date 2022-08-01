<template>
    <nav class="col-md-3 col-lg-2 d-md-block sidebar collapse">
      <div class="user">
        <div class="title py-3">
          <div class="d-flex align-items-center">
            <el-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
            <div class="ps-2">
              <div class="name">王小明</div>
              <div class="greeting">大樓管理員，您好！</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
</template>

<script lang="ts">
  export default {
      
  }
</script>

<style lang="scss" scoped>
  .sidebar{
    height: 100vh;
    border-right: 1px solid #ddd;
    .user{
      border-bottom: 1px solid #ddd;
      .name{
        font-size: 15px;
      }
      .greeting{
        font-size: 14px;
        color: #555;
      }
    }
  }
</style>