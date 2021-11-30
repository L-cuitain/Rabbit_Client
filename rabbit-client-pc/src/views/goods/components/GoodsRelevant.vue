<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon"></i>
      <span class="title">{{ goodsId ? "同类商品推荐" : "猜你喜欢" }}</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <XtxCarousel :carousels="carousels" />
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import _ from "lodash";

import { getRelevantGoods } from "@/api/goods";
import XtxCarousel from "@/components/library/XtxCarousel";

export default {
  name: "GoodsRelevant",
  components: { XtxCarousel },
  props: {
    goodsId: {
      type: String,
    },
  },
  setup() {
    //创建路由实例
    const route = useRoute();
    const { relevantGoods, getData, carousels } = useRelevantGoods();
    getData(route.params.id);

    return { relevantGoods, carousels };
  },
};

function useRelevantGoods() {
  //存储获取的同类商品数据
  const relevantGoods = ref();
  //用户存储轮播图数据
  const carousels = ref([]);
  //向服务器发起请求 获取商品数据
  const getData = (id, limit) => {
    getRelevantGoods({ id, limit }).then((data) => {
      //每页显示的条数
      const size = 4;
      //通过lodash的函数对数据进行分组
      carousels.value = _.chunk(data.result, size);
      //总页数
      // const total = Math.ceil(data.result.length / size);

      // //循环次数为总页数
      // for (let i = 0; i < total; i++) {
      //   //构建二维数组
      //   carousels.value.push(data.result.slice(i * size, i * size + size));
      // }
      relevantGoods.value = data.result;
    });
  };
  return { relevantGoods, getData, carousels };
}
</script>

<style scoped lang="less">
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
  :deep(.xtx-carousel) {
    height: 380px;
    .carousel {
      &-indicator {
        bottom: 30px;
        span {
          &.active {
            background: @xtxColor;
          }
        }
      }
      &-btn {
        top: 110px;
        opacity: 1;
        background: rgba(0, 0, 0, 0);
        color: #ddd;
        i {
          font-size: 30px;
        }
      }
    }
  }
}
</style>
