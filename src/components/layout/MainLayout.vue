<template>
  <header-bar />
  <div class="container-fluid">
    <div class="row">
      <side-bar />
      <main
        class="ms-sm-auto px-md-3 py-md-3 py-sm-2 py-3 main-content"
        :class="[
          isCollapse ? 'col-md-9 col-lg-10 notCollapse' : 'col-md-12 col-lg-12',
        ]"
      >
        <router-view v-slot="{ Component, route }">
          <!-- 緩存頁面 -->
          <transition name="fade-scale" mode="out-in">
            <keep-alive>
              <component
                :is="Component"
                v-if="$route.meta.keepAlive"
                :key="route.path"
              />
            </keep-alive>
          </transition>
          <!-- 非緩存頁面 -->
          <transition name="fade-scale" mode="out-in">
            <component
              :is="Component"
              v-if="!$route.meta.keepAlive"
              :key="route.path"
            />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderBar from "@/components/layout/HeaderBar.vue";
import SideBar from "@/components/layout/SideBar.vue";
import { useThemeConfig } from "@/store/useThemeConfig";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "MainLayout",
  components: { HeaderBar, SideBar },
  setup() {
    const store = useThemeConfig();
    const { isCollapse } = storeToRefs(store);

    return { isCollapse };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.main-content {
  position: relative;
  height: calc(100vh - 46px);
  overflow-y: auto;
  transition: all 0.45s ease;
  &.notCollapse {
    position: absolute;
    right: 0;
    @include res(phone, to-mb) {
      position: relative;
    }
  }
}
</style>
