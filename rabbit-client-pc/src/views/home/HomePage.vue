<template>
  <AppLayout>
    <div class="container">
      <HomeCategory />
      <HomeBanner />
      <!--      新鲜好物-->
      <HomeNew />
      <!--      人气推荐-->
      <HomeHot />
      <!--      热门品牌-->
      <HomeBrand />
      <!--      产品区块-->
      <HomeProduct />
      <!--      最新专题-->
      <HomeSpecial />
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout.vue";
import HomeCategory from "@/views/home/components/HomeCategory.vue";
import HomeBanner from "@/views/home/components/HomeBanner";
import HomeNew from "@/views/home/components/HomeNew";
import HomeHot from "@/views/home/components/HomeHot";
import HomeBrand from "@/views/home/components/HomeBrand";
import HomeProduct from "@/views/home/components/HomeProduct";
import HomeSpecial from "@/views/home/components/HomeSpecial";

export default {
  //主页组件
  name: "HomePage",
  components: {
    AppLayout,
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpecial,
  },
};
</script>

<style></style>
