import Message from "@/components/library/message";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default function useLoginAfter() {
  const router = useRouter();
  const route = useRoute();
  const store = useStore();

  const loginSuccess = (data) => {
    //存储用户信息
    store.commit("user/setUser", {
      //用户id
      id: data.result.id,
      //用户头像
      avatar: data.result.avatar,
      //用户昵称
      nickname: data.result.nickname,
      //用户账号
      account: data.result.account,
      //用户手机号
      mobile: data.result.mobile,
      //用户登录凭证
      token: data.result.token,
    });

    //获取redirectUrl
    const redirectUrl = route.query.redirectUrl;
    //跳转首页
    router.push(redirectUrl || "/").catch(() => {});
    //提示用户登录成功
    Message({ type: "success", text: "登录成功" });
    //合并购物车
    store
      .dispatch("cart/mergeCart")
      .then(() => {
        //从服务器获取购物车列表
        return store.dispatch("cart/updateGoodsBySkuId");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginFail = () => {
    Message({ type: "error", text: "登录失败" });
  };

  return { loginSuccess, loginFail };
}
