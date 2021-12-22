//购物车模块状态

import {
  addGoodsToServerCart,
  getServerCart,
  mergeServerCart,
  updateGoodsOfCartBySkuId,
  deleteGoodsOfServerCart,
  updateGoodsOfServerCart,
  selectedOrNotSelected,
} from "@/api/cart";

const cart = {
  namespaced: true,
  state() {
    return {
      //存储购物车列表
      list: [],
    };
  },
  mutations: {
    //将商品加入本地购物车
    addGoodsToCart(state, goods) {
      //查看当前商品是否已经在购物车中
      const index = state.list.findIndex((item) => item.skuId === goods.skuId);
      if (index > -1) {
        //找到 累加商品数量
        state.list[index].count += goods.count;
        //将该商品添加到购物车顶部
        state.list.unshift(state.list.splice(index, 1)[0]);
      } else {
        //没找到 直接将商品添加到购物车列表顶部
        state.list.unshift(goods);
      }
    },
    //删除本地购物车中的商品
    deleteGoodsOfCart(state, skuId) {
      //通过skuId返回商品索引
      const index = state.list.findIndex((item) => item.skuId === skuId);
      //删除此索引对应的数据
      if (index > -1) {
        //slice 从数组进行截取
        state.list = [
          ...state.list.slice(0, index),
          ...state.list.slice(index + 1),
        ];
      }
    },
    //根据skuId 更新商品信息
    updateGoodsBySkuId(state, partOfGoods) {
      const index = state.list.findIndex(
        (item) => item.skuId === partOfGoods.skuId
      );
      //更新商品
      state.list[index] = {
        ...state.list[index],
        ...partOfGoods,
      };
    },
    //设置状态
    setCart(state, payload) {
      state.list = payload;
    },
  },
  actions: {
    //将商品加入购物车
    async addGoodsToCart({ rootState, commit, dispatch }, goods) {
      //如果要加入购物车商品已经在购物车中，累加该商品的数量
      //新添加到购物车到商品显示到购物车列表顶部
      //判断用户是否登录 登录操作服务器端购物车 没登录操作本地购物车
      if (rootState.user.profile.token) {
        //已登录
        await addGoodsToServerCart({ skuId: goods.skuId, count: goods.count });
        //将服务器端最新购物车列表同步到本地
        dispatch("updateGoodsBySkuId");
      } else {
        //未登录
        commit("addGoodsToCart", goods);
      }
    },
    //删除购物车中的商品(skuId)
    async deleteGoodsOfCart({ rootState, commit, dispatch }, skuId) {
      if (rootState.user.profile.token) {
        //已登录
        await deleteGoodsOfServerCart([skuId]);
        //将服务器端最新购物车列表同步到本地
        dispatch("updateGoodsBySkuId");
      } else {
        //未登录
        commit("deleteGoodsOfCart", skuId);
      }
    },
    //更新购物车中的商品信息(自动更新)
    async updateGoodsBySkuId({ rootState, state, commit }) {
      //判断用户是否登录
      if (rootState.user.profile.token) {
        //已登录
        let data = await getServerCart();
        commit("setCart", data.result);
      } else {
        //未登录 发送请求 发起promise请求更新商品信息
        const promiseAry = state.list.map((item) =>
          updateGoodsOfCartBySkuId(item.skuId)
        );
        Promise.all(promiseAry).then((data) => {
          data.forEach((item, index) => {
            item.result.skuId = state.list[index].skuId;

            commit("updateGoodsBySkuId", item.result);
          });
        });
      }
    },
    //更新购物车商品选中信息(手动更新)
    async updateGoodsOfCartBySkuId(
      { rootState, commit, dispatch },
      partOfGoods
    ) {
      if (rootState.user.profile.token) {
        //已登录
        await updateGoodsOfServerCart(partOfGoods);
        //将服务器端最新购物车列表同步到本地
        dispatch("updateGoodsBySkuId");
      } else {
        //未登录
        commit("updateGoodsBySkuId", partOfGoods);
      }
    },
    //实现全选和全不选
    async selectedAll(
      { rootState, state, getters, commit, dispatch },
      isSelected
    ) {
      if (rootState.user.profile.token) {
        //已登录
        const ids = getters.effectiveGoodsList.map((item) => item.skuId);
        //向服务器端发送请求 更改选中状态
        await selectedOrNotSelected({ selected: isSelected, ids });
        //将服务器端最新购物车列表同步到本地
        dispatch("updateGoodsBySkuId");
      } else {
        //未登录
        state.list.forEach((item) => {
          commit("updateGoodsBySkuId", {
            skuId: item.skuId,
            selected: isSelected,
          });
        });
      }
    },
    //批量删除用户选择商品、清空无效商品
    async deleteManyGoodsOfCart(
      { rootState, getters, commit, dispatch },
      flag
    ) {
      //判断用户是否登录
      if (rootState.user.profile.token) {
        //已登录
        //收集要删除的商品skuId
        const ids = getters[flag].map((item) => item.skuId);
        //发送请求进行删除
        await deleteGoodsOfServerCart(ids);
        //更新本地购物车列表
        dispatch("updateGoodsBySkuId");
      } else {
        //未登录
        getters[flag].forEach((item) => {
          commit("deleteGoodsOfCart", item.skuId);
        });
      }
    },
    //修改商品规格信息
    async updateGoodsOfCartBySkuChanged(
      { rootState, state, commit, dispatch },
      { oldSkuId, newSku }
    ) {
      //通过 oldSkuId 查找原有商品
      const oldGoodsIndex = state.list.findIndex(
        (item) => item.skuId === oldSkuId
      );

      if (rootState.user.profile.token) {
        //已登录
        //删除原有商品
        await deleteGoodsOfServerCart([oldSkuId]);
        //添加新商品
        await addGoodsToServerCart({
          skuId: newSku.skuId,
          count: state.list[oldGoodsIndex].count,
        });
        //更新本地购物车列表
        dispatch("updateGoodsBySkuId");
      } else {
        //未登录
        //通过 newSku 构建新的商品信息
        const newGoods = {
          ...state.list[oldGoodsIndex],
          skuId: newSku.skuId,
          stock: newSku.inventory,
          oldPrice: newSku.oldPrice,
          nowPrice: newSku.price,
          attrsText: newSku.attrsText,
        };
        //删除旧商品
        commit("deleteGoodsOfCart", oldSkuId);
        //插入新商品
        commit("addGoodsToCart", newGoods);
      }
    },
    //合并购物车
    async mergeCart({ state, commit }) {
      //不需要判断用户是否登录
      const cart = state.list.map((item) => ({
        skuId: item.skuId,
        selected: item.selected,
        count: item.count,
      }));

      await mergeServerCart(cart);
      //清空本地购物车
      commit("setCart", []);
    },
  },
  getters: {
    //可购买的商品列表
    effectiveGoodsList(state) {
      //商品库存大于0
      //商品有效 为真
      return state.list.filter((item) => item.stock > 0 && item.isEffective);
    },
    //可购买的商品价格
    effectiveGoodsPrice(state, getters) {
      return getters.effectiveGoodsList.reduce((price, item) => {
        //累加商品数量 * 商品价格
        return price + item.count * Number(item.nowPrice);
      }, 0);
    },
    //可购买的商品总数
    effectiveGoodsCount(state, getters) {
      return getters.effectiveGoodsList.reduce((count, item) => {
        return count + item.count;
      }, 0);
    },

    //无效商品列表
    invalidGoodsList(state) {
      //库存为0
      return state.list.filter((item) => item.stock === 0 || !item.isEffective);
    },
    //用户选择的商品列表
    selectedGoodsList(state, getters) {
      return getters.effectiveGoodsList.filter((item) => item.selected);
    },
    //用户选择的商品总价
    selectedGoodsPrice(state, getters) {
      return getters.selectedGoodsList.reduce((price, item) => {
        return price + item.count * Number(item.nowPrice);
      }, 0);
    },
    //用户选择的商品数量
    selectedGoodsCount(state, getters) {
      return getters.selectedGoodsList.reduce((count, item) => {
        return count + item.count;
      }, 0);
    },
    //计算全选按钮的状态
    selectedAllButtonStatus(state, getters) {
      //有效商品数量大于0
      return (
        getters.effectiveGoodsCount > 0 &&
        getters.selectedGoodsCount === getters.effectiveGoodsCount
      );
    },
  },
};

export default cart;
