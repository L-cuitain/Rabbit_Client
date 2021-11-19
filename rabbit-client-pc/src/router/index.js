import { createRouter, createWebHashHistory } from "vue-router";

//引入HomePage
const HomePage = () => import("@/views/home/HomePage");

//引入一级分类和二级分类
const TopCategoryPage = () => import("@/views/category/TopCategoryPage");
const SubCategoryPage = () => import("@/views/category/SubCategoryPage");

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/category/:id",
    component: TopCategoryPage,
  },
  {
    path: "/category/sub/:id",
    component: SubCategoryPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  //让页面切换后重新回到顶部
  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});

export default router;
