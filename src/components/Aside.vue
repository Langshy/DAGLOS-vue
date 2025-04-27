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
          <el-menu-item index="archives">档案总览</el-menu-item>
          <el-sub-menu index="archive">
            <template #title>档案管理</template>
            <el-menu-item index="archiveImport">档案导入</el-menu-item>
            <el-menu-item index="archiveExtract">档案导出</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="correction">档案更正</el-menu-item>
          <el-menu-item index="statistics">档案统计</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="policyDocuments">
          <template #title>
            <el-icon>
              <Document />
            </el-icon>
            <span>政策文件</span>
          </template>
          <el-sub-menu index="projectApprovalDocument">
            <template #title>项目批复文件</template>
            <el-menu-item index="projectImport">导入</el-menu-item>
            <el-menu-item index="projectDelete">删除</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="townlevelSummaryTable">
            <template #title>乡镇汇总表</template>
            <el-menu-item index="import">导入</el-menu-item>
            <el-menu-item index="delete">删除</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="SelfServiceCenter">
          <el-icon><Operation /></el-icon>
          <span>个人中心</span>
        </el-menu-item>
        <el-sub-menu index="userManagement">
          <template #title>
            <el-icon>
            <User />
          </el-icon>
          <span>用户管理</span>
          </template>
          <el-menu-item index="correction">用户列表</el-menu-item>
          <el-menu-item index="statistics">权限管理</el-menu-item>
        </el-sub-menu>
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