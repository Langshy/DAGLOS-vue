<template>
    <div class="top">
        <el-config-provider :locale="language">
        <el-form :model="formData" :inline="true" class="form-inline">
            <el-form-item label="县区:">
                <el-select v-model="formData.county_id" disabled  placeholder="请选择县区">
                    <el-option v-for="item in counties" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
            </el-form-item>
            <el-form-item label="乡镇:">
                <el-select v-model="formData.town_id" placeholder="请选择乡镇">
                    <el-option v-for="item in townOptions" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
            </el-form-item>
            <el-form-item label="村:">
                <el-select v-model="formData.village_id" placeholder="请选择村">
                    <el-option v-for="item in villageOptions" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
            </el-form-item>
        </el-form>
    </el-config-provider>
    </div>

    <div class="center">

    </div>
</template>
<script setup>
import { reactive , computed } from 'vue';
import zhCn from 'element-plus/dist/locale/zh-cn'

//设置中文
const language = computed(() => (zhCn))



const formData = reactive({
    county_id:360311,
    town_id:'',
    village_id:''
})

//县区代码
const counties = [
    {
        value:360311,
        label:'上栗县'
    }
]

//乡镇代码
const townOptions = []

//村镇代码
const villageOptions = []

//获取乡镇
const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/action/comm/getAllTown.${import.meta.env.VITE_API_BASE_URL_TYPE}`;




</script>
<style>
.top {
    height: 150px;
    width: auto;
    background-color: white;
    border-radius: 10px;
}

.center {
    margin-top: 10px;
    height: auto;
    min-height: 400px;
    width: auto;
    background-color: white;
    border-radius: 10px;
}

.form-inline {
    --el-input-width: 20px;
}

.form-inline .el-select {
    --el-select-width: 240px;
}
</style>