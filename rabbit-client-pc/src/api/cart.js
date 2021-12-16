import request from "@/utils/request";

/**
 * 根据 skuId 更新商品
 * @param skuId
 * @returns {Promise}
 */
export function updateGoodsOfCartBySkuId(skuId) {
  return request(`/goods/stock/${skuId}`, "get");
}
