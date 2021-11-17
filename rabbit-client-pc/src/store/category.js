//分类模块状态
import { getCategoriesReq } from "@/api/category";
import { topCategories } from "@/api/constants";

export default {
  //使用具有命名空间的 vuex 模块
  namespaced: true,
  state() {
    return {
      //存储分类列表
      list: topCategories.map((categoryName) => ({ name: categoryName })),
    };
  },
  mutations: {
    /**
     * 设置分类列表数据
     * @param state
     * @param {Array<Category>} categories - 分类列表
     */
    setCategories(state, categories) {
      state.list = categories;
    },
    /**
     * 控制导航下拉菜单的显示
     * @param state 状态对象
     * @param id 一级分类ID
     */
    open(state, id) {
      const target = state.list.find((item) => item.id === id);
      target.open = true;
    },
    /**
     * 控制导航下拉菜单的隐藏
     * @param state 状态对象
     * @param id 一级分类
     */
    close(state, id) {
      const target = state.list.find((item) => item.id === id);
      target.open = false;
    },
  },
  actions: {
    /**
     * 向服务器端发送请求获取分类列表数据
     * @param commit
     * @return {Promise<void>}
     */
    async getCategories({ commit }) {
      //发送请求获取数据
      const data = await getCategoriesReq();
      //为每一个一级分类数据添加 open 属性  用于控制其对应的二级分类显示和隐藏
      data.result.forEach((category) => (category.open = false));
      //将数据存储到vuex中
      commit("setCategories", data.result);
    },
  },
};
