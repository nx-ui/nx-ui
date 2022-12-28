<!--
 * @Author: next-ui 55926111@qq.com
 * @Date: 2022-12-27 23:02:00
 * @LastEditors: next-ui 55926111@qq.com
 * @LastEditTime: 2022-12-28 17:41:40
 * @FilePath: \NxUI\src\components\NxFooter\NxFooter.vue
 * @Description:
 *
 * Copyright (c) 2022 by next-ui 55926111@qq.com, All Rights Reserved.
-->
<template>
  <div class="nx-footer">
    <el-pagination
      :total="total"
      v-model:current-page="paginationData.pageNum"
      v-model:page-size="paginationData.pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 30, 50, 100]"
      background
      layout="total, sizes, prev, pager, next, jumper" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

// 暴露props
interface props {
  // 总条目数
  total: number
  // 当前页
  pageNum: number
  // 页数
  pageSize: number
}

const props_1 = defineProps<props>()

const paginationData = reactive({
  pageNum: props_1.pageNum,
  pageSize: props_1.pageSize,
})

// 生成事件对象，数组中就是对象名
const emit = defineEmits(['change', 'update:pageSize', 'update:pageNum'])
// 事件，如果用v-model 其实不是很需要这数据...
function handleSizeChange(e: number) {
  emit('update:pageSize', e)
  emit('change', paginationData)
}
function handleCurrentChange(e: number) {
  emit('update:pageNum', e)
  emit('change', paginationData)
}
</script>

<script lang="ts">
export default {
  name: 'NxFooter',
}
</script>

<style lang="less" scoped>
.nx-footer {
  margin-top: 20px;
  float: right;
}
</style>
