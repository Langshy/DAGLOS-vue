<script setup>
import { ref, reactive, inject } from "vue";
import Header from './components/Header.vue';
import Aside from './components/Aside.vue';
import PageFooter from "./components/PageFooter.vue";
// import Labels from "./components/Labels.vue";
import router from "./router.js";
import { useCookies } from "vue3-cookies";
import { ElMessage } from 'element-plus';
import axios from 'axios';

//登录状态
const loginKey = 'login';
const loginType = ref(true);
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
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/action/isLoginAction.${import.meta.env.VITE_API_BASE_URL_TYPE}`;
  //身份验证
  axios({
    method:'post',
    // url:'http://localhost/action/isLoginAction.php',
    url: apiUrl,
    data:{
      token: getLogin(loginKey)
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }).then((response) => {
    if (response.data.code == 200) {
      loginType.value = true;
    } else {
      loginType.value = false;
    }
  }).catch((error) => {
    console.log(error);
  })
  loginType.value = true;
}else{
  loginType.value = false;
}
// 定义登录账号和密码
const form = reactive({
  username: '',
  passwd: '',
})

//登录加载
const loginLoad = ref(false);
//登录
const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/action/loginAction.${import.meta.env.VITE_API_BASE_URL_TYPE}`;
const onSubmit = () => {
  loginLoad.value = true;
  // 发送 JSON 格式
  axios({
    method: 'post',
    // url: 'http://localhost/action/loginAction.php',
    url: apiUrl,
    data: {
      username: form.username,
      passwd: form.passwd
    } ,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }).then((response) => {
    console.log(response);
    if (response.data.code == 200) {
      ElMessage({
        message: response.data.msg,
        type: 'success',
      })
      setLogin(loginKey, response.data.token);
      loginType.value = true;
    } else {
      ElMessage.error(response.data.msg)
    }
  }).catch((error) => {
    console.log(error);
  }).finally(() => {
    loginLoad.value = false;
  })
}

</script>

<!-- 容器布局 -->
<template>
  <!-- 主页 -->
  <div v-if="loginType" class="common-layout" :style="{ height: contentHeight + 'px' }">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px" :style="{ height: contentHeight + 'px' }" class="aside_border">
          <Aside />
        </el-aside>
        <el-container style="background-color: #f6f6f6;">
          <el-main>
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

  <!-- 登录 -->
  <div v-else class="item-back">
    <el-row :gutter="20">
      <div class="logo">
        <img src="/public/logo.png" style="height: 150px;margin-top: 20px;margin-left: 20px;">
      </div>
      <el-col :span="15" :offset="13">
        <div class="grid-content ep-bg-purple item-box">
          <div class="loginTitle">
            <span>登录</span>
          </div>
          <div class="loginForm">
            <el-form :model="form" label-width="auto" style="max-width: 600px">
              <span slot="label">
                <span>用户名：</span>
              </span>
              <el-input v-model="form.username" style="width: 350px;height: 40px;size:'large';margin: 15px;" />
              <span slot="label">
                <span>密&nbsp;&nbsp;&nbsp;码：</span>
              </span>
              <el-input v-model="form.passwd" type="password"
                style="width: 350px;height: 40px;size:'large';margin: 15px;" show-password />
              <el-form-item>
                <el-button type="primary" size="large" @click="onSubmit" style="width: 50%;margin: auto !important"
                  :loading="loginLoad">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
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

@media (min-width: 800px) {
  .item-back {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 1980px;
    height: 100%;
    background-image: url("/public/login/login-back.png");
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-position: center 0;
  }
}

.item-box {
  height: 350px;
  width: 550px;
  margin-top: 20%;
  background-color: white;
  border-radius: 20px !important;
}

.loginTitle {
  text-align: center;
  padding-top: 50px;
  font-size: 25px;
}

.loginForm {
  width: 450px;
  height: 200px;
  margin: auto;
  margin-top: 10px;

}

.custom-label .el-form-item__label {
  font-size: 20px !important;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.el-main {
  padding: 20px;
  margin: 10px;
  background-color: white;
  border-radius: 10px;
}

.logo {
  text-align: center;
  margin-top: 50px;
  margin-left: 50px;
  position: absolute;
}
</style>