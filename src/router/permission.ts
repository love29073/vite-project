import router from ".";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import { useUserConfig } from "@/store/useUserConfig";

const whitelist: string[] = ["/login", "/process", "/404"];

router.beforeEach(async (to, from, next) => {
  const store = useUserConfig();
  const { access_token } = storeToRefs(store);
  const { getUrl } = store;
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (whitelist.includes(to.path)) {
    next();
  } else {
    if (isAuthenticated == "false") {
      ElMessage({
        message: "token失效請重新登入。",
        type: "warning",
      });
      next({ name: "Login" });
    } else {
      if (access_token.value == "") {
        sessionStorage.setItem("toPath", to.path);
        getUrl().then((data) => {
          window.location.href = data;
        });
        next();
      } else {
        next();
      }
    }
  }
});
