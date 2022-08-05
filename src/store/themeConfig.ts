import { defineStore } from 'pinia'

type ThemeConfigState = {
  isCollapse: boolean;
};
export const useThemeConfig = defineStore("themeConfig", {
  state: () => {
    return {
      isCollapse: false
    } as ThemeConfigState;
  },
  actions: {
    switch(){
      this.isCollapse = !this.isCollapse;
    }
  },
});