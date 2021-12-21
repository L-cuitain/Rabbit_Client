import request, { requestWithToken } from "@/utils/request";

/**
 * 根据 skuId 更新商品信息(库存，是否有效，现价)
 * @param skuId
 * @returns {Promise}
 */
export function updateGoodsOfCartBySkuId(skuId) {
  return request(`/goods/stock/${skuId}`, "get");
}

/**
 * 获取商品的sku 信息 供用户选择的规格选项数据 所有可组合的规格数据
 * @param skuId 商品skuId
 * @returns {Promise}
 */
export function getGoodsOfSkuInfo(skuId) {
  return request(`/goods/sku/${skuId}`, "get");
}

/**
 * 合并购物车
 * @param cart Array[] { skuId , }
 * @returns {Promise}
 */
export function mergeServerCart(cart) {
  return requestWithToken("/member/cart/merge", "post", cart);
}

/**
 * 获取服务器端购物车列表
 * @returns {Promise}
 */
export function getServerCart() {
  return requestWithToken("/member/cart", "get");
}

/**
 * 将商品添加到服务器端购物车
 * @param skuId 商品id
 * @param count 商品数量
 * @returns {Promise}
 */
export function addGoodsToServerCart({ skuId, count }) {
  return requestWithToken("/member/cart", "post", { skuId, count });
}

/**
 * 删除服务器端购物车中的商品
 * @param ids 数组类型，包含要删除的skuId
 * @returns {Promise}
 */
export function deleteGoodsOfServerCart(ids) {
  return requestWithToken("/member/cart", "delete", { ids });
}

/**
 * 更新服务器端中的商品信息
 * @param skuId 商品skuId
 * @param selected 商品选中状态
 * @param count 商品数量
 * @returns {Promise}
 */
export function updateGoodsOfServerCart({ skuId, selected, count }) {
  return requestWithToken(`/member/cart/${skuId}`, "put", { selected, count });
}

/**
 * 实现全选和取消全选
 * @param selected 选中状态
 * @param ids 要更新的商品skuId
 * @returns {Promise}
 */
export function selectedOrNotSelected({ selected, ids }) {
  return requestWithToken("/member/cart/selected", "put", { selected, ids });
}
