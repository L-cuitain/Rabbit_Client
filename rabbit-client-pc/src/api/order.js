import { requestWithToken } from "@/utils/request";

/**
 * 创建订单，提交订单信息
 * @returns {AxiosPromise}
 */
export function createOrder() {
  return requestWithToken("/member/order/pre", "get");
}

/**
 * 添加收货地址
 * @param address 收货地址对象
 * @returns {Promise}
 */
export function addAddress(address) {
  return requestWithToken("/member/address", "post", address);
}

/**
 * 获取收货地址列表
 * @returns {Promise}
 */
export function getAddress() {
  return requestWithToken("/member/address", "get");
}

/**
 * 根据收货地址id更改收货地址
 * @param address 收获地址对象
 * @returns {Promise}
 */
export function updateAddress(address) {
  return requestWithToken(`/member/address/${address.id}`, "put", address);
}

/**
 * 提交订单
 * @param order 订单信息对象
 * @returns {Promise}
 */
export function submitOrder(order) {
  return requestWithToken("/member/order", "post", order);
}

/**
 * 获取订单详情 根据订单id 获取订单详情
 * @param id 订单id
 * @returns {Promise}
 */
export function getOrderDetail(id) {
  return requestWithToken(`/member/order/${id}`, "get");
}
