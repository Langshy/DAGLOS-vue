<script setup>

import { useRoute } from 'vue-router'
import router from "../../router.js";

//获取路由传参
const route = useRoute()
const id = route.params.id

console.log(id)



</script>
<template>
    <!-- 导航条 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/Archive/index' }">档案总览</el-breadcrumb-item>
        <el-breadcrumb-item>添加档案</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="tableHeader">
        <h1>详情页</h1>
        <p>id: {{ id }}</p>
    </div>
</template>