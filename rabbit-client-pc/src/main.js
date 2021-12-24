import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入骨架屏UI
import UI from "@/components/library";
//引入样式重置和公共样式
import "normalize.css";
import "@/assets/styles/common.less";

//如果当前程序运行开发环境
if (process.env.NODE_ENV === "development") {
  //启动拦截程序
  //动态引入 worker
  const worker = require("./mocks/worker").default;
  //启动拦截程序
  worker.start({ onUnhandledRequest() {} }).then(() => {
    console.log("msw拦截程序启动成功");
  });
}

createApp(App).use(store).use(router).use(UI).mount("#app");
