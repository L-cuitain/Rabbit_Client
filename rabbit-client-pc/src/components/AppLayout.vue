<template>
  <div>
    <AppTopNav />
    <AppHeader />
    <AppHeaderSticky />
    <slot />
    <AppFooter />
  </div>
</template>

<script>
import { useStore } from 'vuex';

import AppTopNav from "@/components/AppTopNav";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import AppHeaderSticky from "@/components/AppHeaderSticky";

export default {
  name: "LayoutTemplate",
  components: {
    AppTopNav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  setup(){
        //获取store对象
        const store = useStore();
        //发送请求获取分类数据
        store.dispatch("category/getCategories");
    }
};
</script>

<style lang="less">
// 为吸顶导航添加默认样式及过渡 默认情况下让元素移出屏幕
.app-header-sticky {
  transform: translateY(-100%);
  opacity: 0;
  &.show {
    transform: none;
    opacity: 1;
    transition: all 0.3s linear;
  }
}
</style>
