<template>
  <div class="home-product" ref="target">
    <HomePanel title="生鲜" v-for="product in products" :key="product.id">
      <template v-slot:right>
        <div class="sub">
          <RouterLink to="/" v-for="sub in product.children" :key="sub.id">{{
            sub.name
          }}</RouterLink>
        </div>
        <XtxMore />
      </template>
      <template v-slot:list>
        <div class="box">
          <RouterLink class="cover" to="/">
            <img src="" v-lazy="product.picture" alt="" />
            <strong class="label">
              <span>{{ product.name }}</span>
              <span>{{ product.saleInfo }}</span>
            </strong>
          </RouterLink>
          <ul class="goods-list" v-if="product.goods">
            <li v-for="goods in product.goods" :key="goods.id">
              <HomeGoods :goods="goods" />
            </li>
          </ul>
        </div>
      </template>
    </HomePanel>
  </div>
</template>

<script>
//引入组件样式
import HomePanel from "@/views/home/components/HomePanel";
import HomeGoods from "@/views/home/components/HomeGoods";
import XtxMore from "@/components/library/XtxMore";

//引入懒加载组件
import { useLazyData } from "@/hooks/useLazyData";
//引入api接口
import { getProducts } from "@/api/home";

export default {
  //产品区块组件
  name: "HomeProduct",
  components: {
    HomeGoods,
    HomePanel,
    XtxMore,
  },
  setup() {
    //组件懒加载
    const { target, result: products } = useLazyData(getProducts);

    return { target, products };
  },
};
</script>

<style scoped lang="less">
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
