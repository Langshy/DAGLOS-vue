<script setup>
import { ref,reactive } from "vue";
import Header from './components/Header.vue';
import Aside from './components/Aside.vue';
import PageFooter from './components/PageFooter.vue';
// import login from "./components/Login.vue";

const title = ref("档案管理");
const isLogin = ref(false);
console.log(isLogin);


// 定义登录账号和密码
const form = reactive({
    username:'',
    passwd:'',
})

//定义登录token
const token = ref();

const loginLoad = ref(false);

//登录
const onSubmit = () => {
    loginLoad.value = true;
    isLogin.value = true;
    console.log(isLogin.value)
}
</script>

<!-- 容器布局 -->
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
  <div v-else>
    <div class="item-back">
        <el-row :gutter="20">
            <el-col :span="10" :offset="12">
                <div class="grid-content ep-bg-purple item-box">
                    <h1 class="loginTitle">档案管理系统</h1>
                    <div class="loginForm">
                        <el-form :model="form" label-width="auto" style="max-width: 600px">
                            <span slot="label">
                                <span>用户名：</span>
                            </span>
                            <el-input v-model="form.username" style="width: 400px;height: 40px;size:'large';margin: 15px;"/>
                            <span slot="label">
                                <span>密&nbsp;&nbsp;&nbsp;码：</span>
                            </span>
                            <el-input v-model="form.passwd" type="password" style="width: 400px;height: 40px;size:'large';margin: 15px;" show-password/>
                            <el-form-item >
                                <el-button type="primary" size="large" @click="onSubmit" style="width: 80%;margin: auto !important" :loading="loginLoad">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px){
    .item-back{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url("/public/login/login-back.png");
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-background-size:cover;
        -moz-background-size:cover;
        background-position: center 0;
    }
}

.item-box{
    height: 450px;
    margin-top: 20%;
    background-color: white;
    border: 2px solid black;
    border-radius: 20px !important;
}

.loginTitle{
    text-align: center;
    margin-top: 50px;
    font-size: 50px;

}
.loginForm{
    width: 500px;
    height: 300px;
    margin: auto;
    margin-top: 100px;

}

.custom-label .el-form-item__label{
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
</style>