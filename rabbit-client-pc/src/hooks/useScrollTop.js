import { onMounted, onUnmounted, ref } from "vue";

//封装通用获取滚动距离方法 useScrollTop
export default function useScrollTop() {
  //存储滚动距离,用于在模板中作为元素显示隐藏依据
  const scrollTop = ref(0);
  //滚动事件
  const onScrollHandler = () => {
    //存储滚动距离
    scrollTop.value = document.documentElement.scrollTop;
  };

  //组件挂载完成
  onMounted(() => {
    //为 window 添加滚动事件
    window.addEventListener("scroll", onScrollHandler);
  });

  //组件卸载完成
  onUnmounted(() => {
    //为 window 移出滚动事件
    window.addEventListener("scroll", onScrollHandler);
  });
  return scrollTop;
}
