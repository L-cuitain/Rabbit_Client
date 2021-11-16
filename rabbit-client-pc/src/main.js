import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入骨架屏UI
import UI from "@/components/library";
//引入样式重置和公共样式
import "normalize.css";
import "@/assets/styles/common.less";

createApp(App).use(store).use(router).use(UI).mount("#app");
