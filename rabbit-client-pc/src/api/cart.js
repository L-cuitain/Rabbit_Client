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
