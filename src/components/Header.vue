<script lang="js" setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router';
import router from "../router.js";

//路由跳转
const routerChange = (n) =>{
  router.push(n);
}

const activeIndex = ref('1')
const handleSelect = (key) => {
  console.log(key)
  switch(key){
    case 'home':
      routerChange("/")
      break;
    case 'loginOut':
      routerChange("/login")
      break;
    case 'register':
      routerChange("/register")
    default:
      break;
  }
}
const input = ref('')
</script>
<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="home">首页</el-menu-item>
    <el-menu-item>
      <el-input v-model="input" style="width: 240px" placeholder="请输姓名或身份证号" clearable/>
    </el-menu-item>
    <el-menu-item index="2">
      <span>陈汝乾</span>
    </el-menu-item>
    <el-sub-menu index="3">
      <template #title>更多</template>
      <el-menu-item index="register">
        <RouterLink index="register">添加用户</RouterLink>
      </el-menu-item>
      <el-menu-item index="loginOut">登出</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
<style scoped>
a{
  text-decoration: none;
}
</style>
