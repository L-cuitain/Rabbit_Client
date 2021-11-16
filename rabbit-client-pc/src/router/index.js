import { createRouter, createWebHashHistory } from "vue-router";

//引入HomePage
const HomePage = () =>
  import(/*webpackChunkName: 'HomePage'*/ "@/views/home/HomePage");

//引入一级分类和二级分类
import TopCategoryPage from '@/views/category/TopCategoryPage';
import SubCategoryPage from '@/views/category/SubCategoryPage';

const routes = [
  {
    path: "/",
    components: HomePage,
  },
  {
    path: "/category/:id",
    components: TopCategoryPage
  },
  {
    path: "/category/sub/:id",
    components: SubCategoryPage
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
