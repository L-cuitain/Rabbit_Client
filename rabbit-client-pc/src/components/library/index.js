//引入XtxSkeleton骨架屏
import XtxSkeleton from "@/components/library/XtxSkeleton";
//引入轮播图组件
import XtxCarousel from "@/components/library/XtxCarousel";
//引入查看更多组件
import XtxMore from "@/components/library/XtxMore";
//引入懒加载图片
import lazy from "@/components/directive/lazy";

export default {
  install(app) {
    app.component(XtxSkeleton.name, XtxSkeleton);
    app.component(XtxCarousel.name, XtxCarousel);
    app.component(XtxMore.name, XtxMore);
    app.directive("lazy", lazy);
  },
};
