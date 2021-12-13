<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container" v-if="loading">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-if="!loading && !isBind">
    <nav class="tab">
      <a
        :class="{ active: hasAccount }"
        href="javascript:"
        @click="hasAccount = true"
      >
        <i class="iconfont icon-bind"></i>
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a
        :class="{ active: !hasAccount }"
        href="javascript:"
        @click="hasAccount = false"
      >
        <i class="iconfont icon-edit"></i>
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <LoginCallbackBindPhone :unionId="unionId" />
    </div>
    <div class="tab-content" v-if="!hasAccount">
      <LoginCallbackBindPatch />
    </div>
  </section>
  <LoginFooter />
</template>

<script>
import { ref } from "vue";
import LoginHeader from "@/views/login/components/LoginHeader";
import LoginFooter from "@/views/login/components/LoginFooter";
import LoginCallbackBindPhone from "@/views/login/components/LoginCallbackBindPhone";
import LoginCallbackBindPatch from "@/views/login/components/LoginCallbackPatch";

import { findAccountByQQOpenid } from "@/api/user";
import useLoginAfter from "@/hooks/useLoginAfter";

export default {
  name: "LoginCallbackPage",
  components: {
    LoginCallbackBindPhone,
    LoginCallbackBindPatch,
    LoginFooter,
    LoginHeader,
  },
  setup() {
    const hasAccount = ref(true);
    //假设没绑定小兔鲜账号
    const isBind = ref(false);
    //loading状态
    const loading = ref(false);
    //unionId
    const unionId = ref("");
    //成功请求
    const { loginSuccess } = useLoginAfter();
    //获取 qq 登录的 openId
    const Login = window.QC.Login;
    //检测用户登录状态
    if (Login.check()) {
      //更新loading状态
      loading.value = true;
      //用access_token 向qq发送请求换取openId
      Login.getMe((openid) => {
        console.log(openid);
        unionId.value = openid;
        //向小兔鲜应用的服务器发送请求 检索账号
        findAccountByQQOpenid({ unionId: openid })
          .then((data) => {
            loading.value = false;
            isBind.value = true;
            //如果检测到账号 跳转到首页
            loginSuccess(data);
          })
          .catch(() => {
            //如果没检测到账号 走catch方法
            loading.value = false;
            isBind.value = false;
          });
      });
    }

    return { hasAccount, loading, isBind, unionId };
  },
};
</script>

<style scoped lang="less">
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center /
        100px 100px;
    }
  }
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
