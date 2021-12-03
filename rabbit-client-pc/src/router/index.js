import { createRouter, createWebHashHistory } from "vue-router";

//引入HomePage
const HomePage = () => import("@/views/home/HomePage");

//引入一级分类和二级分类
const TopCategoryPage = () => import("@/views/category/TopCategoryPage");
const SubCategoryPage = () => import("@/views/category/SubCategoryPage");

//引入商品详情
const GoodsDetailPage = () => import("@/views/goods/GoodsDetailPage");

//引入登录
const LoginPage = () => import("@/views/login/LoginPage");

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/category/:id",
    component: TopCategoryPage,
  },
  {
    path: "/category/sub/:id",
    component: SubCategoryPage,
  },
  {
    path: "/goods/:id",
    component: GoodsDetailPage,
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
