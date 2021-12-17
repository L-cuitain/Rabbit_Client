<template>
  <div class="goods-sku">
    <dl v-for="spec in specs" :key="spec.name">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="value in spec.values" :key="value.name">
          <img
            v-if="value.picture"
            :src="value.picture"
            :alt="value.name"
            @click="updateSpecSelected(spec, value)"
            :class="{ selected: value.selected, disabled: value.disabled }"
          />
          <span
            @click="updateSpecSelected(spec, value)"
            :class="{ selected: value.selected, disabled: value.disabled }"
            v-else
            >{{ value.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<script>
import powerSet from "@/vendors/power-set";

export default {
  name: "GoodsSku",
  props: {
    specs: {
      type: Array,
      default: () => [],
    },
    //所有可组合的规则
    skus: {
      type: Array,
      default: () => [],
    },
    //商品id
    skuId: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const pathMap = createPathMap(props.skus);
    //更新规格的选中状态
    const updateSpecSelected = (specs, value) => {
      //如果按钮是禁选的，直接返回不让用户更改当前规格的是否选中状态
      if (value.disabled) return;
      //如果用户点击的规格已经是选中的
      if (value.selected) {
        //让其取消选中
        value.selected = false;
      } else {
        //现将该规格中所有规格取消选中
        specs.values.forEach((item) => {
          item.selected = false;
        });
        //将当前用户点击的规格设置为选中
        value.selected = true;
      }

      //更新规格组件
      updateSpecDisabled(props.specs, pathMap);
      //更新规格时传递规格参数给父组件
      sendSkusToParent(pathMap, props.skus, props.specs, emit);
    };

    //初始化时更新规格按钮的禁选效果
    updateSpecDisabled(props.specs, pathMap);
    //设置默认
    setDefaultSelected(props.skuId, props.skus, props.specs);

    return { updateSpecSelected };
  },
};

//创建规格查询对象
function createPathMap(skus) {
  // skus: 存储所有可以组合的规格集合，数组类型
  // 用于存储最终的规格查询对象
  const pathMap = {};
  //遍历所有可组合的规格组合
  skus.forEach((sku) => {
    //找到有库存的规格组合
    if (sku.inventory > 0) {
      //将可组合的规格的名称临时存到一个数组中
      const valueNames = sku.specs.map((spec) => spec.valueName);
      //获取当前商品的规格数量，后面用于判断某个规格是否完整
      const max = sku.specs.length;
      //获取规格集合的子级组合
      const sets = powerSet(valueNames.filter((item) => item.length > 0));
      //遍历规格子级组合
      sets.forEach((set) => {
        //将规格名称以 _ 进行拼接
        const key = set.join("_");
        //判断规格查询对象中是否已经存储当前规格
        if (!(key in pathMap)) {
          if (set.length === max) {
            //完整规格
            pathMap[key] = sku.id;
          } else {
            //不完整规格
            pathMap[key] = null;
          }
        }
      });
    }
  });
  return pathMap;
}

//获取用户选中的规格
function getUserSelected(specs) {
  //用于存储用户选择的规格
  const result = [];
  //遍历商品规格集合
  specs.forEach((spec, index) => {
    //在当前规格中查找用户选择的规格
    const selected = spec.values.find((value) => value.selected);
    if (selected) {
      result[index] = selected.name;
    } else {
      result[index] = undefined;
    }
  });
  return result;
}

//更新规格按钮的禁用状态
function updateSpecDisabled(specs, pathMap) {
  //约定在每一个规格数据中通过  disabled 属性标识禁用状态
  //遍历规格数组
  specs.forEach((spec, index) => {
    const selected = getUserSelected(specs);
    //遍历具体的规格信息
    spec.values.forEach((value) => {
      if (value.selected) return;
      //将当前规格名称放入用户选择的规格数组名称中，待匹配
      selected[index] = value.name;
      //将 selected 数组中的 undefined 过滤掉，剩下使用_拼接
      const key = selected.filter((item) => item).join("_");
      //设置按钮的禁用状态
      //如果当前遍历的规格名称不在规格查询字典对象中 说明它需要被禁用
      value.disabled = !(key in pathMap);
    });
  });
}

//设置默认选中的规格组件
function setDefaultSelected(skuId, skus, specs) {
  //skuId 规格ID
  //specs 即将被设置状态的数据
  //skus 当前商品所有可组合的规格集合

  //如果在调用当前组件时没有传递规格id
  if (!skuId) {
    return;
  }

  //从所有可组合的规格集合数组中查找当前要默认选中的规格对象
  const target = skus.find((sku) => sku.id === skuId);
  //将要选中的规格名字存储到数组中
  const names = target.specs.map((spec) => spec.valueName);
  //遍历页面中渲染的供用户选择的规格数据
  specs.forEach((spec) => {
    spec.values.forEach((value) => {
      //如果当前遍历的规格名字在 names 数组中
      if (names.includes(value.name)) {
        //设置当前规格的选中效果
        value.selected = true;
      }
    });
  });
}

//将用户选择的规格传递给父组件
function sendSkusToParent(pathMap, skus, specs, emit) {
  //获取用户选择的规格
  const selected = getUserSelected(specs).filter((item) => item);
  //判断用户选择的规格是否完整 如果是完整才需要将数据传递到组件
  if (selected.length === specs.length) {
    //获取规格id
    const skuId = pathMap[selected.join("_")];
    //根据 skuId 在所有可组合的规格集合中查找规格对象
    const target = skus.find((sku) => sku.id === skuId);
    //将规格数据传递到父组件
    emit("onSpecChanged", {
      //商品的规格ID，将商品加入购物车时使用
      skuId,
      //商品的现价(更新视图)
      price: target.price,
      //商品原价(更新视图)
      oldPrice: target.oldPrice,
      //商品的库存，在用户选择商品数量时使用
      inventory: target.inventory,
      //商品规格参数
      attrsText: target.specs
        .map((spec) => `${spec.name}: ${spec.valueName}`)
        .join(" "),
    });
  } else {
    //当规格不完整 不传skuId
    emit("onSpecHalfChanged");
  }
}
</script>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 5px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
