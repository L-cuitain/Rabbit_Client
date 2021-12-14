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
        <span class="code" @click="getMsgCode" :class="{ disabled: isActive }">
          {{ isActive ? `剩余${count}秒` : "发送验证码" }}
        </span>
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
import { getMsgCodeByRegister, registerAndBindQQ } from "@/api/user";
import Message from "@/components/library/message";
import { useCountDown } from "@/hooks/useCountDown";
import useLoginAfter from "@/hooks/useLoginAfter";

export default {
  name: "LoginCallbackBindPatch",
  props: {
    unionId: {
      type: String,
    },
  },
  setup(props) {
    const { handleSubmit, getMobileIsValidate, ...rest } = useRegisterPatch();
    const { loginSuccess, loginFail } = useLoginAfter();
    const { count, isActive, start } = useCountDown();

    const onSubmit = handleSubmit(
      ({ checkUserAccount, mobile, code, password }) => {
        console.log(checkUserAccount, mobile, code, password);
        //向服务器端发送请求 注册新账号 并绑定新账号
        registerAndBindQQ({
          checkUserAccount,
          mobile,
          code,
          password,
          unionId: props.unionId,
        }).then(loginSuccess, loginFail);
      }
    );
    const getMsgCode = () => {
      //正在倒计时 阻止程序向下
      if (isActive.value) return;
      //验证用户是否输入手机号
      getMobileIsValidate()
        .then(({ isValid, mobile }) => {
          alert(isValid);
          if (isValid) {
            //向服务器发送请求 获取验证码
            return getMsgCodeByRegister(mobile);
          }
        })
        .then(() => {
          //用户提示
          Message({ type: "success", text: "验证码发送成功" });
          start(60);
        })
        .catch(() => {
          Message({ type: "error", text: "验证码发送失败" });
        });
    };
    return { onSubmit, getMsgCode, ...rest, count, isActive };
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
  const {
    value: mobileFiled,
    errorMessage: mobileError,
    validate: mobileValidate,
  } = useField("mobile");
  const { value: codeFiled, errorMessage: codeError } = useField("code");
  const { value: passwordFiled, errorMessage: passwordError } =
    useField("password");
  const { value: rePasswordFiled, errorMessage: rePasswordError } =
    useField("rePassword");

  const getMobileIsValidate = async () => {
    let { valid } = await mobileValidate();
    return { isValid: valid, mobile: mobileFiled };
  };

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
    getMobileIsValidate,
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
