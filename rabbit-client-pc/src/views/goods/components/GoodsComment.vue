<template>
  <div className="goods-comment">
    <div className="head" v-if="commentInfo">
      <div className="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div className="tags">
        <div className="dt">大家都在说：</div>
        <div className="dd">
          <a
            href="javascript:"
            :class="{ active: activeTagName === tag.title }"
            @click="
              activeTagName = tag.title;
              updateReqParams({ tag: tag.title });
            "
            v-for="tag in commentInfo.tags"
            :key="tag.title"
            >{{ tag.title }}（{{ tag.tagCount }}）</a
          >
        </div>
      </div>
    </div>
    <div className="sort">
      <span>排序：</span>
      <a
        @click="updateReqParams({ sortField: '' })"
        :class="{ active: reqParams.sortField === '' }"
        href="javascript:"
        className="active"
        >默认</a
      >
      <a
        @click="updateReqParams({ sortField: 'createTime' })"
        :class="{ active: reqParams.sortField === 'createTime' }"
        href="javascript:"
        >最新</a
      >
      <a
        @click="updateReqParams({ sortField: 'praiseCount' })"
        :class="{ active: reqParams.sortField === 'praiseCount' }"
        href="javascript:"
        >最热</a
      >
    </div>
    <div className="list" v-if="commentList">
      <div class="item" v-for="item in commentList.items" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="" />
          <span>{{ formatNickname(item.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i
              class="iconfont icon-wjx01"
              v-for="score in item.score"
              :key="'s' + score"
            ></i>
            <i
              class="iconfont icon-wjx02"
              v-for="score in 5 - item.score"
              :key="'k' + score"
            ></i>
            <span class="attr">{{ formatAttrs(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">
            {{ item.content }}
          </div>
          <GoodsCommentImage
            v-if="item.pictures.length > 0"
            :pictures="item.pictures"
          />
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan"
              ><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <XtxPagination />
  </div>
</template>
<script>
import { ref, watch } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

import { getCommentInfo, getCommentList } from "@/api/goods";
import GoodsCommentImage from "@/views/goods/components/GoodsCommentImage";
import XtxPagination from "@/components/library/XtxPagination";

export default {
  name: "GoodsComment",
  components: { XtxPagination, GoodsCommentImage },
  setup() {
    //获取路由信息
    const route = useRoute();
    //调用获取头部信息方法
    const { commentInfo, activeTagName, getData } = useGoodsCommentInfo(route);
    //调用评价列表方法
    const {
      commentList,
      formatNickname,
      formatAttrs,
      updateReqParams,
      reqParams,
    } = useGoodsCommentList(route);
    //在商品切换时重新获取头部信息
    onBeforeRouteUpdate((to) => getData(to.params.id));
    return {
      commentInfo,
      activeTagName,
      commentList,
      formatNickname,
      formatAttrs,
      updateReqParams,
      reqParams,
    };
  },
};

//获取头部组件信息
function useGoodsCommentInfo(route) {
  //用于存储头部组件的信息
  const commentInfo = ref();
  //用于实现标签的选中效果
  const activeTagName = ref("全部评价");

  //用于获取头部组件信息方法
  const getData = (id) => {
    getCommentInfo(id).then((data) => {
      data.result.tags.unshift(
        {
          tagCount: data.result.evaluateCount,
          title: "全部评价",
        },
        {
          tagCount: data.result.hasPictureCount,
          title: "有图",
        }
      );
      commentInfo.value = data.result;
    });
  };

  getData(route.params.id);

  return { commentInfo, activeTagName, getData };
}

//获取评价列表数据
function useGoodsCommentList(route) {
  //用于存储评价列表数据
  const commentList = ref();

  //请求参数对象
  const reqParams = ref({
    page: 1,
    pageSize: 10,
    hasPicture: false,
    tag: "",
    sortField: "",
  });

  //更新 reqParams
  const updateReqParams = (target) => {
    //判断用户是否点击标签
    if (target.tag) {
      //改变reqParams的值 并对是否有图和标签做判断
      reqParams.value = {
        ...reqParams.value,
        hasPicture: target.tag === "有图",
        tag:
          target.tag === "全部评价" || target.tag === "有图" ? "" : target.tag,
      };
    } else {
      reqParams.value = {
        ...reqParams.value,
        ...target,
      };
    }
  };

  //用于获取评价列表数据方法
  const getData = (id) => {
    getCommentList(id, reqParams.value).then((data) => {
      commentList.value = data.result;
    });
  };

  //调用请求方法
  // getData(route.params.id);

  //监听reqParams的值 并初始调用
  watch(
    () => reqParams.value,
    () => getData(route.params.id),
    { immediate: true }
  );
  //格式化名称
  const formatNickname = (nickname) => {
    return nickname.substr(0, 1) + "*****" + nickname.substr(-1);
  };

  const formatAttrs = (attrs) => {
    return attrs.map((attr) => `${attr.name} : ${attr.nameValue}`).join(" ");
  };

  return {
    commentList,
    formatNickname,
    formatAttrs,
    updateReqParams,
    reqParams,
  };
}
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;

    .data {
      width: 340px;
      display: flex;
      padding: 20px;

      p {
        flex: 1;
        text-align: center;

        span {
          display: block;

          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }

          &:last-child {
            color: #999;
          }
        }
      }
    }

    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;

      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }

      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;

        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;

          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }

          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }

  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;

    > span {
      margin-left: 20px;
    }

    > a {
      margin-left: 30px;

      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
