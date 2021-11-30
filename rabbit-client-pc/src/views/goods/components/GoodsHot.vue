<template>
  <div class="goods-hot" v-if="hotGoods">
    <h3>{{ titles[type] }}</h3>
    <GoodsItem
      v-for="item in hotGoods"
      :key="item.id"
      :goods="item"
    ></GoodsItem>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRoute } from "vue-router";

import GoodsItem from "@/views/category/components/GoodsItem";
import { getHotGoods } from "@/api/goods";

export default {
  name: "GoodsHot",
  components: { GoodsItem },
  props: {
    type: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    //创建路由实例
    const route = useRoute();
    //获取热销榜单数据
    const { hotGoods, getData, titles } = useHotGoods();
    //发起请求
    getData(route.params.id, props.type);

    return { hotGoods, titles };
  },
};

//获取热销榜单数据
function useHotGoods() {
  //用于存储热销榜单数据
  const hotGoods = ref();
  const titles = ref({
    1: "24小时榜",
    2: "周榜",
    3: "总榜",
  });
  //获取热销榜单数据
  const getData = (id, type) => {
    getHotGoods({ id, type }).then((data) => {
      hotGoods.value = data.result;
    });
  };
  return { hotGoods, getData, titles };
}
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
