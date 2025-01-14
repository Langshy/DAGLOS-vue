<script setup>
import { ref,reactive } from "vue";
import { ElMessage } from 'element-plus';

// 定义登录账号和密码
const form = reactive({
    username:'',
    passwd:'',
})

//定义登录token
const token = '21232f297a57a5a743894a0e4a801fc3'

const loginLoad = ref(false);
//登录
const onSubmit = () => {
    //loginLoad.value = true;
    //密码错误
    ElMessage.error('账号或密码输入错误！')
    //密码正确
    ElMessage({
      message: '登录成功！',
      type: 'success',
  })
//   window.location.href='/'
}

</script>
<template>
 <!-- 登录 -->
 <div class="item-back">
        <el-row :gutter="20">
            <el-col :span="15" :offset="13">
              <div class="grid-content ep-bg-purple item-box">
                    <div class="loginTitle">
                        <span>账号登录</span>
                    </div>
                    <div class="loginForm">
                        <el-form :model="form" label-width="auto" style="max-width: 600px">
                            <span slot="label">
                                <span>用户名：</span>
                            </span>
                            <el-input v-model="form.username" style="width: 350px;height: 40px;size:'large';margin: 15px;"/>
                            <span slot="label">
                                <span>密&nbsp;&nbsp;&nbsp;码：</span>
                            </span>
                            <el-input v-model="form.passwd" type="password" style="width: 350px;height: 40px;size:'large';margin: 15px;" show-password/>
                            <el-form-item >
                                <el-button type="primary" size="large" @click="onSubmit" style="width: 50%;margin: auto !important" :loading="loginLoad">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
              </div>
            </el-col>
        </el-row>
    </div>
</template>
<style scoped>
@media (min-width: 800px){
    .item-back{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        max-width: 1980px;
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
    height: 350px;
    width: 550px;
    margin-top: 20%;
    background-color: white;
    border-radius: 20px !important;
}

.loginTitle{
    text-align: center;
    padding-top: 50px;
    font-size: 25px;
}
.loginForm{
    width: 450px;
    height: 200px;
    margin: auto;
    margin-top: 10px;

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