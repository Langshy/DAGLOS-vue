<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu default-active="overView" class="el-menu-vertical-demo" @select="handleSelect">
        <el-menu-item index="overView">
          <el-icon><icon-menu /></el-icon>
          <span>首页概览</span>
        </el-menu-item>
        <el-sub-menu index="fileManagement">
          <template #title>
            <el-icon><document /></el-icon>
            <span>档案管理</span>
          </template>
          <el-menu-item-group title="被征地农民档案管理">
            <el-menu-item index="fileManagement_1">档案总览</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="fileManagement_2">
            <template #title>item four</template>
            <el-menu-item index="fileManagement_2_1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="setUp">
          <el-icon><setting /></el-icon>
          <span>系统设置</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="js" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import router from "../router.js";


//路由跳转
const routerChange = (n) => {
  router.push(n);
}

const handleSelect = (key) => {
  console.log(key)
  switch (key) {
    case 'overView':
      routerChange("/")
      break;
    case 'fileManagement_1':
      routerChange("/register")
      break;
    case 'fileManagement_2_1':
    routerChange("/")
    default:
      break;
  }
}
</script>