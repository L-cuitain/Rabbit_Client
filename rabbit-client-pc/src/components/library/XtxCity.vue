<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: visible }">
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visible">
      <template v-if="cityData">
        <span class="ellipsis" v-for="item in cityData" :key="item.id">{{
          item.name
        }}</span>
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import axios from "axios";

export default {
  name: "XtxCity",
  setup() {
    // 用于存储用户选择的城市数据
    // const selectedCityData = reactive({
    //   provinceCode: "",
    //   cityCode: "",
    //   countyCode: "",
    //   provinceName: "",
    //   cityName: "",
    //   countyName: "",
    //   location: "",
    // });
    //控制下拉菜单是否显示
    const visible = ref(false);
    //用于获取下拉框元素
    const target = ref(null);
    //用于存储城市数据
    const cityData = ref(null);
    //显示下拉菜单
    const show = () => {
      //获取城市数据
      getCityData().then((data) => {
        //存储城市数据
        cityData.value = data;
      });
      //显示下拉菜单
      visible.value = true;
    };
    //隐藏下拉菜单
    const hide = () => {
      visible.value = false;
    };
    //切换下拉菜单的显示和隐藏
    const toggle = () => {
      visible.value ? hide() : show();
    };
    //在下拉框元素外面点击时
    onClickOutside(target, () => {
      //隐藏下拉框
      hide();
    });

    return { visible, cityData, toggle, target };
  },
};

window.cityData = null;

async function getCityData() {
  //如果window对象中已经缓存了城市数据，从window对象中获取城市数据
  if (window.cityData) return window.cityData;
  //window 对象中没有城市数据，像服务器端发送请求获取城市数据
  let response = await axios
    .get(
      "http://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
    )
    .then((response) => response.data);
  //将城市数据缓存到 window 对象中，并作为当前方法的返回值
  return (window.cityData = response);
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
