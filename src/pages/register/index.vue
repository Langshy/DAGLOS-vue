<template>
    <el-config-provider :locale="language">
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <p class="title">用户注册</p>
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
                    <el-form-item label="姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：" prop="name">
                        <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="电话号码：" prop="phone">
                        <el-input v-model="ruleForm.phone" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="权限类型：" prop="optionsType">
                        <el-transfer v-model="ruleForm.options" :data="optionsData" :titles="['权限列表', '已有权限']"
                            :filterable="true" :filter-placeholder="'请输入搜索内容'" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm" :loading="loading"
                            style="width: 300px;height: 40px;font-size: 20px;margin: auto;">
                            注册
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
import { computed, reactive, ref } from 'vue'
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn'
import axios from 'axios'
import router from "../../loginrouter.js";

//路由跳转
const routerChange = (n) => {
    router.push(n);
}

//设置中文
const language = computed(() => (zhCn))

const ruleFormRef = ref<FormInstance>()

const loading = ref(false)

//用户名、密码、确认密码、姓名、电话号码

const validateUsername = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入用户名！'))
    } else {
        callback()
    }
}

const validateName = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入姓名！'))
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

const validatePhone = (rule: any, value: any, callback: any) => {
    const reg = /^[1][3-9][0-9]{9}$/
    if (value === '') {
        callback(new Error('请输入电话号码！'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入正确的电话号码！'))
    } else {
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

const ruleForm = reactive({
    username: '',
    passwd: '',
    checkPasswd: '',
    name: '',
    phone: '',
    options: [],
})
const rules = reactive<FormRules<typeof ruleForm>>({
    username: [{ validator: validateUsername, trigger: 'blur' }],
    name: [{ validator: validateName, trigger: 'blur' }],
    passwd: [{ validator: validatePass, trigger: 'blur' }],
    checkPasswd: [{ validator: validatePass2, trigger: 'blur' }],
    phone: [{ validator: validatePhone, trigger: 'blur' }],
})

const submitForm = () => {
    loading.value = true
    // 校验表单
    if (!ruleForm.username || !ruleForm.passwd || !ruleForm.checkPasswd || !ruleForm.name || !ruleForm.phone) {
        // 提示用户
        ElMessage.error('有必填项未填写！');
        loading.value = false
        return
    }

    if (!/^\d{17}(\d|X|x)$/.test(ruleForm.username)) {
        ElMessage.error('用户名必须为身份证号');
        console.log('格式出错！');
        loading.value = false;
        return;
    }

    // 发送 JSON 格式
    axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_BASE_URL}/action/user/registerAction.${import.meta.env.VITE_API_BASE_URL_TYPE}`,
        data: `username=${ruleForm.username}&passwd=${ruleForm.passwd}&name=${ruleForm.name}&phone=${ruleForm.phone}&options=${JSON.stringify(ruleForm.options)}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then((response) => {
        if (response.data.code == 200) {
            ElMessage({
                message: response.data.msg,
                type: 'success',
            })
            routerChange('/')
        } else {
            ElMessage.error(response.data.msg)
        }
        loading.value = false
    }).catch((error) => {
        console.log(error);
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

//定义权限
interface Option {
    key: number
    label: string
    disabled: boolean
}
const optionsData = ref<Option[]>([
    { key: 101, label: '档案查询', disabled: false },
    { key: 102, label: '档案导入', disabled: false },
    { key: 103, label: '档案导出', disabled: false },
    { key: 104, label: '档案管理', disabled: false },
])


</script>

<style scoped>
.title {
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
}
</style>