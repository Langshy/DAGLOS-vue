<template>
    <div class="item-back">
        <el-row :gutter="20">
            <div class="logo">
                <img src="/logo.png" style="height: 150px;margin-top: 20px;margin-left: 20px;">
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
                            <el-input v-model="form.username"
                                style="width: 350px;height: 40px;size:'large';margin: 15px;" />
                            <span slot="label">
                                <span>密&nbsp;&nbsp;&nbsp;码：</span>
                            </span>
                            <el-input v-model="form.passwd" type="password"
                                style="width: 350px;height: 40px;size:'large';margin: 15px;" show-password />
                            <el-form-item>
                                <el-button type="primary" size="large" @click="onSubmit"
                                    style="width: 50%;margin: auto !important" :loading="loginLoad">登录</el-button>
                            </el-form-item>
                            <el-form label-width="auto"> 
                                <el-form-item style="margin-left: 50;margin-top: 20px">
                                    <span style="margin-left: 70px"></span> 
                                    <RouterLink to="/registers" style="color: #409EFF">账号注册</RouterLink>
                                    <span style="margin-left: 200px"></span> 
                                    <RouterLink to="/cp" style="color: #409EFF">修改密码</RouterLink>
                                </el-form-item>
                            </el-form>
                        </el-form>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref,reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useCookies } from "vue3-cookies";
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
    if (response.data.code == 200) {
      window.location.href = '/';
    }
  }).catch((error) => {
    console.log(error);
  })
}
// 定义登录账号和密码
const form = reactive({
  username: '',
  passwd: '',
})

//登录加载
const loginLoad = ref(false);
//登录
const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/action/user/loginAction.${import.meta.env.VITE_API_BASE_URL_TYPE}`;
const onSubmit = () => {
  loginLoad.value = true;
  // 判断是否为空
  if (form.username == '' || form.passwd == '') {
    ElMessage.error('用户名或密码不能为空');
    loginLoad.value = false;
    return;
  }
  // 基本长度检查
  if (form.username.length != 18) {
    ElMessage.error('用户名必须为身份证号');
    loginLoad.value = false;
    console.log('长度出错！');
    return;
  }
  // 前17位必须是数字
  if (!/^\d{17}(\d|X|x)$/.test(form.username)) {
    ElMessage.error('用户名必须为身份证号');
    console.log('格式出错！');
    loginLoad.value = false;
    return;
  }
  // 校验位验证
  if (!verifyCheckDigit(form.username)) {
    ElMessage.error('身份证号码校验位不正确');
    loginLoad.value = false;
    return;
  }
  // 发送 JSON 格式
  axios({
    method: 'post',
    url: apiUrl,
    data: `username=${form.username}&passwd=${form.passwd}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }).then((response) => {
    console.log(response);
    if (response.data.code == 200) {
      ElMessage({
        message: response.data.msg,
        type: 'success',
      })
      setLogin(loginKey, response.data.token);
      window.location.href = '/';
    } else {
      ElMessage.error(response.data.msg)
    }
  }).catch((error) => {
    console.log(error);
  }).finally(() => {
    loginLoad.value = false;
  })
}

// 校验位验证函数
const verifyCheckDigit = (idCard) => {
  // 加权因子
  const weightFactors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  // 校验码对应值
  const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += parseInt(idCard.charAt(i)) * weightFactors[i];
  }

  const mod = sum % 11;
  const lastChar = idCard.charAt(17).toUpperCase();

  return lastChar === checkCodes[mod];
};

</script>

<style scoped>
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