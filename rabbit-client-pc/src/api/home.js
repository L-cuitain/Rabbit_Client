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
