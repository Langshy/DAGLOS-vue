<script lang="js" setup>
import { ref } from 'vue'
// import { RouterLink } from 'vue-router';
import router from "../router.js";
import { useCookies } from "vue3-cookies";
import axios from 'axios';

const { cookies } = useCookies();
//路由跳转
const routerChange = (n) => {
  router.push(n);
}

//登录信息
const token = cookies.get('login');
const  name = ref('admin')
if (token) {
  axios({
    method:'post',
    url:'http://api.daglos.com/action/header/getUserInfoAction.php',
    data:{
      token: token
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }).then((response) => {
    if (response.data.code == 200) {
      name.value = response.data.username;
    } else {
      name.value = '未登录';
    }
  }).catch((error) => {
    console.log(error);
  })
}



const activeIndex = ref('home')
const handleSelect = (key) => {
  console.log(key)
  switch (key) {
    case 'home':
      routerChange("/index")
      break;
    case 'loginOut':
      cookies.remove('login');
      routerChange("/login")
      location.reload();
      break;
    case 'user':
      routerChange("/userPage")
      break;
    default:
      break;
  }
}
const input = ref('')
</script>
<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
    @select="handleSelect">
    <el-menu-item index="home"><img src="/public/icon.png" style="width: 30px;margin-right: 10px;"/>被征地农民工档案管理</el-menu-item>
    <el-menu-item>
      <el-input v-model="input" style="width: 240px" placeholder="请输姓名或身份证号搜索信息" clearable />
    </el-menu-item>
    <el-menu-item index="2">
      <span>{{ name }}</span>
    </el-menu-item>
    <el-sub-menu index="3">
      <template #title>更多</template>
      <el-menu-item index="user">个人中心</el-menu-item>
      <el-menu-item index="loginOut">登出</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style>
.el-menu--horizontal>.el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
<style scoped>
a {
  text-decoration: none;
}
</style>
