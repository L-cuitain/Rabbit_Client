<template>
  <div class="xtx-pagination">
    <a href="javascript:">上一页</a>
    <span>...</span>
    <a href="javascript:">3</a>
    <a href="javascript:">4</a>
    <a href="javascript:" class="active">5</a>
    <a href="javascript:">6</a>
    <a href="javascript:">7</a>
    <span>...</span>
    <a href="javascript:">下一页</a>
  </div>
</template>
<script>
import { computed, ref } from "vue";

export default {
  name: "XtxPagination",
  setup() {
    //当前页
    const currentPage = ref(5);
    //总数据条数
    const total = ref(100);
    //每页显示数据条数
    const pageSize = ref(10);
    //页面中最多显示页码数量
    const pageButtonMaxNumber = 5;
    //页码偏移量
    const pageOffset = Math.floor(pageButtonMaxNumber / 2);
    const pageInfo = computed(() => {
      //计算总页数
      const totalPage = Math.ceil(total.value / pageSize.value);
      //计算显示时开始页码值
      let start = currentPage.value - pageOffset;
      //计算显示时结束页码值
      let end = start + pageButtonMaxNumber - 1;
      //如果显示页码小于1
      if (start < 1) {
        //start 为 1
        start = 1;
        //end 重新设置页码
        let temp = start + pageButtonMaxNumber - 1;
        end = temp > totalPage ? totalPage : temp;
      }
      //对结束页码进行限制
      if (end > totalPage) {
        //让显示结束页码等于总页数
        end = totalPage;
        //重新计算开始页码
        let temp = (start = end - pageButtonMaxNumber + 1);
        end = temp < 1 ? 1 : temp;
      }

      //声明存储页码的数组
      let pageNumberArray = [];
      //遍历生成页码数组
      for (let i = start; i < end; i++) {
        pageNumberArray.push(i);
      }
      return { pageNumberArray };
    });

    return { currentPage, pageInfo };
  },
};
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
