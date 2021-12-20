//导入 XtxConfirm 单文件组件对象
import XtxConfirm from "@/components/library/XtxConfirm";
import { createVNode, render } from "vue";
//创建目标容器
const container = document.createElement("div");
document.body.appendChild(container);
//供外部调用用来渲染确认框组件方法
export default function Confirm({ title, content }) {
  return new Promise(function (resolve, reject) {
    //定义方法
    //当用户点击确认按钮时要执行方法
    const onSureButtonClickHandler = () => {
      resolve();
      //如果开发者执行确认逻辑
      render(null, container);
    };
    //当用户点击取消按钮时要执行方法
    const onCancelButtonClickHandler = () => {
      reject();
      //执行离场动画
      vNode.el.classList.remove("fade");
      vNode.el.children[0].classList.remove("fade");
      //因为离场动画执行了 400ms , 所以此处指定 400ms 以后再删除 DOM
      //如果开发者执行取消逻辑
      setTimeout(() => {
        render(null, container);
      }, 400);
    };
    //将 XtxConfirm 转换成虚拟Dom对象
    const vNode = createVNode(XtxConfirm, {
      title,
      content,
      onSureButtonClick: onSureButtonClickHandler,
      onCancelButtonClick: onCancelButtonClickHandler,
    });
    //渲染 XtxConfirm
    render(vNode, container);

    //只有元素渲染完成后才能执行动画
    //执行入场动画
    setTimeout(() => {
      vNode.el.classList.add("fade");
      vNode.el.children[0].classList.add("fade");
    });
  });
}
