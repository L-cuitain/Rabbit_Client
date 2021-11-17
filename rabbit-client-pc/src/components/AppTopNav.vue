<template>
  <nav class="app-top-nav">
    <div class="container">
      <ul>
        <template v-if="token">
          <li>
            <a href="javascript:"
              ><i class="iconfont icon-user"></i>{{ account }}</a
            >
          </li>
          <li><a href="javascript:">退出登录</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:">请先登录</a></li>
          <li><a href="javascript:">免费注册</a></li>
        </template>
        <li><a href="javascript:">我的订单</a></li>
        <li><a href="javascript:">会员中心</a></li>
        <li><a href="javascript:">帮助中心</a></li>
        <li><a href="javascript:">关于我们</a></li>
        <li>
          <a href="javascript:"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "AppTopNav",
  setup() {
    const store = useStore();
    //要获取vuex中state的某个模块具体值时,需要使用computed来变成响应式
    // const user = store.state.user;
    const token = computed(() => store.state.user.profile.token);
    const account = computed(() => store.state.user.profile.account);
    return { token, account };
  },
};
</script>

<style scoped lang="less">
.app-top-nav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
