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
            <GoodsSku :specs="goodsDetail.specs" :skus="goodsDetail.skus" />
          </div>
        </div>
        <!-- 商品推荐 -->
        <GoodsRelevant></GoodsRelevant>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <div class="goods-tabs"></div>
            <!-- 注意事项 -->
            <div class="goods-warn"></div>
          </div>
          <!-- 24热榜 -->
          <div class="goods-aside"></div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import { ref } from "vue";
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

export default {
  name: "GoodsDetailPage",
  components: {
    GoodsImages,
    GoodsRelevant,
    AppLayout,
    GoodsSales,
    GoodsInfo,
    GoodsSku,
  },
  setup() {
    //引入路由参数
    const router = useRoute();
    //获取方法返回参数
    const { goodsDetail, getData } = useGoodsDetail();
    //请求接口函数
    getData(router.params.id);
    //返回
    return { goodsDetail };
  },
};

function useGoodsDetail() {
  //接受请求参数
  const goodsDetail = ref();
  const getData = (id) => {
    getGoodsDetail(id).then((data) => {
      goodsDetail.value = data.result;
    });
  };
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
