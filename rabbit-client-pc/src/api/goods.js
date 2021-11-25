import request from "@/utils/request";

/**
 * 根据商品ID获取商品详情数据
 * @param id 商品ID
 * @returns {Promise}
 */
export function getGoodsDetail(id) {
  return request("/goods", "get", { id });
}
