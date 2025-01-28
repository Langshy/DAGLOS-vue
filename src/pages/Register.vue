<template>
    <!-- 导航条 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户注册</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
        <el-col :span="12" :offset="6">
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules"
                label-width="auto" class="demo-ruleForm">
                <el-form-item label="用户名：" prop="name">
                    <el-input v-model="ruleForm.name" type="text" autocapitalize="off" />
                </el-form-item>
                <el-form-item label="密码：" prop="pass">
                    <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="确认密码：" prop="checkPass">
                    <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="账户类型" prop="optionsType">
                    <el-select v-model="ruleForm.optionsType" placeholder="请选择">
                        <el-option label="管理员" value="1" />
                        <el-option label="操作员" value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-transfer v-model="ruleForm.options" :data="optionsData" :titles="['权限列表', '已有权限']" :filterable="true"
                        :filter-placeholder="'请输入搜索内容'"/>
                </el-form-item>
                <el-form-item style="margin-left: 40%;">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        注册
                    </el-button>
                    <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const validateName = (rule: any, value: any, callback: any) => {
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
        if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass')
        }
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再输入一次密码！'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("两次密码输入不同，请重新输入！"))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    name: '',
    pass: '',
    checkPass: '',
    optionsType: '',
    options: [],
})

const rules = reactive<FormRules<typeof ruleForm>>({
    name: [{ validator: validateName, trigger: 'blur' }],
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
            console.log(ruleForm)
        } else {
            console.log('error submit!')
        }
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
    { key: 101, label: '添加户', disabled: false },
    { key: 102, label: '资料上传', disabled: false },
    { key: 103, label: '资料修改', disabled: false },
    { key: 104, label: '用户添加', disabled: false },
])


</script>

<style scoped>
.el-row {
    padding-top: 50px;
}
</style>