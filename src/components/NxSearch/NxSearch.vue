<!--
 * @Author: next-ui 55926111@qq.com
 * @Date: 2022-12-27 23:02:51
 * @LastEditors: next-ui 55926111@qq.com
 * @LastEditTime: 2022-12-28 17:46:39
 * @FilePath: \NxUI\src\components\NxSearch\NxSearch.vue
 * @Description:
 *
 * Copyright (c) 2022 by next-ui 55926111@qq.com, All Rights Reserved.
-->

<template lang="">
  <div class="nx-search-box">
    <!-- 头部插槽 -->
    <slot name="header"></slot>
    <template v-for="item in props.searchConfig" :key="item.prop">
      <div class="nx-search-item" v-if="item.hidden != true">
        <span>{{ item.label }}：</span>
        <!-- 输入框 -->
        <el-input
          v-if="item.type == 'input'"
          v-model="queryObj[item.prop]"
          :placeholder="item.placeholder || ''"
          :clearable="item.clearable != false"
          :disabled="item.disabled == true"
          :style="{ width: item.width + 'px' }" />
        <!-- 下拉框 -->
        <el-select
          v-else-if="item.type == 'select'"
          v-model="queryObj[item.prop]"
          :placeholder="item.placeholder || ''"
          :clearable="item.clearable != false"
          :disabled="item.disabled == true"
          filterable
          :style="{ width: item.width + 'px' }">
          <el-option
            v-for="option in item.data"
            :key="option.value"
            :label="option.label"
            :value="option.value" />
        </el-select>
      </div>
    </template>

    <!-- 默认尾部插槽 -->
    <div class="nx-search-footer">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface QueryObj {
  [index: string]: any
}

// 每一个搜索条件对应的一些参数
interface searchItem {
  // 必填
  // 标签名
  label: string
  // 组件所需类型，下拉框或者输入框
  type: string
  // 对应的属性名 如： queryObj.name ~
  prop: string

  // 选填-通用
  // 宽度
  width?: number
  // 占位符
  placeholder?: string
  // 是否清空
  clearable?: boolean
  // 是否使能
  disabled?: boolean
  // 是否隱藏
  hidden?: boolean

  // 选填-特殊
  // 数据，一般是下拉框之类需要可选项的才用到
  data?: any
}

// 这边主要是申明了是个对象数组，并且每个对象定义是按照searchItem这个接口来的
interface Props {
  searchConfig: searchItem[]
}
// 定义props
const props = defineProps<Props>()

// queryObj 就是一个搜索条件的对象，里面每一个属性就是一个搜索条件
// 设置私有属性，防止被修改~
const queryObj = reactive<QueryObj>({})

// 将queryObj暴露出去，父组件才可以调用
defineExpose({
  queryObj,
})
</script>

<script lang="ts">
export default {
  name: 'NxSearch',
}
</script>

<style lang="less" scoped>
.nx-search-box {
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;

  .nx-search-item {
    margin-right: 20px;
    margin-bottom: 10px;
  }

  .nx-search-footer {
    margin-bottom: 10px;
    & > {
      margin-right: 20px;
    }
  }
}
</style>
