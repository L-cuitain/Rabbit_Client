<template>
  <HomePanel title="热门品牌" subTitle="国际经典 品质保证" ref="target">
    <template v-slot:right>
      <a
        href="javascript:"
        class="iconfont icon-angle-left prev"
        @click="toggle(-1)"
        :class="{ disabled: currentIndex === 0 }"
      ></a>
      <a
        href="javascript:"
        class="iconfont icon-angle-right next"
        @click="toggle(1)"
        :class="{ disabled: currentIndex === 1 }"
      ></a>
    </template>
    <template v-slot:list>
      <div class="box">
        <ul
          class="list"
          :style="{ transform: `translateX(${-currentIndex * 1240}px)` }"
          v-if="brands"
        >
          <li v-for="brand in brands" :key="brand.id">
            <RouterLink to="/">
              <img :src="brand.picture" :alt="brand.name" />
            </RouterLink>
          </li>
        </ul>
        <Transition name="fade">
          <div v-if="!brands" class="skeleton">
            <XtxSkeleton
              class="item"
              v-for="i in 5"
              :key="i"
              animated="scroll"
              bg="#e4e4e4"
              width="240px"
              height="305px"
            ></XtxSkeleton>
          </div>
        </Transition>
      </div>
    </template>
  </HomePanel>
</template>

<script>
import { ref } from "vue";
//引入组件样式
import HomePanel from "@/views/home/components/HomePanel";
import XtxSkeleton from "@/components/library/XtxSkeleton";
//请求API接口
import { getHotBrands } from "@/api/home";
//引入懒加载组件
import { useLazyData } from "@/hooks/useLazyData";

//抽取图片切换逻辑
function useToggle() {
  //切换索引
  const currentIndex = ref(0);
  //控制切换索引
  const toggle = (step) => {
    //计算索引
    const nextIndex = currentIndex.value + step;
    //控制索引返回
    if (nextIndex < 0 || nextIndex > 1) return;
    //如果索引在正常返回就更改索引
    currentIndex.value = nextIndex;
  };
  return { currentIndex, toggle };
}

export default {
  //热门品牌组件
  name: "HomeBrand",
  components: {
    HomePanel,
    XtxSkeleton,
  },
  setup() {
    //实现页面渲染懒加载
    const { target, result: brands } = useLazyData(getHotBrands);

    return { target, brands, ...useToggle() };
  },
};
</script>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
.skeleton {
  width: 100%;
  display: flex;
  top: 115px;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
