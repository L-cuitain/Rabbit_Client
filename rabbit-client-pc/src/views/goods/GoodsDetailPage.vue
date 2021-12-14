<template>
  <AppLayout>
    <div class="xtx-goods-page" v-if="goodsDetail">
      <div class="container">
        <!-- 面包屑 -->
        <XtxBread>
          <XtxBreadItem path="/">首页</XtxBreadItem>
          <XtxBreadItem :path="`/category/${goodsDetail.categories[1].id}`">{{
            goodsDetail.categories[1].name
          }}</XtxBreadItem>
          <XtxBreadItem
            :path="`/category/sub/${goodsDetail.categories[0].id}`"
            >{{ goodsDetail.categories[0].name }}</XtxBreadItem
          >
          <XtxBreadItem path="/">{{ goodsDetail.name }}</XtxBreadItem>
        </XtxBread>
        <!-- 商品信息 -->
        <div class="goods-info">
          <!-- 左侧 -->
          <div class="media">
            <GoodsImages :images="goodsDetail.mainPictures" />
            <GoodsSales />
          </div>
          <!-- 右侧 -->
          <div class="spec">
            <GoodsInfo :goods="goodsDetail" />
            <GoodsSku
              :specs="goodsDetail.specs"
              :skus="goodsDetail.skus"
              @onSpecChanged="onSpecChanged"
              @onSpecHalfChanged="goodsDetail.currentSkuId = null"
            />
            <XtxNumberBox
              label="数量"
              :max="goodsDetail.inventory"
              v-model="count"
            />
            <XtxButton
              type="primary"
              :style="{ 'margin-top': '20px' }"
              @click="addGoodsToCart"
              >加入购物车</XtxButton
            >
          </div>
        </div>
        <!-- 商品推荐 -->
        <GoodsRelevant :goodsId="goodsId" />
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <GoodsTab />
            <!-- 注意事项 -->
            <GoodsWarn />
          </div>
          <!-- 24热榜 -->
          <div class="goods-aside">
            <GoodsHot :type="1" />
            <GoodsHot :type="2" />
            <GoodsHot :type="3" />
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import { ref, provide } from "vue";
import { useRoute } from "vue-router";
//引入组件
import GoodsInfo from "@/views/goods/components/GoodsInfo";
import GoodsSales from "@/views/goods/components/GoodsSales";
import GoodsRelevant from "@/views/goods/components/GoodsRelevant";
import AppLayout from "@/components/AppLayout";
import GoodsImages from "@/views/goods/components/GoodsImages";
import GoodsSku from "@/views/goods/components/GoodsSku";

//引入api接口函数
import { getGoodsDetail } from "@/api/goods";
import XtxNumberBox from "@/components/library/XtxNumberBox";
import XtxButton from "@/components/library/XtxButton";
import GoodsTab from "@/views/goods/components/GoodsTab";
import GoodsHot from "@/views/goods/components/GoodsHot";
import GoodsWarn from "@/views/goods/components/GoodsWarn";
import Message from "@/components/library/message";

export default {
  name: "GoodsDetailPage",
  components: {
    GoodsWarn,
    GoodsHot,
    GoodsTab,
    XtxButton,
    XtxNumberBox,
    GoodsImages,
    GoodsRelevant,
    AppLayout,
    GoodsSales,
    GoodsInfo,
    GoodsSku,
  },
  setup() {
    //存储用户选择的商品
    const count = ref(1);
    //引入路由参数
    const route = useRoute();
    //获取方法返回参数
    const { goodsDetail, getData } = useGoodsDetail();
    //请求接口函数
    getData(route.params.id);

    const goodsId = route.params.id;
    //当用户选择完整规格后 更新视图
    const onSpecChanged = (data) => {
      goodsDetail.value.price = data.price;
      goodsDetail.value.oldPrice = data.oldPrice;
      goodsDetail.value.inventory = data.inventory;
      goodsDetail.value.currentSkuId = data.skuId;
      goodsDetail.value.currentAttrsText = data.attrsText;
    };
    //将商品详情开放到自组件
    provide("goodsDetail", goodsDetail);

    //将商品加入购物车
    const addGoodsToCart = () => {
      //判断用户是否选择规格，如果用户没有选择规格，不能加入购物车
      if (!goodsDetail.value.currentSkuId) {
        Message({ type: "error", text: "加入购物车失败" });
        return;
      }
      //收集商品信息
      const goods = {
        // 商品id
        id: goodsDetail.value.id,
        // 商品 skuId
        skuId: goodsDetail.value.currentSkuId,
        // 商品名称
        name: goodsDetail.value.name,
        // 商品规格属性文字
        attrsText: goodsDetail.value.currentAttrsText,
        // 商品图片
        picture: goodsDetail.value.mainPictures[0],
        // 商品原价
        price: goodsDetail.value.oldPrice,
        // 商品现价
        nowPrice: goodsDetail.value.price,
        // 是否选中
        selected: true,
        // 商品库存
        stock: goodsDetail.value.inventory,
        // 用户选择的商品数量
        count: count.value,
        // 是否为有效商品
        isEffective: true,
      };

      console.log(goods);
    };

    //返回
    return { count, goodsDetail, onSpecChanged, goodsId, addGoodsToCart };
  },
};

// 用于获取商品详细信息的方法
function useGoodsDetail() {
  // 用于存储商品详情信息
  const goodsDetail = ref();
  // 用于获取商品详情信息的方法
  const getData = (id) => {
    // 向服务器端发送请求获取商品详情信息
    getGoodsDetail(id).then((data) => {
      // 用于存储商品详情信息
      goodsDetail.value = data.result;
    });
  };
  // 返回商品详情数据和获取商品详情数据的方法
  return { goodsDetail, getData };
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
