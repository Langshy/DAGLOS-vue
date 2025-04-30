<template>
    <div class="top">
        <el-config-provider :locale="language">
            <el-form :model="formData" :inline="true" class="form-inline">
                <el-form-item label="县区:">
                    <el-select v-model="formData.county_id" disabled placeholder="请选择县区">
                        <el-option v-for="item in counties" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="乡镇:">
                    <el-select v-model="formData.town_id" placeholder="请选择乡镇" @change="getVillage">
                        <el-option v-for="item in townOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="村:">
                    <el-select v-model="formData.village_id" placeholder="请选择村">
                        <el-option v-for="item in villageOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
            </el-form>
        </el-config-provider>
    </div>

    <div class="center">

    </div>
</template>
<script setup>
import { reactive, computed, ref } from 'vue';
import zhCn from 'element-plus/dist/locale/zh-cn'
import axios from 'axios';

//设置中文
const language = computed(() => (zhCn))



const formData = reactive({
    county_id: 360311,
    town_id: '',
    village_id: ''
})

//县区代码
const counties = [
    {
        value: 360311,
        label: '上栗县'
    }
]

//乡镇代码
const townOptions = [
    {
        value: 1001,
        label: '上栗镇'
    },
    {
        value: 1002,
        label: '金山镇'
    },
    {
        value: 1003,
        label: '桐木镇'
    },
    {
        value: 1004,
        label: '鸡冠山乡'
    },
    {
        value: 1005,
        label: '长平乡'
    },
    {
        value: 1006,
        label: '杨岐乡'
    },
    {
        value: 1007,
        label: '赤山镇'
    },
    {
        value: 1008,
        label: '东源乡'
    }
]

//村镇代码
const villageOptions = ref([])

//获取村
const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/action/comm/getAllVillage.${import.meta.env.VITE_API_BASE_URL_TYPE}`;
const getVillage = (key) => {
    axios.get(apiUrl, {
        params: {
            town_id: key
        }
    }).then((res) => {
        if (res.data.code == 200) {
            villageOptions.value = res.data.data.map(item => ({
                value: item.value,
                label: item.village_name
            }));
        } else {
            villageOptions.value = []
        }
    }).catch((err) => {
        console.log(err)
    })
}



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
    --el-input-width: 25px;
}

.form-inline .el-select {
    --el-select-width: 300px;
}
</style>