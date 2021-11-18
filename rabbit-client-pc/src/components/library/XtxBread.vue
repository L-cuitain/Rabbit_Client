<script>
import { h } from "vue";

export default {
  name: "XtxBread",
  render() {
    // this.$slots.default()
    const items = this.$slots.default();
    //存储最终布局结构
    const result = [];
    items.forEach((item, index) => {
      result.push(item);
      //判断index小于item.length-1 那么不是最后一项
      if (index < items.length - 1) {
        //不是最后一项 加 >
        //<i class="iconfont icon-angle-right"></i>
        result.push(h("i", { class: "iconfont icon-angle-right" }));
      }
    });
    //返回面包屑导航
    return h("div", { class: "xtx-bread" }, result);
  },
};
</script>

<style scoped lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
