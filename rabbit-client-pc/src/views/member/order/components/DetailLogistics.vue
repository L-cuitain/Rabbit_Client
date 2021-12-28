<template>
  <div class="detail-logistics" v-if="Logistics">
    <p>
      <span>{{ Logistics.list[0].text }}</span>
      <span>{{ Logistics.list[0].time }}</span>
    </p>
    <a href="javascript:">查看物流</a>
  </div>
</template>
<script>
import { ref } from "vue";
import { lookLogistics } from "@/api/member";
import { useRoute } from "vue-router";

export default {
  name: "DetailLogistics",
  async setup() {
    //获取路由信息对象
    const route = useRoute();
    //用于存储物流信息
    const Logistics = ref();
    //获取物流信息
    let data = await lookLogistics(route.params.id);
    //存储物流信息
    Logistics.value = data.result;

    return { Logistics };
  },
};
</script>
<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @xtxColor;
    text-align: center;
  }
}
</style>
