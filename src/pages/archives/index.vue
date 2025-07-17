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
                <el-form-item label="档案编号（户号）：">
                    <el-input style="width: 200px" v-model="formData.file_id" clearable placeholder="请输入" />
                </el-form-item>
                <el-form-item label="被征地项目名称：">
                    <el-select v-model="formData.project_name" placeholder="请选择项目">
                        <el-option v-for="item in project" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="被征地时间：">
                    <el-date-picker v-model="formData.land_acquisition_time" type="date" placeholder="请选择日期" style="" />
                </el-form-item>
                <el-form-item label="资格认定时间：">
                    <el-date-picker v-model="formData.qualification_recognition_time" type="date" placeholder="请选择日期" />
                </el-form-item>
                <el-form-item label="批准部门：">
                    <el-input style="width: 200px" v-model="formData.approval_department" clearable placeholder="请输入" />
                </el-form-item>
                <el-form-item label="被征地时家庭成员数：">
                    <el-input style="width: 150px" v-model="formData.family_num_a" type="number" clearable
                        placeholder="请输入" />
                </el-form-item>
                <el-form-item label="现家庭成员数：">
                    <el-input style="width: 150px" v-model="formData.family_num_n" type="number" clearable
                        placeholder="请输入" />
                </el-form-item>
                <el-form-item label="符合纳入社保人数：">
                    <el-input style="width: 150px" v-model="formData.num_of_people_eligible_social_security"
                        type="number" clearable placeholder="请输入" />
                </el-form-item>
                <el-form-item label="原有承包耕地面积（亩）：">
                    <el-input style="width: 150px" v-model="formData.cultivate_area_a" type="number" step="0.01"
                        clearable placeholder="请输入" />
                </el-form-item>
                <el-form-item label="共被征地（亩）：">
                    <el-input style="width: 150px" v-model="formData.land_area_requisitioned" type="number" clearable
                        placeholder="请输入" />
                </el-form-item>
                <el-form-item label="现有承包耕地（亩）：">
                    <el-input style="width: 150px" v-model="formData.cultivate_area_n" type="number" clearable
                        placeholder="请输入" />
                </el-form-item>
                <el-form-item label="户主姓名：">
                    <el-input style="width: 200px" v-model="formData.household_name" clearable placeholder="请输入" />
                </el-form-item>
                <el-form-item label="身份证号：">
                    <el-input style="width: 200px" v-model="formData.card_id" clearable placeholder="请输入" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button @click="onReset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-config-provider>
    </div>

    <div class="center">
        <router-view />
    </div>
</template>
<script setup>
import { reactive, computed, ref } from 'vue';
import zhCn from 'element-plus/dist/locale/zh-cn'
import axios from 'axios';
import { useRouter } from 'vue-router'; // 引入useRouter函数
const router = useRouter();

//设置中文
const language = computed(() => (zhCn))

const project = ref()


const formData = reactive({
    county_id: 360322,
    town_id: '',
    village_id: '',
    file_id: '',//户号
    project_id: '',//被征地项目名称编号
    land_acquisition_time: '',//被征地时间
    qualification_recognition_time: '',//资格认定时间
    approval_department: '',//批准部门
    family_num_a: '',//  被征地时家庭成员数
    family_num_n: '',//现家庭成员数
    num_of_people_eligible_social_security: '',//符合纳入社保人数
    cultivate_area_a: '',//原有承包耕地面积
    cultivate_area_n: '',//现有承包耕地面积
    land_area_requisitioned: '',//共被征地面积
    household_name: '',//户主姓名
    card_id: ''//身份证号
})

const onSubmit = () => {
    // console.log(formData);
    router.push({
        path: '/archive/query/table',
        query: {
            town_id: formData.town_id,
            village_id: formData.village_id,
            file_id: formData.file_id,
            project_id: formData.project_id,
            land_acquisition_time: formData.land_acquisition_time,
            qualification_recognition_time: formData.qualification_recognition_time,
            approval_department: formData.approval_department,
            family_num_a: formData.family_num_a,
            family_num_n: formData.family_num_n,
            num_of_people_eligible_social_security: formData.num_of_people_eligible_social_security,
            cultivate_area_a: formData.cultivate_area_a,
            cultivate_area_n: formData.cultivate_area_n,
            land_area_requisitioned: formData.land_area_requisitioned,
            household_name: formData.household_name,
            card_id: formData.card_id
        }
    })

}

const onReset = () => {
    if (!formData) return;
    formData.town_id = '';
    formData.village_id = '';
    formData.file_id = '';//户号
    formData.project_id = '';//被征地项目名称编号
    formData.land_acquisition_time = '';//被征地时间
    formData.qualification_recognition_time = '';//资格认定时间
    formData.approval_department = '';//批准部门
    formData.family_num_a = '';//  被征地时家庭成员数
    formData.family_num_n = '';//现家庭成员数
    formData.num_of_people_eligible_social_security = '';//符合纳入社保人数
    formData.cultivate_area_a = '';//原有承包耕地面积
    formData.cultivate_area_n = '';//现有承包耕地面积
    formData.land_area_requisitioned = '';//共被征地面积
    formData.household_name = '';//户主姓名
    formData.card_id = '';//身份证号
}
//县区代码
const counties = [
    {
        value: 360322,
        label: '上栗县'
    },
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
    height: auto;
    min-height: 100px;
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
    padding: 10px 20px;
}

.form-inline .el-select {
    --el-select-width: 200px;
}
</style>