<template>
  <!--  在该组件中调用轮播图组件 用于限制轮播大小和位置-->
  <div class="home-banner">
    <XtxCarousel v-if="banners" :carousels="banners" :autoPlay="true" />
  </div>
</template>

<script>
import { ref } from "vue";
import { getBanners } from "@/api/home";

//获取轮播图数据
function useBanners() {
  //用于存储轮播图数据
  const banners = ref(null);
  //获取轮播图数据
  getBanners().then((data) => {
    //存储轮播图数据
    banners.value = data.result;
  });
  //返回轮播图数据
  return banners;
}

export default {
  name: "HomeBanner",
  setup() {
    const banners = useBanners();
    return { banners };
  },
};
</script>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  .xtx-carousel {
    :deep(.carousel-btn.prev) {
      left: 270px;
    }
    :deep(.carousel-indicator) {
      padding-left: 250px;
    }
  }
}
</style>
