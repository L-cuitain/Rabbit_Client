// 引入request工具
import request from "@/utils/request";

// 创建品牌推荐的API接口
/**
 * @typedef {Object} Brand 品牌
 * @property {string} id 品牌ID
 * @property {string} picture 品牌封面
 * @property {string} name 品牌名称
 * @property {string} nameEn 品牌英文名称
 * @property {string} place 地点
 */

/**
 * 获取热门品牌
 * @param limit -请求多少数据
 * @returns {Promise<result: Array<Brand>>}
 */
export function getHotBrands(limit = 6) {
  return request("home/brand", "get", { limit });
}

/**
 * @typedef {Object} Banner
 * @property {string} id - 数据id
 * @property {string} imgUrl - 跳转链接
 * @property {string} hrefUrl - 跳转链接
 * @property {number} type - 跳转类型 1、页面2、H5 3、小程序
 *
 */

/**
 * 获取轮播图数据
 * @param distributionsSite  广告投放位置 1 首页 2 分类页面
 * @returns {Promise<{result: Array<Banner>}>} 广告图列表
 */
export function getBanners(distributionsSite = 1) {
  return request("/home/banner", "get", { distributionsSite });
}

/**
 * @typedef {Object} newGoods - 新鲜好物
 * @property {string} id - 数据ID
 * @property {string} picture - 商品图片
 * @property {string} name - 商品名称
 * @property {string} price - 商品价格
 * @property {string} desc - 商品描述
 */

/**
 * 获取新鲜好物
 * @param {number} limit 限制获取的数据条数
 * @returns {AxiosPromise<result: Array<newGoods>>}
 */
export function getNewGoods(limit = 4) {
  return request("/home/new", "get", { limit });
}

/**
 * @typedef {Object} hotGoods
 * @property {string} id - 数据ID
 * @property {string} picture - 商品图片
 * @property {string} title - 商品标题
 * @property {string} alt - 商品描述
 */

/**
 * 获取人气推荐
 * @returns {AxiosPromise<{result: Array<hotGoods>}>}
 */
export function getHomeHot() {
  return request("/home/hot", "get");
}

/**
 * @typedef {Object} Product  产品区块数据
 * @property {string} id - 分类id
 * @property {string} name - 分类名称
 * @property {string} picture - 分类封面图片
 * @property {string} saleInfo - 售卖信息
 * @property {Array<RecommendGoods>} goods - 产品信息
 * @property {Array<SubCategory>} children - 二级分类信息
 */

/**
 * @typedef {Object} SubCategory - 二级分类
 * @property {string} id - 数据id
 * @property {string} name - 分类名称
 */

/**
 * 获取产品区块数据
 * @returns {Promise<{result: Array<Product>}>}
 */
export function getProducts() {
  return request("/home/goods", "get");
}

/**
 * @typedef {object} Special - 专题
 * @property {string} id - 数据ID
 * @property {string} title - 标题
 * @property {summary} summary - 副标题
 * @property {number} lowestPrice - 最低价格
 * @property {string} cover - 专题封面
 * @property {string} detailsUrl - 详情链接
 * @property {number} collectNum - 收藏数
 * @property {number} viewNum - 浏览数
 * @property {number} replyNum - 评论数量
 */

/**
 * 获取最新专题
 * @param {number} limit 限制请求数据的数量
 * @returns {Promise<result: Array<Special>>}
 */
export function getSpecial(limit) {
  return request("/home/special", "get", { limit });
}
