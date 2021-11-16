import { createStore } from "vuex";

//引入 vuex-persistedstate插件
import createPersistedState from "vuex-persistedstate";

//引入其他模块
import user from "@/store/user";
import cart from "@/store/cart";
import category from "@/store/category";

export default createStore({
  //配置
  plugins: [
    createPersistedState({
      //数据存储在 localStorage 时的 key
      key: "rabbit-client-pc",
      //指定将哪些模块中的数据同步到本地
      paths: ["user", "cart"],
    }),
  ],
  //模块
  modules: {
    user,
    cart,
    category,
  },
});
