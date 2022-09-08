<template>
  <div>
    <div class="row g-0 info-group">
      <div class="col-md-6 col-lg-3">
        <router-link :to="{ name: 'MechatronicsRecord' }">
          <div class="info-panel">
            <div class="d-flex align-items-center">
              <el-icon :color="'#ff942e'" :size="60"><Discount /></el-icon>
              <div class="ms-4">
                <div class="title">未處理</div>
                <div class="quantity">50</div>
              </div>
            </div>
            <div class="category">機電管理</div>
          </div></router-link
        >
      </div>
      <div class="col-md-6 col-lg-3">
        <router-link :to="{ name: 'SecurityRecord' }">
          <div class="info-panel">
            <div class="d-flex align-items-center">
              <el-icon :color="'#096c86'" :size="60"><Avatar /></el-icon>
              <div class="ms-4">
                <div class="title">未處理</div>
                <div class="quantity">10</div>
              </div>
            </div>
            <div class="category">保全管理</div>
          </div></router-link
        >
      </div>
      <div class="col-md-6 col-lg-3">
        <router-link :to="{ name: 'SanitaryRecord' }">
          <div class="info-panel">
            <div class="d-flex align-items-center">
              <el-icon :color="'#df3670'" :size="60"><TakeawayBox /></el-icon>
              <div class="ms-4">
                <div class="title">未處理</div>
                <div class="quantity">0</div>
              </div>
            </div>
            <div class="category">清潔勞務管理</div>
          </div></router-link
        >
      </div>
      <div class="col-md-6 col-lg-3">
        <router-link :to="{ name: 'RepairRecord' }">
          <div class="info-panel">
            <div class="d-flex align-items-center">
              <el-icon :color="'#4067f9'" :size="60"><FirstAidKit /></el-icon>
              <div class="ms-4">
                <div class="title">未處理</div>
                <div class="quantity">30</div>
              </div>
            </div>
            <div class="category">營建修繕管理</div>
          </div></router-link
        >
      </div>
    </div>
    <el-table label-width="100px" :data="fakeData" width="100%">
      <el-table-column label="時間" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span class="date">{{ scope.row.date }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="公告內容" prop="contnet" />
      <el-table-column label="詳細" width="80" align="center">
        <template #default="scope" class="text-center">
          <el-icon><ArrowRight /></el-icon>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
const fakeData = [
  {
    date: "2022/07/07",
    contnet:
      "消毒通知：某某大樓於08/01 09:00後，開始進行全棟大樓消毒，施工前請盡速將個人桌面淨空。",
  },
  {
    date: "2022/07/07",
    contnet:
      "消毒通知：某某大樓於08/01 09:00後，開始進行全棟大樓消毒，施工前請盡速將個人桌面淨空。文字最多兩行文字最多兩行文字最多兩行文字最多兩行文字最多兩行...",
  },
  {
    date: "2022/07/07",
    contnet:
      "消毒通知：某某大樓於08/01 09:00後，開始進行全棟大樓消毒，施工前請盡速將個人桌面淨空。",
  },
  {
    date: "2022/07/07",
    contnet:
      "消毒通知：某某大樓於08/01 09:00後，開始進行全棟大樓消毒，施工前請盡速將個人桌面淨空。",
  },
  {
    date: "2022/07/07",
    contnet:
      "消毒通知：某某大樓於08/01 09:00後，開始進行全棟大樓消毒，施工前請盡速將個人桌面淨空。",
  },
  {
    date: "2022/07/07",
    contnet:
      "消毒通知：某某大樓於08/01 09:00後，開始進行全棟大樓消毒，施工前請盡速將個人桌面淨空。",
  },
  {
    date: "2022/07/07",
    contnet:
      "消毒通知：某某大樓於08/01 09:00後，開始進行全棟大樓消毒，施工前請盡速將個人桌面淨空。",
  },
  {
    date: "2022/07/07",
    contnet:
      "消毒通知：某某大樓於08/01 09:00後，開始進行全棟大樓消毒，施工前請盡速將個人桌面淨空。",
  },
  {
    date: "2022/07/07",
    contnet:
      "消毒通知：某某大樓於08/01 09:00後，開始進行全棟大樓消毒，施工前請盡速將個人桌面淨空。",
  },
  {
    date: "2022/07/07",
    contnet:
      "消毒通知：某某大樓於08/01 09:00後，開始進行全棟大樓消毒，施工前請盡速將個人桌面淨空。",
  },
];
</script>
<style lang="scss" scope>
.info-group {
  margin: auto -10px;
  .info-panel {
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    min-height: 150px;
    padding: 10px;
    margin: 10px 10px 20px 10px;
    background-color: $whiteColor;
    box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
    overflow: hidden;
    @include transition(all, 0.3s, linear);

    &:hover {
      cursor: pointer;
      box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
    }
    &::before,
    &::after {
      position: absolute;
      bottom: 0;
      content: "";
      width: 200px;
    }

    &::before {
      left: 50%;
      margin-left: -95px;
      height: 660px;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.03) 40%,
        rgba(0, 0, 0, 0.03) 100%
      );
      transform: rotate(-60deg);
      transform-origin: bottom right;
      z-index: 0;
    }

    &::after {
      right: 50%;
      right: 50%;
      margin-right: -25px;
      bottom: -10%;
      height: 250px;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.03) 10%,
        rgba(0, 0, 0, 0.03) 100%
      );
      transform: rotate(40deg);
      transform-origin: bottom right;
    }
    .title {
      color: #a7a8a9;
      font-size: 15px;
    }
    .quantity {
      display: inline-block;
      @include fontStyle($font-en-title, 28px, 600, default);
    }
    .category {
      position: absolute;
      right: 8px;
      bottom: 2px;
      font-size: 14px;
      color: #a7a8a9;
      font-style: italic;
    }
  }
}
.date {
  padding: 4px 10px;
  border-radius: 32px;
  color: #aaaaaa;
  background-color: #f6f6f6;
}
</style>
