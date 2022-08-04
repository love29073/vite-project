import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "@/assets/scss/global.scss";

import DashboardLayout from "@/components/layout/DashboardLayout.vue";
import EmptyLayout from "@/components/layout/EmptyLayout.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus)
app.component("default-layout", DashboardLayout);
app.component("empty-layout", EmptyLayout);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount("#app");