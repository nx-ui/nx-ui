<!--
 * @Author: next-ui 55926111@qq.com
 * @Date: 2022-12-27 16:04:46
 * @LastEditors: next-ui 55926111@qq.com
 * @LastEditTime: 2022-12-28 16:08:11
 * @FilePath: \NxUI\src\components\NxButton\NxButton.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by next-ui 55926111@qq.com, All Rights Reserved. 
-->

<template>
    <button @click="clickBtn">test</button>
    <el-button>test2</el-button>
  </template>
  
  <script setup lang="ts">
  function clickBtn() {
    console.log("clickBtn...");
  }
  </script>
  <script lang="ts">
  export default {
    name: "NxButton",
  };
  </script>
  
<style lang="scss" scoped>
.publish-info {
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Ubuntu, Cantarell, 'Noto Sans', sans-serif;
  font-size: 12px;
  line-height: 12px;
  color: $font-color-gray; // 这里引入
}
</style>
<style lang="less" scoped>
.nx1-footer {
  margin-top: 20px;
  float: right;
}
</style>