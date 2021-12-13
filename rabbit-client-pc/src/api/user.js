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

/**
 * 在小兔鲜应用中检索该QQ绑定的账号
 * @param unionId
 * @param source
 * @returns {*|AxiosPromise}
 */
export function findAccountByQQOpenid({ unionId, source = 1 }) {
  return request("/login/social", "post", { unionId, source });
}

/**
 * 获取手机验证码
 * @param mobile 用户手机号
 * @returns {Promise}
 */
export function getMsgCodeWhenBindQQ(mobile) {
  return request("/login/social/code", "get", { mobile });
}

/**
 * 绑定手机号和QQ号
 * @param mobile 手机号
 * @param code
 * @param unionId openid
 * @returns {*|AxiosPromise}
 */
export function bindMobleAndQQ({ mobile, code, unionId }) {
  return request("/login/social/bind", "post", {
    mobile,
    code,
    unionId,
  });
}

/**
 * 检测用户名或手机号是否唯一
 * @param account 手机号或用户名
 * @returns {Promise}
 */
export function checkUsernameIsUnique(account) {
  return request("/register/check", "get", { account });
}
