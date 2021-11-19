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
      <SubFilter @onFilterParamsChanged="onParamsChanged" />
    </div>
  </AppLayout>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

import AppLayout from "@/components/AppLayout";
import XtxBread from "@/components/library/XtxBread";
import SubFilter from "@/views/category/components/SubFilter";

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

export default {
  // 二级分类页面
  name: "subCategoryPage",
  components: {
    AppLayout,
    XtxBread,
    SubFilter,
  },
  setup() {
    //获取用户选择的筛选条件
    const onParamsChanged = (target) => {
      console.log(target);
    };
    //获取category
    const category = useBread();
    return { category, onParamsChanged };
  },
};
</script>

<style></style>
