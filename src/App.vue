<script setup>
import Header from './components/Header.vue';
import Aside from './components/Aside.vue';
import PageFooter from "./components/PageFooter.vue";
import { useCookies } from "vue3-cookies";
import { ElMessage } from 'element-plus';
import axios from 'axios';

//登录状态
const loginKey = 'login';
const { cookies } = useCookies();

//设置登录状态
const setLogin = (key, val) => {
  cookies.set(key, val);
  cookies.config('1d');
}

//获取登录状态
const getLogin = (key) => {
  return cookies.get(key);
}

//判断是否登录
if (getLogin(loginKey)) {
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/action/user/isLoginAction.${import.meta.env.VITE_API_BASE_URL_TYPE}`;
  //身份验证
  axios({
    method: 'post',
    url: apiUrl,
    data: {
      token: getLogin(loginKey)
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }).then((response) => {
    if (response.data.code != 200) {
      ElMessage.error('登录状态已失效，请重新登录');
      setLogin(loginKey, '');
      window.location.href = '/login';
    }
  }).catch((error) => {
    console.log(error);
  })
} else {
  window.location.href = '/login';
}
</script>

<!-- 容器布局 -->
<template>
  <!-- 主页 -->
  <div class="common-layout" :style="{ height: contentHeight + 'px' }">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px" :style="{ height: contentHeight + 'px' }" class="aside_border">
          <Aside />
        </el-aside>
        <el-container style="background-color: #f6f6f6;">
          <el-main style="padding: 10px;">
            <RouterView></RouterView>
            <!-- <Labels/> -->
          </el-main>
          <el-footer>
            <PageFooter />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 初始化内容高度
      contentHeight: 0
    };
  },
  mounted() {
    // 当组件挂载完成后，设置初始高度
    this.setContentHeight();
    // 添加窗口大小改变的监听器
    window.addEventListener('resize', this.setContentHeight);
  },
  beforeDestroy() {
    // 组件销毁前移除监听器
    window.removeEventListener('resize', this.setContentHeight);
  },
  methods: {
    setContentHeight() {
      // 设置内容高度为窗口高度减去其他固定元素的高度
      this.contentHeight = window.innerHeight - 100; // 假设有100px其他固定高度的元素
    }
  }
};
</script>

<style scoped>
.el-aside {
  border-right: 1px solid var(--el-border-color);
  padding: 0%;
}

.el-footer {
  height: 20px;
  padding: 0%;
  background-color: white;
}

.el-header {
  padding: 0%;
}
</style>