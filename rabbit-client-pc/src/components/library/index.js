//引入XtxSkeleton骨架屏
import XtxSkeleton from "@/components/library/XtxSkeleton";
//引入轮播图组件
import XtxCarousel from "@/components/library/XtxCarousel";

export default {
  install(app) {
    app.component(XtxSkeleton.name, XtxSkeleton);
    app.component(XtxCarousel.name, XtxCarousel);
  },
};
