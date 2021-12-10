import request from "@/utils/request";

/**
 * 账号密码登录
 * @param account 账号
 * @param password 密码
 * @returns {Promise}
 */
export function loginByAccount({ account, password }) {
  return request("/login", "post", { account, password });
}

/**
 * 获取短信验证码
 * @param mobile 手机号
 * @returns {Promise}
 */
export function getMessageByMobile(mobile) {
  return request("/login/code", "get", { mobile });
}

/**
 * 通过手机号进行登录
 * @param mobile 手机号
 * @param code 验证码
 * @returns {Promise}
 */
export function loginByMobile({ mobile, code }) {
  return request("/login/code", "post", { mobile, code });
}
