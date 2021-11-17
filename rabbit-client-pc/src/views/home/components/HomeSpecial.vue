<template>
  <HomePanel title="最新专题" ref="target">
    <template v-slot:right>
      <XtxMore />
    </template>
    <template v-slot:list>
      <div class="special-list">
        <div class="special-item" v-for="special in specials" :key="special.id">
          <RouterLink to="/">
            <img :src="special.cover" alt />
            <div class="meta">
              <p class="title">
                <span class="top ellipsis">{{ special.title }}</span>
                <span class="sub ellipsis">{{ special.summary }}</span>
              </p>
              <span class="price">&yen;{{ special.lowestPrice }}起</span>
            </div>
          </RouterLink>
          <div class="foot">
            <span class="like"
              ><i class="iconfont icon-hart1"></i>{{ special.collectNum }}</span
            >
            <span class="view"
              ><i class="iconfont icon-see"></i>{{ special.viewNum }}</span
            >
            <span class="reply"
              ><i class="iconfont icon-message"></i>{{ special.replyNum }}</span
            >
          </div>
        </div>
      </div>
    </template>
  </HomePanel>
</template>

<script>
//引入组件样式
import HomePanel from "@/views/home/components/HomePanel";

//引入懒加载
import { useLazyData } from "@/hooks/useLazyData";
//引入api接口
import { getSpecial } from "@/api/home";

export default {
  //最新专题组件
  name: "HomeSpecial",
  components: {
    HomePanel,
  },
  setup() {
    //懒加载
    const { target, result: specials } = useLazyData(getSpecial);

    return { target, specials };
  },
};
</script>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.special-list {
  height: 380px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .special-item {
    width: 404px;
    background: #fff;
    .hoverShadow();
    a {
      display: block;
      width: 100%;
      height: 288px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .meta {
        background-image: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.8),
          transparent 50%
        );
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 288px;
        .title {
          position: absolute;
          bottom: 0;
          left: 0;
          padding-left: 16px;
          width: 70%;
          height: 70px;
          .top {
            color: #fff;
            font-size: 22px;
            display: block;
          }
          .sub {
            display: block;
            font-size: 19px;
            color: #999;
          }
        }
        .price {
          position: absolute;
          bottom: 25px;
          right: 16px;
          line-height: 1;
          padding: 4px 8px 4px 7px;
          color: @priceColor;
          font-size: 17px;
          background-color: #fff;
          border-radius: 2px;
        }
      }
    }
    .foot {
      height: 72px;
      line-height: 72px;
      padding: 0 20px;
      font-size: 16px;

      i {
        display: inline-block;
        width: 15px;
        height: 14px;
        margin-right: 5px;
        color: #999;
      }
      .like,
      .view {
        float: left;
        margin-right: 25px;
        vertical-align: middle;
      }
      .reply {
        float: right;
        vertical-align: middle;
      }
    }
  }
}
</style>
