import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeConfig = defineStore("themeConfig", () => {
  //state
  const isCollapse = ref<boolean>(false);
  
  //action
  const toggleSidebar = () => {
    isCollapse.value = !isCollapse.value;
  }

  return {
    isCollapse,
    toggleSidebar
  }
})