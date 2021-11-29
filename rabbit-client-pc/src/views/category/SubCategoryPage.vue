<template>
  <AppLayout>
    <div class="container">
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <XtxBreadItem :path="`/category/${category?.TopCategory?.id}`">{{
          category?.TopCategory?.name
        }}</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <!--          为什么加 key-->
          <!--          动画执行的先决条件是元素的卸载和挂载，而每次导航切换时，变化的只是 category.name，-->
          <!--          标签是没有变化的，加key为了让元素发生变化，从而执行动画，每个分类的ID都不一样，-->
          <!--          所有分类 ID 变化，元素必定重新渲染-->
          <XtxBreadItem :key="category?.SubCategory?.id">{{
            category?.SubCategory?.name
          }}</XtxBreadItem>
        </Transition>
      </XtxBread>

      <!--      筛选商品列表-->
      <SubFilter @onFilterParamsChanged="onFilterSortChanged" />
      <!--      商品区块-->
      <div class="goods-list">
        <!--      排序组件-->
        <SubSort @onSortParamsChanged="onFilterSortChanged" />
        <!--        商品列表-->
        <GoodsList :goods="goodsList.items" v-if="goodsList" />
        <!--        是否加载下一页或显示已全部加载-->
        <XtxInfiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="loadMore"
        />
      </div>
    </div>
  </AppLayout>
</template>

<script>
import { ref, watch, onUpdated } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

import AppLayout from "@/components/AppLayout";
import XtxBread from "@/components/library/XtxBread";
import SubFilter from "@/views/category/components/SubFilter";
import SubSort from "@/views/category/components/SubSort";
import GoodsList from "@/views/category/components/GoodsList";

import { getGoodsReq } from "@/api/category";
import XtxInfiniteLoading from "@/components/library/XtxInfiniteLoading";

export default {
  // 二级分类页面
  name: "subCategoryPage",
  components: {
    XtxInfiniteLoading,
    AppLayout,
    XtxBread,
    SubFilter,
    SubSort,
    GoodsList,
  },
  setup() {
    //获取category
    const category = useBread();

    //获取商品列表
    const { goodsList, onFilterSortChanged, loading, finished, loadMore } =
      useGoods();
    onUpdated(() => {
      console.log(goodsList.value);
    });
    //返回数据
    return {
      category,
      goodsList,
      onFilterSortChanged,
      loading,
      finished,
      loadMore,
    };
  },
};

//获取商品数据
function useGoods() {
  //用于标识加载状态
  const loading = ref(false);
  //用于标识是否全部数据都已经加载完成
  const finished = ref(false);
  //存储商品数据
  const goodsList = ref(null);
  //获取路由对象
  const route = useRoute();
  //获取商品列表用到的请求参数
  const reqParams = ref({
    categoryId: route.params.id,
    //当前页
    page: 0,
    //每次请求获取的数据条数
    pageSize: 5,
  });
  //用于获取商品列表方法
  const getData = () => {
    //更新加载状态
    loading.value = true;
    //像服务端请求获取商品
    getGoodsReq(reqParams.value).then((data) => {
      //如果是第一页，直接赋值
      if (reqParams.value.page === 1) {
        //存储商品数据
        goodsList.value = data.result;
        //数据加载完成 更新加载状态
        finished.value = false;
      } else {
        //如果当前不是第一页 ， 商品列表数据进行累加
        goodsList.value = {
          ...data.result,
          items: [...goodsList.value.items, ...data.result.items],
        };
      }
      //更新加载状态
      loading.value = false;

      //判断goodsList是否为空
      if (goodsList.value.length < 0) {
        //所有数据加载完成
        finished.value = true;
      }

      //如果当前页已经是最后一页
      if (reqParams.value.page === data.result.pages) {
        //所有数据加载完成
        finished.value = true;
      }
    });
  };

  //加载更多数据
  const loadMore = () => {
    reqParams.value = {
      ...reqParams.value,
      page: reqParams.value.page + 1,
    };
  };
  //当筛选条件发生变化时
  const onFilterSortChanged = (target) => {
    reqParams.value = { ...reqParams.value, ...target, page: 1 };
  };

  //添加watch监听请求参数的变化
  watch(
    () => reqParams.value,
    () => {
      getData();
    }
  );
  //onBeforeRouteUpdate监听路由参数的变化
  onBeforeRouteUpdate((to) => {
    reqParams.value = { ...reqParams.value, categoryId: to.params.id, page: 1 };
  });
  //返回商品列表
  return {
    goodsList,
    getData,
    onFilterSortChanged,
    loading,
    finished,
    loadMore,
  };
}

//渲染面包屑
function useBread() {
  //获取路由信息对象
  const route = useRoute();
  //获取 store 对象
  const store = useStore();
  //获取面包屑需要的分类信息
  return computed(() => {
    //临时存储一级分类
    let TopCategory = null;
    //临时存储二级分类
    let SubCategory = null;
    //遍历一级分类
    store.state.category.list.forEach((top) => {
      //遍历二级分类
      top.children?.forEach((sub) => {
        //判断是否是当前分类
        if (sub.id === route.params.id) {
          //存储一级分类
          TopCategory = top;
          //存储二级分类
          SubCategory = sub;
        }
      });
    });
    //返回分类数据
    return { TopCategory, SubCategory };
  });
}
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
