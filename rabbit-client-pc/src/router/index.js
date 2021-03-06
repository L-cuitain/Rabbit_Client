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

//引入结算支付
const PayPage = () => import("@/views/pay/PayPage");

//引入支付成功
const PayResultPage = () => import("@/views/pay/PayResultPage");

//引入个人中心
const MemberHomePage = () => import("@/views/member/home/MemberHomePage");

const OrderView = () => import("@/views/member/order/OrderView");
const OrderListPage = () => import("@/views/member/order/OrderListPage");
const OrderDetailPage = () => import("@/views/member/order/OrderDetailPage");

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
  {
    path: "/checkout/pay",
    component: PayPage,
  },
  {
    path: "/pay/callback",
    component: PayResultPage,
  },
  {
    path: "/member/home",
    component: MemberHomePage,
  },
  {
    path: "/member/order",
    component: OrderView,
    children: [
      {
        path: "",
        component: OrderListPage,
      },
      {
        path: ":id",
        component: OrderDetailPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  //让页面切换后重新回到顶部
  scrollBehavior() {
    return { top: 0 };
  },
  routes,
  linkActiveClass: "fuzzy-active",
  linkExactActiveClass: "exact-active",
});

router.beforeEach(authGuard);

export default router;
