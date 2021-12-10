import { createVNode, render } from "vue";

//导入 vue 组件
import XtxMessage from "@/components/library/XtxMessage";

//如果通过 js 方式渲染 vue 组件

//保存定时器对象
let timer = null;
//创建组件渲染容器
const container = document.createElement("div");
document.body.appendChild(container);

export default function Message({ type, text }) {
  //将单文件组件对象转换为虚拟DOM
  const vNode = createVNode(XtxMessage, { type, text });
  //将虚拟DOM对象转换为真实DOM对象 并渲染到container中
  render(vNode, container);
  //先清除定时器
  clearTimeout(timer);
  //创建定时器 隐藏消息提示框
  timer = setTimeout(() => {
    // render(null, container);
    vNode.component.proxy.show = false;
    //重置container中的_vNode 否则弹出框下一次不会出现
    container._vNode = null;
  }, 3000);
}
