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
        <el-sub-menu index="archive">
          <template #title>
            <el-icon>
              <Files />
            </el-icon>
            <span>档案</span>
          </template>
          <el-menu-item index="archiveQuery">档案查询</el-menu-item>
          <el-sub-menu index="archiveManagement">
            <template #title>档案管理</template>
            <el-menu-item index="archiveImport">档案导入</el-menu-item>
            <el-menu-item index="archiveExtract">档案导出</el-menu-item>
            <el-menu-item index="archiveCorrection">档案更正</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="archiveStatistics">档案统计</el-menu-item>
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
            <el-menu-item index="projectQuery">查询</el-menu-item>
            <el-menu-item index="projectImport">导入</el-menu-item>
            <el-menu-item index="projectDelete">删除</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="townlevelSummaryTable">
            <template #title>乡镇汇总表</template>
            <el-menu-item index="query">查询</el-menu-item>
            <el-menu-item index="import">导入</el-menu-item>
            <el-menu-item index="delete">删除</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="userManagement">
          <template #title>
            <el-icon>
            <User />
          </el-icon>
          <span>用户管理</span>
          </template>
          <el-menu-item index="userList">用户列表</el-menu-item>
          <el-menu-item index="rightsManagement">权限管理</el-menu-item>
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
    case 'archiveQuery':
      routerChange("/archiveQuery")
      break;
    case 'archive':
      routerChange("/Archive/index")
      break;
    case 'archiveAdd':
      routerChange("/Archive/add")
      break;
    default:
      break;
  }
}
</script>