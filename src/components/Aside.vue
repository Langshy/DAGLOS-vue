<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu default-active="overView" class="el-menu-vertical-demo" @select="handleSelect">
        <el-menu-item index="overView">
          <el-icon>
            <Menu />
          </el-icon>
          <span>首页概览</span>
        </el-menu-item>
        <el-sub-menu index="fileManagement">
          <template #title>
            <el-icon>
              <Files />
            </el-icon>
            <span>档案管理</span>
          </template>
          <el-menu-item index="archive">档案总览</el-menu-item>
          <el-sub-menu index="fileManagement_2">
            <template #title>档案操作</template>
            <el-menu-item index="archiveAdd">档案添加</el-menu-item>
            <el-menu-item index="fileManagement_2_2">添加户籍</el-menu-item>
            <el-menu-item index="fileManagement_2_3">档案修改</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="setUp">
          <template #title>
            <el-icon>
              <setting />
            </el-icon>
            <span>系统设置</span>
          </template>
          <el-menu-item index="register">账号添加</el-menu-item>
          <el-menu-item index="registerLIst">账户查看</el-menu-item>
          <el-menu-item index="registerOptions">权限设置</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="user">
          <el-icon>
            <User />
          </el-icon>
          <span>个人中心</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="js" setup>
import router from "../router.js";


//路由跳转
const routerChange = (n) => {
  router.push(n);
}

const handleSelect = (key) => {
  console.log(key)
  switch (key) {
    case 'overView':
      routerChange("/index")
      break;
    case 'archive':
      routerChange("/Archive/index")
      break;
    case 'archiveAdd':
      routerChange("/Archive/add")
      break;
    case 'fileManagement_2_1':
      routerChange("/")
      break;
    case 'fileManagement_2_2':
      routerChange("/")
      break;
    case 'fileManagement_2_3':
      routerChange("/")
      break;
    case 'register':
      routerChange("/register")
      break;
    case 'registerLIst':
      routerChange("/registerList")
      break;
    case 'registerOptions':
      routerChange("/registerOptions")
      break;
    default:
      break;
  }
}
</script>