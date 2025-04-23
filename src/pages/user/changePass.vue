<template>
    <el-config-provider>
        <el-row :gutter="24">
            <el-col :span="12" :offset="6">
                <p class="title">密码修改</p>
                <el-form ref="ruleFormRef" style="width: 650px;margin: auto;" :model="ruleForm" status-icon
                    :rules="rules" label-width="auto" class="demo-ruleForm">
                    <el-form-item label="用&nbsp;&nbsp;户&nbsp;&nbsp;名：" prop="username">
                        <el-input v-model="ruleForm.username" type="text" autocapitalize="off" />
                    </el-form-item>
                    <el-form-item label="密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：" prop="passwd">
                        <el-input v-model="ruleForm.passwd" type="password" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="确认密码：" prop="checkPasswd">
                        <el-input v-model="ruleForm.checkPasswd" type="password" autocomplete="off" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm" :loading="loading"
                            style="width: 300px;height: 40px;font-size: 20px;margin: auto;">
                            密码修改
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="resetForm(ruleFormRef)"
                            style="width: 300px;height: 40px;font-size: 20px;margin: auto;">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-config-provider>
</template>
<script lang="ts" setup>
import {reactive, ref } from 'vue'
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import router from "../../loginrouter.js";
import axios from 'axios';

//路由跳转
const routerChange = (n) => {
    router.push(n);
}
const ruleFormRef = ref<FormInstance>()

const loading = ref(false)

const ruleForm = reactive({
    username: '',
    passwd: '',
    checkPasswd: '',
})

//用户名、密码、确认密码
const validateUsername = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入用户名！'))
    } else {
        callback()
    }
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码！'))
    } else {
        if (ruleForm.checkPasswd !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass')
        }
        callback()
    }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再输入一次密码！'))
    } else if (value !== ruleForm.passwd) {
        callback(new Error("两次密码输入不同，请重新输入！"))
    } else {
        callback()
    }
}

const rules = reactive<FormRules<typeof ruleForm>>({
    username: [{ validator: validateUsername, trigger: 'blur' }],
    passwd: [{ validator: validatePass, trigger: 'blur' }],
    checkPasswd: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = () => {
    loading.value = true;
    // 校验表单
    if (!ruleForm.username || !ruleForm.passwd || !ruleForm.checkPasswd) {
        // 提示用户
        ElMessage.error('有必填项未填写！');
        loading.value = false
        return
    }
    // if (!/^\d{17}(\d|X|x)$/.test(ruleForm.username)) {
    //     ElMessage.error('用户名必须为身份证号');
    //     console.log('格式出错！');
    //     loading.value = false;
    //     return;
    // }

    //发送请求
    axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_BASE_URL}/action/user/passwdChange.${import.meta.env.VITE_API_BASE_URL_TYPE}`,
        data: {
            username: ruleForm.username,
            passwd: ruleForm.passwd,
            checkPasswd: ruleForm.checkPasswd
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
        if (res.data.code === 200) {
            ElMessage.success(res.data.msg);
            routerChange('/');
        } else {
            ElMessage.error(res.data.msg);
        }
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        loading.value = false;
    })
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}


</script>

<style scoped>
.title {
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
}
</style>
