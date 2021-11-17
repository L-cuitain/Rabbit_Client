<template>
  <div class="home-category" @mouseleave="current = null">
    <!--    可选链操作符
           current?.id
           if(current && current.id){}
-->
    <!--    左侧菜单-->
    <ul class="menu" v-if="menuList">
      <li
        :class="{ active: current?.id && topCategory.id === current.id }"
        @mouseenter="current = topCategory"
        v-for="topCategory in menuList"
        :key="topCategory.id"
      >
        <RouterLink to="/">{{ topCategory.name }}</RouterLink>
        <template v-if="topCategory.children">
          <RouterLink
            to="/"
            v-for="subCategory in topCategory.children"
            :key="subCategory.id"
            >{{ subCategory.name }}</RouterLink
          >
        </template>
        <template v-else>
          <XtxSkeleton
            animated="fade"
            width="60px"
            height="18px"
            bg="rgba(255,255,255,0.2)"
            style="margin-right: 5px"
          ></XtxSkeleton>
          <XtxSkeleton
            animated="fade"
            width="60px"
            height="18px"
            bg="rgba(255,255,255,0.2)"
          ></XtxSkeleton>
        </template>
      </li>
    </ul>
    <!--    分类商品-->
    <div class="layer" v-if="current">
      <h4>{{ current.goods ? "商品" : "品牌" }}推荐</h4>
      <small>根据您的购买或浏览记录推荐</small>
      <ul v-if="current.goods">
        <li v-for="goods in current.goods" :key="goods.id">
          <RouterLink to="/">
            <img :src="goods.picture" :alt="goods.name" />
            <div class="info">
              <p class="name ellipsis-2">{{ goods.name }}</p>
              <p class="desc ellipsis">{{ goods.desc }}</p>
              <p class="price"><i>¥</i>{{ goods.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>

      <!--      品牌商品推荐-->
      <ul v-if="current.brands">
        <li class="brand" v-for="brand in current.brands" :key="brand.id">
          <RouterLink to="/">
            <img :src="brand.picture" :alt="brand.name" />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>{{ brand.place }}
              </p>
              <p class="name ellipsis">{{ brand.name }}</p>
              <p class="desc ellipsis-2">{{ brand.nameEn }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";

// 引入home api 接口
import { getHotBrands } from "@/api/home";

function useMenuList() {
  //获取 store 对象
  const store = useStore();
  // 初始分类显示为空
  const current = ref(null);
  //存储品牌
  const brand = ref({
    id: "brand",
    name: "品牌",
    children: [{ id: "child-brand", name: "推荐品牌" }],
    brands: [],
  });

  //获取品牌配置
  getHotBrands(6).then((data) => {
    brand.value.brands = data.result;
  });

  //获取左侧分类所需数据
  const menuList = computed(() => {
    //截取一级分类中的二级分类个数
    const result = store.state.category.list.map((item) => ({
      ...item,
      children: item.children ? item.children.slice(0, 2) : null,
    }));
    //向分类列表中添加品牌
    result.push(brand.value);
    //返回 分类列表
    return result;
  });

  //返回处理好的分类列表数据
  return { current, menuList };
}

export default {
  //左侧分类组件
  name: "HomeCategory",
  setup() {
    //调用useMenuList函数
    const { current, menuList } = useMenuList();

    return { current, menuList };
  },
};
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover,
      &.active {
        background-color: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
      li.brand {
        height: 180px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 8px;
            }
            .place {
              color: #999;
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
