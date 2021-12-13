<template>
  <form class="xtx-form" @submit="onSubmit">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          v-model="mobileField"
          class="input"
          type="text"
          placeholder="绑定的手机号"
        />
      </div>
      <div class="error" v-if="mobileError">{{ mobileError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input
          v-model="codeField"
          class="input"
          type="text"
          placeholder="短信验证码"
        />
        <span @click="getMsgCode" :class="{ disabled: isActive }" class="code">
          {{ isActive ? `剩余${count}秒` : "发送验证码" }}
        </span>
      </div>
      <div class="error" v-if="codeError">{{ codeError }}</div>
    </div>
    <input type="submit" class="submit" value="立即绑定" />
  </form>
</template>

<script>
import { ref } from "vue";
import { useForm, useField } from "vee-validate";
import { getMsgCodeWhenBindQQ, bindMobleAndQQ } from "@/api/user";
import Message from "@/components/library/message";
import useLoginAfter from "@/hooks/useLoginAfter";
import { mobile, code } from "@/utils/vee-validate-schema";
import { useCountDown } from "@/hooks/useCountDown";

export default {
  name: "LoginCallbackBindPhone",
  props: {
    unionId: {
      type: String,
    },
  },
  setup(props) {
    const { nickname, avatar } = useQQUserInfo();
    const { loginSuccess, loginFail } = useLoginAfter();
    const { handleSubmit, getIsMobileValid, ...rest } = useBindPhoneValidate();
    //加载倒计时
    const { count, isActive, start } = useCountDown();
    const onSubmit = handleSubmit((values) => {
      bindMobleAndQQ({
        mobile: values.mobile,
        code: values.code,
        unionId: props.unionId,
      })
        .then(loginSuccess)
        .catch(loginFail);
    });
    //获取手机验证码
    const getMsgCode = async () => {
      let { isValid, mobile } = await getIsMobileValid();
      //发送请求获取验证码
      if (isValid && !isActive.value) {
        try {
          await getMsgCodeWhenBindQQ(mobile);
          Message({ type: "success", text: "验证码发送成功" });
          //开始倒计时
          start(60);
        } catch (error) {
          Message({ type: "error", text: "验证码发送失败" });
        }
      }
      return { isValid, mobile };
    };

    return { isActive, count, nickname, avatar, onSubmit, getMsgCode, ...rest };
  },
};

function useBindPhoneValidate() {
  //
  const { handleSubmit } = useForm({
    validationSchema: { mobile, code },
  });

  const {
    value: mobileField,
    errorMessage: mobileError,
    validate: mobileValid,
  } = useField("mobile");

  //单独验证用户是否输入手机号
  const getIsMobileValid = async () => {
    let { valid } = await mobileValid();
    return { isValid: valid, mobile: mobileField.value };
  };

  const { value: codeField, errorMessage: codeError } = useField("code");

  return {
    handleSubmit,
    mobileField,
    mobileError,
    codeField,
    codeError,
    getIsMobileValid,
  };
}

function useQQUserInfo() {
  const nickname = ref();
  const avatar = ref();
  if (window.QC.Login.check()) {
    window.QC.api("get_user_info").success((response) => {
      nickname.value = response.data.nickname;
      avatar.value = response.data.figureurl_1;
    });
  }
  return { nickname, avatar };
}
</script>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin: 0 auto 20px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
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
