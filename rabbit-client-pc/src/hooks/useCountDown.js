import { useIntervalFn } from "@vueuse/core";
import { ref } from "vue";

//定时器倒计时
export function useCountDown() {
  //pause 清除定时器
  //resume 重新开始定时器
  //isActive 定时器是否正在执行

  const count = ref(0);
  const { pause, resume, isActive } = useIntervalFn(
    () => {
      if (count.value <= 0) {
        //清除定时器
        pause();
      } else {
        count.value = count.value - 1;
      }
    },
    1000,
    {
      immediate: false,
    }
  );
  //外部调用此方法用于开始倒计时
  const start = (value) => {
    if (!isActive.value) {
      count.value = value;
      resume();
    }
  };
  return { count, start, isActive };
}
