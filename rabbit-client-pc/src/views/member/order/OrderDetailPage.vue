<template>
  <AppMemberLayout>
    <div class="order-detail-page">
      <!-- 操作栏 -->
      <DetailAction v-if="orderInfo" :orderInfo="orderInfo" />
      <!-- 步骤条-->
      <XtxSteps v-if="orderInfo" v-model:step="orderInfo.orderState">
        <XtxStepItem
          title="提交订单"
          :desc="orderInfo.createTime"
        ></XtxStepItem>
        <XtxStepItem title="付款成功" :desc="orderInfo.payTime"></XtxStepItem>
        <XtxStepItem
          title="商品发货"
          :desc="orderInfo.consignTime"
        ></XtxStepItem>
        <XtxStepItem title="确认收货" :desc="orderInfo.endTime"></XtxStepItem>
        <XtxStepItem
          title="订单完成"
          :desc="orderInfo.evaluationTime"
        ></XtxStepItem>
      </XtxSteps>
      <!-- 物流栏 -->
      <Suspense>
        <DetailLogistics />
      </Suspense>
      <!-- 订单商品信息 -->
    </div>
  </AppMemberLayout>
</template>
<script>
import AppMemberLayout from "@/components/AppMemberLayout";
import DetailAction from "@/views/member/order/components/DetailAction";
import { ref } from "vue";
import { getOrderDetail } from "@/api/order";
import { useRoute } from "vue-router";
import DetailLogistics from "@/views/member/order/components/DetailLogistics";
export default {
  name: "OrderDetailPage",
  components: { DetailLogistics, DetailAction, AppMemberLayout },
  setup() {
    const { orderInfo } = useOrderInfo();
    return { orderInfo };
  },
};
// 获取订单详情信息
function useOrderInfo() {
  const orderInfo = ref();
  const route = useRoute();
  const getData = (id) => {
    getOrderDetail(id).then((data) => {
      orderInfo.value = data.result;
    });
  };
  getData(route.params.id);
  return { orderInfo };
}
</script>
<style scoped lang="less">
.order-detail-page {
  background: #fff;
  height: 100%;
}
</style>
