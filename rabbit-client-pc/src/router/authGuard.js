import store from "@/store";

export default function authGuard(to, from, next) {
  //判断用户即将访问到页面是否需要登录
  const requiredLogin = ["checkout", "member"];
  //如果不需要登录 直接进入
  if (requiredLogin.includes(to.path.split("/")[1])) {
    if (store.state.user.profile.token) {
      //判断用户是否登录
      next();
    } else {
      next({ path: "/login", query: { redirectUrl: to.fullPath } });
    }
  } else {
    //说明用户访问的页面是不需要登录的
    next();
  }
  //如果需要登录 判断用户是否登录
  //如果用户登录 直接进入
  //如果用户没有登录 跳转到登录页面
  //在跳转到登录页面时通过 to 参数获取到用户目标跳转地址 并将目标跳转地址作为参数传递到登录页面
  //当用户登录成功后，判断路由参数中是否存在跳转地址
  //如果存在目标跳转地址，跳转到目标地址，如果没有目标跳转地址，跳转到首页
}
