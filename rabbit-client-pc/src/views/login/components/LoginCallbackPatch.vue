<template>
  <form class="xtx-form" @submit="onSubmit">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <input
          v-model="accountFiled"
          class="input"
          type="text"
          placeholder="请输入用户名"
        />
      </div>
      <div class="error" v-if="accountError">{{ accountError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          v-model="mobileFiled"
          class="input"
          type="text"
          placeholder="请输入手机号"
        />
      </div>
      <div class="error" v-if="mobileError">{{ mobileError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input
          v-model="codeFiled"
          class="input"
          type="text"
          placeholder="请输入验证码"
        />
        <span class="code">发送验证码</span>
      </div>
      <div class="error" v-if="codeError">{{ codeError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          v-model="passwordFiled"
          class="input"
          type="password"
          placeholder="请输入密码"
        />
      </div>
      <div class="error" v-if="passwordError">{{ passwordError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          v-model="rePasswordFiled"
          class="input"
          type="password"
          placeholder="请确认密码"
        />
      </div>
      <div class="error" v-if="rePasswordError">{{ rePasswordError }}</div>
    </div>
    <input type="submit" class="submit" value="立即绑定" />
  </form>
</template>

<script>
import { useField, useForm } from "vee-validate";
import {
  checkUserAccount,
  mobile,
  code,
  password,
  rePassword,
} from "@/utils/vee-validate-schema";

export default {
  name: "LoginCallbackBindPatch",
  setup() {
    const { handleSubmit, ...rest } = useRegisterPatch();
    const onSubmit = handleSubmit((values) => {
      console.log(values);
    });
    return { onSubmit, ...rest };
  },
};
function useRegisterPatch() {
  const { handleSubmit } = useForm({
    validationSchema: {
      checkUserAccount,
      mobile,
      code,
      rePassword,
      password,
    },
  });

  const { value: accountFiled, errorMessage: accountError } =
    useField("checkUserAccount");
  const { value: mobileFiled, errorMessage: mobileError } = useField("mobile");
  const { value: codeFiled, errorMessage: codeError } = useField("code");
  const { value: passwordFiled, errorMessage: passwordError } =
    useField("password");
  const { value: rePasswordFiled, errorMessage: rePasswordError } =
    useField("rePassword");

  return {
    accountFiled,
    accountError,
    mobileFiled,
    mobileError,
    codeFiled,
    codeError,
    passwordFiled,
    passwordError,
    rePasswordFiled,
    rePasswordError,
    handleSubmit,
  };
}
</script>

<style scoped lang="less">
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
