// 引入XtxSkeleton骨架屏
// import XtxSkeleton from "@/components/library/XtxSkeleton";
// 引入轮播图组件
// import XtxCarousel from "@/components/library/XtxCarousel";
// 引入查看更多组件
// import XtxMore from "@/components/library/XtxMore";
// 引入面包屑组件
// import XtxBread from "@/components/library/XtxBread";
// import XtxBreadItem from "@/components/library/XtxBreadItem";

// 引入懒加载图片
import lazy from "@/components/directive/lazy";

import Message from "@/components/library/message";

// require.context  批量导入模块
// 1.目录  2.是否在子目录查找模块  3.通过正则匹配文件
// 方法的返回值是一个导入函数 ， 通过这个导入函数导入组件
const importFn = require.context("./", false, /\.vue$/);
// 导入函数下有一个方法叫 keys ， 通过该方法可以获取匹配到的所有文件路径，数组类型
const keys = importFn.keys();

export default {
  install(app) {
    app.directive("lazy", lazy);
    app.config.globalProperties.$message = Message;
    // 遍历文件路径
    keys.forEach((key) => {
      // 导入组件
      const component = importFn(key).default;
      // 注册组件
      app.component(component.name, component);
    });

    // app.component(XtxSkeleton.name, XtxSkeleton);
    // app.component(XtxCarousel.name, XtxCarousel);
    // app.component(XtxMore.name, XtxMore);
    // app.component(XtxBreadItem.name, XtxBreadItem);
    // app.component(XtxBread.name, XtxBread);
  },
};
