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
