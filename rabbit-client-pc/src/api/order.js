import { requestWithToken } from "@/utils/request";

/**
 * 创建订单，提交订单信息
 * @returns {AxiosPromise}
 */
export function createOrder() {
  return requestWithToken("/member/order/pre", "get");
}
