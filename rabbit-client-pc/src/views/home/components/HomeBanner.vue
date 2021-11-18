<template>
  <!--  在该组件中调用轮播图组件 用于限制轮播大小和位置-->
  <div class="home-banner">
    <XtxCarousel v-if="banners" :carousels="banners" :autoPlay="true" />
  </div>
</template>

<script>
//引入useBanners函数
import useBanners from "@/hooks/useBanners";

export default {
  name: "HomeBanner",
  setup() {
    const { banners, getData } = useBanners();
    getData(1);
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
