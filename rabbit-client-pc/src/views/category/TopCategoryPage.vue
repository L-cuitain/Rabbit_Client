<template>
  <AppLayout>
    <div class="container">
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="topCategory.id">{{
            topCategory?.name
          }}</XtxBreadItem>
        </Transition>
      </XtxBread>
      <!--      调用轮播图组件-->
      <XtxCarousel :carousels="banners" :style="{ height: '500px' }" />
      <!--      当前一级分类对应二级分类列表数据-->
      <ShowSubCategoryList
        :subCategories="topCategory.children"
        v-if="topCategory"
      />
    </div>
  </AppLayout>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

//引入组件
import AppLayout from "@/components/AppLayout";
import XtxBread from "@/components/library/XtxBread";
import ShowSubCategoryList from "@/views/category/components/ShowSubCategoryList";

import useBanners from "@/hooks/useBanners";

//获取面包屑组件数据
function useBread() {
  //获取路由信息对象
  const route = useRoute();
  //获取 store 对象
  const store = useStore();
  //获取当前访问的分类信息
  //刚开始 category.list 里面只有 name 没有 id , 只有真是数据请求过来后才有 id , 所以需要通过计算监控数据变化,当数据发生变化后重新查找分类数据
  return computed(() => {
    return store.state.category.list.find(
      (category) => category.id === route.params.id
    );
  });
}

export default {
  // 一级分类页面路由组件
  name: "TopCategoryPage",
  components: {
    AppLayout,
    XtxBread,
    ShowSubCategoryList,
  },
  setup() {
    //获取面包屑导航
    const topCategory = useBread();
    //获取轮播图数据
    const { banners, getData } = useBanners();
    getData(2);
    return { topCategory, banners };
  },
};
</script>

<style></style>
