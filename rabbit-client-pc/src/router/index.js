import { createRouter, createWebHashHistory } from "vue-router";
import authGuard from "@/router/authGuard";

//引入HomePage
const HomePage = () => import("@/views/home/HomePage");

//引入一级分类和二级分类
const TopCategoryPage = () => import("@/views/category/TopCategoryPage");
const SubCategoryPage = () => import("@/views/category/SubCategoryPage");

//引入商品详情
const GoodsDetailPage = () => import("@/views/goods/GoodsDetailPage");

//引入登录
const LoginPage = () => import("@/views/login/LoginPage");

const LoginCallbackPage = () => import("@/views/login/LoginCallbackPage");

//引入购物车
const CartPage = () => import("@/views/cart/CartPage");

//引入购物车结算
const CheckoutPage = () => import("@/views/pay/CheckoutPage");

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
  {
    path: "/login/callback",
    component: LoginCallbackPage,
  },
  {
    path: "/cart",
    component: CartPage,
  },
  {
    path: "/checkout/order",
    component: CheckoutPage,
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

router.beforeEach(authGuard);

export default router;
