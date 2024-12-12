<script setup>
import { ref } from "vue";
import Header from './components/Header.vue';
import Aside from './components/Aside.vue';
import PageFooter from './components/PageFooter.vue';
import login from "./components/login.vue";

const title = ref("档案管理");
const isLogin = ref(false);
</script>

//容器布局
<template>
  <!-- 主页 -->
  <div v-if="isLogin" class="common-layout">
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside/>
        </el-aside>
        <el-container>
          <el-main>{{ title }}</el-main>
          <el-footer>
            <PageFooter/>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>

    <!-- 登录 -->
  <div v-else><login/></div>
</template>

<style scoped>

</style>