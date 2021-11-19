<template>
  <div class="xtx-checkbox" @click="toggle">
    <i class="iconfont icon-checked" v-if="isChecked"></i>
    <i class="iconfont icon-unchecked" v-else></i>
    <!--    如果插槽存在内容 $slots.default 为真 否则为假-->
    <span v-if="$slots.default"><slot></slot></span>
  </div>
</template>

<script>
// import { watchEffect } from "vue";
import { useVModel } from "@vueuse/core";

export default {
  //封装复选框组件
  name: "XtxCheckbox",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    //useVModel 实现复选框的双向数据绑定
    //将 props 中的 modelValue 实现双向数据绑定
    // useModel 的返回值是一个新的响应式数据 ， 可以在当前模版直接使用

    //用于存储复选框是否选中状态
    const isChecked = useVModel(props, "modelValue", emit);
    //更改选中框的选中状态
    const toggle = () => {
      //对当前复选框的值进行取反
      isChecked.value = !isChecked.value;
      //监听内部值的变化 同步给外部值
      // emit("update:modelValue", isChecked.value);
    };
    //监听外部值的变化 将其同步给内部值
    // watchEffect(() => {
    //   isChecked.value = props.modelValue;
    // });
    return { isChecked, toggle };
  },
};
</script>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
