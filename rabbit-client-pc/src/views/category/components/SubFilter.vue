<template>
  <div class="sub-filter" v-if="filters && !filtersLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          href="javascript:"
          v-for="brand in filters.brands"
          :class="{ active: filters.selectedBrandId === brand.id }"
          :key="brand.id"
          @click="
            filters.selectedBrandId = brand.id;
            updateSelectedFilters();
          "
          >{{ brand.name }}</a
        >
      </div>
    </div>
    <div class="item" v-for="item in filters.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}</div>
      <div class="body">
        <a
          v-for="property in item.properties"
          :class="{ active: property.name === item.selectedFilterName }"
          :key="property.id"
          @click="
            item.selectedFilterName = property.name;
            updateSelectedFilters();
          "
          >{{ property.name }}</a
        >
      </div>
    </div>
  </div>
  <div class="sub-filter" v-else>
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>

<script>
//引入ref
import { ref } from "vue";
//引入api接口
import { getSubCategoryFilterById } from "@/api/category";
//引入路由
import { onBeforeRouteUpdate, useRoute } from "vue-router";

export default {
  //筛选区
  name: "SubFilter",
  setup(props, { emit }) {
    //获取路由信息对象
    const route = useRoute();
    //调用方法
    const { filters, getData, updateSelectedFilters, filtersLoading } =
      useSubCategoryFilter(emit);
    getData(route.params.id);
    return { filters, updateSelectedFilters, filtersLoading };
  },
};

//获取筛选条件
function useSubCategoryFilter(emit) {
  //用于存储所有筛选条件数据
  const filters = ref(null);
  //用于存储筛选数据的加载状态
  const filtersLoading = ref(false);
  //用于存储用户选择的筛选条件
  const selectedFilters = {
    brandId: null,
    attrs: [],
  };

  //用于更新用于选择的筛选条件
  const updateSelectedFilters = () => {
    //更新用户选择的品牌id
    selectedFilters.brandId = filters.value.selectedBrandId;
    //重置用户选择的筛选条件
    selectedFilters.attrs = [];
    //更新用户选择的筛选条件
    filters.value.saleProperties.forEach((item) => {
      //如果用户选择了当前筛选类别的筛选条件
      if (item.selectedFilterName && item.selectedFilterName !== "全部") {
        //收集用户选择的筛选条件类别名和具体的筛选条件名称
        selectedFilters.attrs.push({
          groupName: item.name,
          propertyName: item.selectedFilterName,
        });
      }
    });
    //将用户选择的筛选条件传递到父组件
    emit("onFilterParamsChanged", selectedFilters);
  };

  //获取筛选条件
  const getData = (id) => {
    //加载数据
    filtersLoading.value = true;
    getSubCategoryFilterById(id).then((data) => {
      //在品牌筛选条件的前面加上`全部`筛选选项
      data.result.brands.unshift({ id: null, name: "全部" });
      //设置默认选中的品牌ID
      data.result.selectedBrandId = null;
      //在其他筛选条件的前面加上`全部`筛选选项
      data.result.saleProperties.forEach((item) => {
        item.properties.unshift({ id: null, name: "全部" });
        //用于存储用户选择的筛选条件
        item.selectedFilterName = "全部";
      });
      //存储筛选条件
      filters.value = data.result;
      //更新加载状态
      filtersLoading.value = false;
    });
  };

  //监听路由参数的变化 当路由参数发生变化以后重新获取筛选条件数据
  onBeforeRouteUpdate((to) => getData(to.params.id));
  return { filters, getData, updateSelectedFilters, filtersLoading };
}
</script>

<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
.xtx-skeleton {
  padding: 10px 0;
}
</style>
