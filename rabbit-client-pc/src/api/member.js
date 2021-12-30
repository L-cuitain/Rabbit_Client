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
 * @returns {Promise}
 */
export function getOrderList({ page, pageSize, orderState }) {
  return requestWithToken("/member/order", "get", {
    page,
    pageSize,
    orderState,
  });
}

/**
 * 取消订单
 * @param id 要取消的订单id
 * @param cancelReason 取消原因
 * @returns {Promise}
 */
export function cancelOrder({ id, cancelReason }) {
  return requestWithToken(`/member/order/${id}/cancel`, "put", {
    cancelReason,
  });
}

/**
 * 删除订单
 * @param ids 订单id集合
 * @returns {Promise}
 */
export function deleteOrder(ids) {
  return requestWithToken("/member/order", "delete", { ids });
}

/**
 * 确认收货
 * @param id 订单id
 * @returns {Promise}
 */
export function receiptGoods(id) {
  return requestWithToken(`/member/order/${id}/receipt`, "put");
}

/**
 * 查看订单物流信息
 * @param id 订单id
 * @returns {Promise}
 */
export function lookLogistics(id) {
  return requestWithToken(`/member/order/${id}/logistics`, "get");
}

/**
 * 根据Id创建新的订单
 * @param id 订单Id
 * @returns {Promise}
 */
export function createOrderById(id) {
  return requestWithToken(`/member/order/repurchase/${id}`, "get");
}
