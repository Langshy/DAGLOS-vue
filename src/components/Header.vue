<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">首页</el-menu-item>
    <el-menu-item>
      <el-input v-model="input" style="width: 240px" placeholder="请输姓名或身份证号" clearable/>
    </el-menu-item>
    <el-menu-item index="1">
      <span>陈汝乾</span>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>更多</template>
      <el-menu-item index="2-1">添加用户</el-menu-item>
      <el-menu-item index="2-2">搜索</el-menu-item>
      <el-menu-item index="2-3">登出</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const input = ref('')
</script>

<style>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
<style scoped>

</style>
