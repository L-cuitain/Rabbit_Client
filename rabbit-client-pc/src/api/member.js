import { requestWithToken } from "@/utils/request";

/**
 * 获取收藏数据
 * @param page 当前页
 * @param pageSize 每页显示多少数据
 * @param collectType 收藏类型
 * @returns {Promise}
 */
export function getCollection({ page, pageSize, collectType = 1 }) {
  return requestWithToken("/member/collect", "get", {
    page,
    pageSize,
    collectType,
  });
}

/**
 * 获取订单列表
 * @param page 页码
 * @param pageSize 每页显示多少条数据
 * @param orderState
 * @returns {AxiosPromise}
 */
export function getOrderList({ page, pageSize, orderState }) {
  return requestWithToken("/member/order", "get", {
    page,
    pageSize,
    orderState,
  });
}
