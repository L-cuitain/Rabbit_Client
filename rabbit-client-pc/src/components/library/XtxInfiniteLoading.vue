<template>
  <div class="xtx-infinite-loading" ref="target">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

export default {
  //底部加载下一页组件
  name: "XtxInfiniteLoading",
  props: {
    //是否正在加载
    loading: {
      type: Boolean,
      default: false,
    },
    //是否全部加载
    finished: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    //被监听元素
    const target = ref(null);
    //执行监听元素操作
    useIntersectionObserver(target, ([{ isIntersecting }]) => {
      //如果元素进入可视区
      if (isIntersecting) {
        //如果没有正在加载并且还有数据可以加载
        if (!props.loading && !props.finished) {
          //通过触发自定义事件告诉父组件，元素进入可视区
          emit("infinite");
        }
      }
    });
    return { target };
  },
};
</script>

<style scoped lang="less">
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(../../assets/images/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 200px;
      height: 134px;
      background: url(../../assets/images/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
