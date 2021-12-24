<template>
  <div class="address">
    <div class="text">
      <div v-if="!finalAddress" class="none">
        您需要先添加收货地址才可提交订单。
      </div>
      <ul v-else>
        <li>
          <span>收<i />货<i />人：</span>{{ finalAddress.receiver }}
        </li>
        <li>
          <span>联系方式：</span>
          {{
            finalAddress.contact.replace(/(\d{3})(\d{4})(\d{4})/g, "$1****$3")
          }}
        </li>
        <li>
          <span>收货地址：</span
          >{{ finalAddress.fullLocation + " " + finalAddress.address }}
        </li>
      </ul>
      <a href="javascript:" @click="modifyAddress">修改地址</a>
    </div>
    <div class="action">
      <XtxButton class="btn" @click="switchAddress">切换地址</XtxButton>
      <XtxButton class="btn" @click="addAddress">添加地址</XtxButton>
    </div>
  </div>
  <AddressEdit ref="addressEditInstance" @onAddressChanged="onAddressChanged" />
  <AddressSwitch
    ref="addressSwitchInstance"
    @onAddressChanged="onAddressChanged"
    :list="addresses"
    :activeAddressId="finalAddress?.id"
  />
</template>

<script>
import { computed, ref } from "vue";
import AddressEdit from "@/views/pay/components/AddressEdit";
import { getAddress } from "@/api/order";
import AddressSwitch from "@/views/pay/components/AddressSwitch";
export default {
  name: "CheckoutAddress",
  components: { AddressSwitch, AddressEdit },
  setup() {
    //获取收货地址编辑组件的实例对象
    const addressEditInstance = ref();
    //获取切换收货地址组件实例对象
    const addressSwitchInstance = ref();
    const { addresses, finalAddress, onAddressChanged } = useAddressList();
    //添加收货地址
    const addAddress = () => {
      addressEditInstance.value.visible = true;
      addressEditInstance.value.address = {
        //收货人姓名
        receiver: "",
        //手机号
        contact: "",
        //地址
        address: "",
        //邮政编码
        postalCode: "",
        //地址标签
        addressTags: "",
        //是否设置为默认收货地址
        isDefault: false,
        provinceCode: "",
        cityCode: "",
        countryCode: "",
      };
    };

    //修改收货地址
    const modifyAddress = () => {
      addressEditInstance.value.visible = true;
      const { isDefault, fullLocation, ...rest } = finalAddress.value;
      //将渲染的收货地址渲染到弹框内
      addressEditInstance.value.address = {
        ...rest,
        isDefault: isDefault === 0,
      };
      //获取当前选中地址
      setTimeout(() => {
        addressEditInstance.value.xtxCityInstance.location = fullLocation;
      }, 0);
    };

    //切换收货地址
    const switchAddress = () => {
      addressSwitchInstance.value.visible = true;
    };
    return {
      addAddress,
      addressEditInstance,
      addresses,
      finalAddress,
      modifyAddress,
      onAddressChanged,
      addressSwitchInstance,
      switchAddress,
    };
  },
};

function useAddressList() {
  const addresses = ref([]);
  const getData = (callback) => {
    getAddress().then((data) => {
      //存储收货地址
      addresses.value = data.result;
      //在调用getData方法如果传入callback，就调用callback并传递最新的收货地址
      callback && callback(data.result);
    });
  };
  //用于存储用户选择的收货地址
  const selectedAddress = ref(null);
  //获取优先级最高的收货地址
  const finalAddress = computed(() => {
    let result = null;
    //优先渲染用户选择的收货地址
    if (selectedAddress.value) {
      result = selectedAddress.value;
    } else {
      //如果用户没有选择收货地址 渲染默认的收货地址
      //判断收货地址列表中是否存在收货地址
      if (addresses.value.length > 0) {
        //查找默认的收货地址
        result = addresses.value.find((item) => item.isDefault === 0);
        //判断是否查找到了默认收货地址，如果没有收货地址，渲染收货地址列表第一个地址
        if (!result) {
          result = addresses.value[0];
        }
      }
    }
    return result;
  });

  //用户更改收货地址
  //重新项服务器端发送请求，获取新的收获列表
  //从新的用户列表
  const onAddressChanged = (id) => {
    getData((list) => {
      selectedAddress.value = list.find((item) => item.id === id);
    });
  };
  getData();
  return { addresses, finalAddress, onAddressChanged };
}
</script>

<style scoped lang="less">
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
