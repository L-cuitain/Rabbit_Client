<template>
  <XtxDialog
    v-model:visible="visible"
    :title="`${address.id ? '修改' : '添加'}收货地址`"
  >
    <template v-slot:default>
      <div class="address-edit">
        <div class="xtx-form">
          <div class="xtx-form-item">
            <div class="label">收货人：</div>
            <div class="field">
              <input
                class="input"
                v-model="address.receiver"
                placeholder="请输入收货人"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">手机号：</div>
            <div class="field">
              <input
                class="input"
                v-model="address.contact"
                placeholder="请输入手机号"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地区：</div>
            <div class="field">
              <XtxCity
                @onCityChanged="onCityChanged"
                ref="xtxCityInstance"
                placeholder="请选择所在地区"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">详细地址：</div>
            <div class="field">
              <input
                class="input"
                v-model="address.address"
                placeholder="请输入详细地址"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">邮政编码：</div>
            <div class="field">
              <input
                class="input"
                v-model="address.postalCode"
                placeholder="请输入邮政编码"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地址标签：</div>
            <div class="field">
              <input
                class="input"
                v-model="address.addressTags"
                placeholder="请输入地址标签，逗号分隔"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">是否设置为默认地址：</div>
            <div class="field">
              <input
                type="checkbox"
                v-model="address.isDefault"
                class="checkbox"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <XtxButton
        @click="visible = false"
        type="gray"
        style="margin-right: 20px"
      >
        取消
      </XtxButton>
      <XtxButton @click="onSureClickHandler" type="primary">{{
        address.id ? "修改" : "添加"
      }}</XtxButton>
    </template>
  </XtxDialog>
</template>

<script>
import { ref } from "vue";
import { addAddress, updateAddress } from "@/api/order";
import Message from "@/components/library/message";

export default {
  name: "AddressEdit",
  setup(props, { emit }) {
    // 用于控制弹框是否显示
    const visible = ref(false);
    //添加收货地址请求参数
    const address = ref({});
    //用于存储城市选择实例对象
    const xtxCityInstance = ref();
    //当用户选择收货地址后
    const onCityChanged = (data) => {
      //存储用户选择城市信息
      address.value.provinceCode = data.provinceCode;
      address.value.cityCode = data.cityCode;
      address.value.countyCode = data.countyCode;
    };
    // 用于执行用户点击确定按钮之后的逻辑代码
    const onSureClickHandler = async () => {
      //声明请求参数
      const target = {
        ...address.value,
        isDefault: address.value.isDefault ? 0 : 1,
      };
      if (target.id) {
        //修改
        try {
          //向服务器端发送请求修改收货地址
          const data = await updateAddress(target);
          Message({ type: "success", text: "收货地址修改成功" });
          //隐藏弹框
          visible.value = false;
          emit("onAddressChanged", data.result.id);
        } catch (error) {
          Message({ type: "error", text: "收货地址修改失败" });
        }
      } else {
        //添加
        try {
          //向服务器端添加收货地址
          const data = await addAddress(target);
          Message({ type: "success", text: "收货地址添加成功" });
          //隐藏弹框
          visible.value = false;
          //触发父组件事件 添加新的收货地址
          emit("onAddressChanged", data.result.id);
        } catch (error) {
          Message({ type: "error", text: "收货地址添加失败" });
        }
      }
    };
    return {
      visible,
      address,
      onSureClickHandler,
      onCityChanged,
      xtxCityInstance,
    };
  },
};
</script>

<style scoped lang="less">
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
  .xtx-city {
    width: 320px;
    :deep(.select) {
      height: 50px;
      line-height: 48px;
      display: flex;
      padding: 0 10px;
      justify-content: space-between;
      .placeholder {
        color: #ccc;
      }
      i {
        color: #ccc;
        font-size: 18px;
      }
      .value {
        font-size: 14px;
      }
    }
    :deep(.option) {
      top: 49px;
    }
  }
}
.xtx-form {
  padding: 0;
  .xtx-form-item {
    width: auto;
    &:last-child {
      padding-bottom: 0;
    }
  }
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
</style>
