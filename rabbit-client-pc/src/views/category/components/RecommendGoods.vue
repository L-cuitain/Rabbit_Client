<template>
  <div class="ref-goods" v-for="sub in topCategory?.children" :key="sub.id">
    <div class="head">
      <h3>- {{ sub.name }} -</h3>
      <p class="tag">{{ sub.saleProperties }}</p>
      <XtxMore />
    </div>
    <div class="body">
      <GoodsItem :goods="goods" v-for="goods in sub.goods" :key="goods.id" />
    </div>
  </div>
</template>

<script>
import GoodsItem from "@/views/category/components/GoodsItem";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { getTopCategoryById } from "@/api/category";
import { ref } from "vue";

//获取一级分类对象
function useTopCategory() {
  //用于存储一级分类对象
  const topCategory = ref();
  //用于获取一级分类信息的方法
  const getData = (id) => {
    //获取一级分类并存储一级分类对象
    getTopCategoryById(id).then((data) => {
      topCategory.value = data.result;
    });
  };
  //在路由切换之前 获取到目标路由参数id 根据id 获取最新的一级分类信息
  onBeforeRouteUpdate((to) => getData(to.params.id));

  return { topCategory, getData };
}

export default {
  name: "RecommendGoods",
  components: {
    GoodsItem,
  },
  setup() {
    // 获取理由信息对象
    const route = useRoute();
    const { topCategory, getData } = useTopCategory();
    getData(route.params.id);
    //返回数据
    return { topCategory };
  },
};
</script>

<style scoped lang="less">
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
