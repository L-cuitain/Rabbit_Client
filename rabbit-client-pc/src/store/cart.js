//购物车模块状态

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
      console.log(index);
      if (index > -1) {
        //找到 累加商品数量
        state.list[index].count += goods.count;
        //将该商品添加到购物车顶部
        state.list.unshift(state.list.splice(index, 1)[0]);
      } else {
        console.log(goods);
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
  },
  actions: {
    //将商品加入购物车
    addGoodsToCart({ rootState, commit }, goods) {
      //如果要加入购物车商品已经在购物车中，累加该商品的数量
      //新添加到购物车到商品显示到购物车列表顶部
      //判断用户是否登录 登录操作服务器端购物车 没登录操作本地购物车
      if (rootState.user.profile.token) {
        //已登录
      } else {
        //未登录
        commit("addGoodsToCart", goods);
      }
    },
    //删除购物车中的商品(skuId)
    deleteGoodsOfCart({ rootState, commit }, skuId) {
      if (rootState.user.profile.token) {
        //已登录
      } else {
        //未登录
        commit("deleteGoodsOfCart", skuId);
      }
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
  },
};

export default cart;
