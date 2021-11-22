<template>
  <ul>
    <li v-for="good in goods" :key="good.id">
      <GoodsItem :goods="good" />
    </li>
  </ul>
</template>

<script>
import GoodsItem from "@/views/category/components/GoodsItem";

export default {
  name: "GoodsList",
  components: { GoodsItem },
  props: {
    goods: {
      type: Array,
      default: () => [],
    },
  },
  setup() {},
};
</script>

<style scoped lang="less">
ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0 5px;
  li {
    margin-right: 20px;
    margin-bottom: 20px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
