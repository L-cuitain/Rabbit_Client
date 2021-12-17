import request from "@/utils/request";

/**
 * 根据 skuId 更新商品信息(库存，是否有效，现价)
 * @param skuId
 * @returns {Promise}
 */
export function updateGoodsOfCartBySkuId(skuId) {
  return request(`/goods/stock/${skuId}`, "get");
}
