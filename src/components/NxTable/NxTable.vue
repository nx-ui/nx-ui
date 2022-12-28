<!--
 * @Author: next-ui 55926111@qq.com
 * @Date: 2022-12-27 18:35:58
 * @LastEditors: next-ui 55926111@qq.com
 * @LastEditTime: 2022-12-28 17:46:14
 * @FilePath: \NxUI\src\components\NxTable\NxTable.vue
 * @Description:
 *
 * Copyright (c) 2022 by next-ui 55926111@qq.com, All Rights Reserved.
-->

<template>
  <el-table
    :data="props.tableData"
    table-layout="fixed"
    border
    highlight-current-row
    size="large"
    empty-text="-"
    stripe>
    <!-- el-table 没数据插槽 -->
    <template #empty>
      <h1>没数据</h1>
    </template>

    <!-- 选择框，通过props.isSelection 来判断是否需要展示 -->
    <el-table-column v-if="props.isSelection" type="selection" width="55" />
    <!-- 索引，默认展示索引 -->
    <el-table-column type="index" width="50" />

    <template v-for="item in props.columnConfig" :key="item.label">
      <el-table-column
        v-if="item.hidden != true"
        :fixed="item.fixed"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || 'auto'"
        show-overflow-tooltip>
        <template #default="{ row, column, $index }">
          <span style="white-space: nowrap" v-if="item.render">
            {{
              item.render(row[item.prop]) ||
              (row[item.prop] === 0 ? '0' : false) ||
              item.emptyStr ||
              '--'
            }}
          </span>
          <span style="white-space: nowrap" v-else>
            {{ row[item.prop] || (row[item.prop] === 0 ? '0' : false) || item.emptyStr || '--' }}
          </span>
        </template>
      </el-table-column>
    </template>

    <!-- 操作列 -->
    <el-table-column v-if="hasOpr" fixed="right" label="操作" width="200">
      <!-- 这边是插槽组件，外部无法访问到里面的数据，比如每一列的item -->
      <!-- 使用作用域插槽，将数据从element组件拿下来，
          再通过 自定义插槽属性scope 传递到父组件，
          使父组件可以调用子组件的数据 -->
      <template #default="{ row, column, $index }">
        <slot :scope="{ row, column, $index }"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
// 渲染函数，比如后端给你返回了0 代表 禁止， 1 代表启用
// 这个时候就需要渲染函数了...
interface render {
  (v: any): string
}

// columnConfig 是一个columnItemObj对象的数组
interface columnConfig {
  [index: string]: columnItemObj
}

// 每一列的配置对象
interface columnItemObj {
  // 必填
  // el-table prop 属性 字段名
  prop: string
  // el-table label 属性 列名
  label: string

  // 选填
  // 判断是否隐藏，一些业务需求，比如不同的权限可能就不展示了
  hidden?: boolean
  // 列无数据占位符
  emptyStr?: string
  // el-table fixed 属性 左右固定布局  只能在头尾的配置中存在
  fixed?: string
  // el-table 一列的 width 属性 宽度
  width?: number | string
  // 自定义渲染
  render?: render
}

// tableData的item对象，是一个不确定的对象
interface dataItemObj {
  [index: string]: any
}

interface Props {
  // 表格数据
  tableData: {
    [index: number]: dataItemObj
  }
  // 列数据
  columnConfig: columnConfig
  // 判断表格有无列操作
  hasOpr?: boolean
  // 判断是否有checkbox
  isSelection?: boolean
}

const props = defineProps<Props>()
// console.log("props:", props.columnConfig);
</script>

<script lang="ts">
export default {
  name: 'NxTable',
}
</script>

<style lang="less" scoped>
.el-table-border {
  border: 1px #eee solid;
}
// :deep(.el-scrollbar__view) {
//   width: 100%;
// }
</style>
