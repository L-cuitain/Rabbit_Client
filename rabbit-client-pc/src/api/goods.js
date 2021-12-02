import request from "@/utils/request";

/**
 * 根据商品ID获取商品详情数据
 * @param id 商品ID
 * @returns {Promise}
 */
export function getGoodsDetail(id) {
  return request("/goods", "get", { id });
}

/**
 * 获取同类商品或猜你喜欢
 * @param id 商品id
 * @param limit 限制请求数据的数量
 * @returns {Promise}
 */
export function getRelevantGoods({ id, limit }) {
  return request("/goods/relevant", "get", { id, limit });
}

/**
 * 获取榜单数据
 * @param id 商品ID
 * @param limit 一次请求的数据数量
 * @param type 热销类型
 * @returns {Promise}
 */
export function getHotGoods({ id, limit = 3, type }) {
  return request("/goods/hot", "get", { id, limit, type });
}

/**
 * 获取评价组件头部信息
 * @param id 商品ID
 * @returns {Promise}
 */
export function getCommentInfo(id) {
  return request(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`,
    "get"
  );
}

/**
 * 获取评价列表数据
 * @param id 商品Id
 * @param params 商品信息
 * @returns {Promise}
 */
export function getCommentList(id, params) {
  return request(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`,
    "get",
    params
  );
}
