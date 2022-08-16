import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeConfig = defineStore("themeConfig", () => {
  //state
  const isCollapse = ref<boolean>(true);

  //action
  const toggleSidebar = () => {
    isCollapse.value = !isCollapse.value;
  };

  return {
    isCollapse,
    toggleSidebar,
  };
});
