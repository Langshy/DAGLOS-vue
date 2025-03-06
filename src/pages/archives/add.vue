<!-- 添加档案 -->
<script setup>
import { computed, reactive } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn'
import router from "../../router.js";

//路由跳转
const routerChange = (n) => {
    router.push(n);
}

//设置中文
const language = computed(() => (zhCn))

// do not use same name with ref
const form = reactive({
    //户主姓名
    name: '',
    //乡镇
    town: '',
    //村    
    village: '',
    //被征地所在地址
    address_of_requisitioned_land: '',
    // 原有承包（亩）
    original_contracted_farmland: '',
    //共被征耕地（亩）
    total_requisitioned_cultivated_land: '',
    //现有承包耕地（亩）
    current_contracted_cultivated_land: '',
    //家庆户籍人口总数  
    total_registered_residence_population: '',
    //现户人均耕地（亩）
    per_capita_cultivated_land: '',
    //批准征地部门
    approved_land_requisition_department: '',
    // 批准征地时间
    approval_time_for_land_acquisition: '',
    //联系电话
    contact_number: '',
    //被征地项目名称
    name_of_land_acquisition_project: '',
})

const handleChange = (value) => {
    console.log(value)
    form.town = value[0]
    form.village = value[1]
}

const onSubmit = () => {
    console.log('submit!')
    console.log(form)
    const id = 'mx12345'
    const url = 'details/' + id
    routerChange(url);
}

const cancel = () => {
    console.log('cancel!')
    router.go(0)
}
</script>
<template>
    <!-- 导航条 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/Archive/index' }">档案总览</el-breadcrumb-item>
        <el-breadcrumb-item>添加档案</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="add-form">
        <el-form :model="form" label-width="120px" :locale="language">
            <el-form-item label="户主姓名">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="乡镇及村">
                <el-cascader v-model="form.village" :options="townOptions" @change="handleChange" />
            </el-form-item>
            <el-form-item label="详细地址">
                <el-input v-model="form.address_of_requisitioned_land" />
            </el-form-item>
            <el-form-item label="原有承包（亩）">
                <el-input v-model="form.original_contracted_farmland" />
            </el-form-item>
            <el-form-item label="共被征耕地（亩）">
                <el-input v-model="form.total_requisitioned_cultivated_land" />
            </el-form-item>
            <el-form-item label="现有承包耕地（亩）">
                <el-input v-model="form.current_contracted_cultivated_land" />
            </el-form-item>
            <el-form-item label="家庆户籍人口总数">
                <el-input v-model="form.total_registered_residence_population" />
            </el-form-item>
            <el-form-item label="现户人均耕地（亩）">
                <el-input v-model="form.per_capita_cultivated_land" />
            </el-form-item>
            <el-form-item label="批准征地部门">
                <el-input v-model="form.approved_land_requisition_department" />
            </el-form-item>
            <el-form-item label="批准征地时间">
                <el-date-picker v-model="form.approval_time_for_land_acquisition" type="date" placeholder="选择日期"
                    format="YYYY-MM-DD" value-format="x" />
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="form.contact_number" />
            </el-form-item>
            <el-form-item label="被征地项目名称">
                <el-input v-model="form.name_of_land_acquisition_project" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">添加</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.add-form {
    width: 50%;
    margin: 0 auto;
    padding-top: 50px;
}

.text-center {
    text-align: center;
}
</style>
<script>
const townOptions = [
    {
        value: 101,
        label: '上栗镇',
        children: [
            {
                value: 10101,
                label: '滨河居委会  ',
            },
            {
                value: 10102,
                label: '南北居委会',
            },
            {
                value: 10103,
                label: '平安居委会',
            },
            {
                value: 10104,
                label: '西顺居委会',
            },
            {
                value: 10105,
                label: '榉溪村委会',
            },
            {
                value: 10106,
                label: '斑竹村委会',
            },
            {
                value: 10107,
                label: '菜场村委会',
            },
            {
                value: 10108,
                label: '佛岭村委会',
            },
            {
                value: 10109,
                label: '龙合村委会',
            },
            {
                value: 10110,
                label: '泉塘村委会',
            },
            {
                value: 10111,
                label: '胜利村委会',
            },
            {
                value: 10112,
                label: '石洋村委会',
            },
            {
                value: 10113,
                label: '水源村委会',
            },
            {
                value: 10114,
                label: '四海村委会',
            },
            {
                value: 10115,
                label: '踏塘村委会',
            },
            {
                value: 10116,
                label: '万石村委会',
            },
            {
                value: 10117,
                label: '新建村委会',
            },
            {
                value: 10118,
                label: '新民村委会',
            },
            {
                value: 10119,
                label: '新群村委会',
            },
            {
                value: 10120,
                label: '永红村委会',
            },
            {
                value: 10121,
                label: '夭埠村委会',
            },
            {
                value: 10122,
                label: '渌塘村委会',
            },
        ]
    },
    {
        value: 102,
        label: '金山镇',
        children: [
            {
                value: 10201,
                label: '白鹤村委会  ',
            },
            {
                value: 10202,
                label: '桥塘村委会',
            },
            {
                value: 10203,
                label: '丰龙村委会',
            },
            {
                value: 10204,
                label: '凤鸣村委会',
            },
            {
                value: 10205,
                label: '凤亭村委会',
            },
            {
                value: 10206,
                label: '高山村委会',
            },
            {
                value: 10207,
                label: '横水村委会',
            },
            {
                value: 10208,
                label: '简村村委会',
            },
            {
                value: 10209,
                label: '金山村委会',
            },
            {
                value: 10210,
                label: '黎塘村委会',
            },
            {
                value: 10211,
                label: '龙泉村委会',
            },
            {
                value: 10212,
                label: '南华村委会',
            },
            {
                value: 10213,
                label: '普化村委会',
            },
            {
                value: 10214,
                label: '山口村委会',
            },
            {
                value: 10215,
                label: '山明村委会',
            },
            {
                value: 10216,
                label: '山田村委会',
            },
            {
                value: 10217,
                label: '石涧村委会',
            },
            {
                value: 10218,
                label: '小水村委会',
            },
            {
                value: 10219,
                label: '新杨村委会',
            },
            {
                value: 10220,
                label: '樟坊村委会',
            },
            {
                value: 10221,
                label: '中合村委会',
            },
        ]
    },
    {
        value: 103,
        label: '桐木镇',
        children: [
            {
                value: 10301,
                label: '桐木居委会  ',
            },
            {
                value: 10302,
                label: '城冲村委会',
            },
            {
                value: 10303,
                label: '崇德村委会',
            },
            {
                value: 10304,
                label: '楚山村委会',
            },
            {
                value: 10305,
                label: '丹桂村委会',
            },
            {
                value: 10306,
                label: '洪东村委会',
            },
            {
                value: 10307,
                label: '湖塘村委会',
            },
            {
                value: 10308,
                label: '黄图村委会',
            },
            {
                value: 10309,
                label: '蕉源村委会',
            },
            {
                value: 10310,
                label: '荆坪村委会',
            },
            {
                value: 10311,
                label: '莲台村委会',
            },
            {
                value: 10312,
                label: '桐木村委会',
            },
            {
                value: 10313,
                label: '小埠村委会',
            },
            {
                value: 10314,
                label: '雅溪村委会',
            },
            {
                value: 10315,
                label: '杨坊村委会',
            },
            {
                value: 10316,
                label: '枣木村委会',
            },
            {
                value: 10317,
                label: '周田村委会',
            },
            {
                value: 10318,
                label: '枧冲村委会',
            },
        ]
    },
    {
        value: 104,
        label: '赤山镇',
        children: [
            {
                value: 10401,
                label: '赤山村委会',
            },
            {
                value: 10402,
                label: '大院村委会',
            },
            {
                value: 10403,
                label: '枫桥村委会',
            },
            {
                value: 10404,
                label: '高兰村委会',
            },
            {
                value: 10405,
                label: '耿塘村委会',
            },
            {
                value: 10406,
                label: '观泉村委会',
            },
            {
                value: 10407,
                label: '黄花村委会',
            },
            {
                value: 10408,
                label: '黄田村委会',
            },
            {
                value: 10409,
                label: '兰田村委会',
            },
            {
                value: 10410,
                label: '楼泉村委会',
            },
            {
                value: 10411,
                label: '楼下村委会',
            },
            {
                value: 10412,
                label: '麻田村委会',
            },
            {
                value: 10413,
                label: '幕冲村委会',
            },
            {
                value: 10414,
                label: '泉陂村委会',
            },
            {
                value: 10415,
                label: '湾里村委会',
            },
            {
                value: 10416,
                label: '新店村委会',
            },
            {
                value: 10417,
                label: '院背村委会',
            },
        ]
    },
    {
        value: 105,
        label: '东源乡',
        children: [
            {
                value: 10501,
                label: '东源村委会',
            },
            {
                value: 10502,
                label: '逢源村委会',
            },
            {
                value: 10503,
                label: '宫江村委会',
            },
            {
                value: 10504,
                label: '江岭村委会',
            },
            {
                value: 10504,
                label: '镜山村委会',
            },
            {
                value: 10505,
                label: '楼下村委会',
            },
            {
                value: 10506,
                label: '民主村委会',
            },
            {
                value: 10507,
                label: '桥头村委会',
            },
            {
                value: 10508,
                label: '上埠村委会',
            },
            {
                value: 10509,
                label: '桃源村委会',
            },
            {
                value: 10510,
                label: '田心村委会',
            },
            {
                value: 10511,
                label: '小枧村委会',
            },
            {
                value: 10512,
                label: '新益村委会',
            },
            {
                value: 10513,
                label: '羊子村委会',
            },
            {
                value: 10514,
                label: '竺塘村委会',
            },
        ]
    },
    {
        value: 106,
        label: '长平乡',
        children: [
            {
                value: 10601,
                label: '长平村委会  ',
            },
            {
                value: 10602,
                label: '太塘村委会',
            },
            {
                value: 10603,
                label: '淡塘村委会',
            },
            {
                value: 10604,
                label: '佛溪村委会',
            },
            {
                value: 10605,
                label: '福寿村委会',
            },
            {
                value: 10606,
                label: '黄泥塘村委会',
            },
            {
                value: 10607,
                label: '蕉源村委会',
            },
            {
                value: 10608,
                label: '菱角村委会',
            },
            {
                value: 10609,
                label: '流江村委会',
            },
            {
                value: 10610,
                label: '落星村委会',
            },
            {
                value: 10611,
                label: '马良村委会',
            },
            {
                value: 10612,
                label: '明星村委会',
            },
            {
                value: 10613,
                label: '平吉村委会',
            },
            {
                value: 10614,
                label: '杉木村委会',
            },
            {
                value: 10615,
                label: '狮形村委会',
            },
            {
                value: 10616,
                label: '石塘村委会',
            },
            {
                value: 10617,
                label: '石溪村委会',
            },
            {
                value: 10618,
                label: '塘上村委会',
            },
            {
                value: 10619,
                label: '星辉村委会',
            },
        ]
    },
    {
        value: 107,
        label: '杨岐乡',
        children: [
            {
                value: 10701,
                label: '安子全社区  ',
            },
            {
                value: 10702,
                label: '保护村委会',
            },
            {
                value: 10703,
                label: '大坪村委会',
            },
            {
                value: 10704,
                label: '关上村委会',
            },
            {
                value: 10705,
                label: '关下村委会',
            },
            {
                value: 10706,
                label: '黄冲村委会',
            },
            {
                value: 10707,
                label: '金鸡村委会',
            },
            {
                value: 10708,
                label: '卯田村委会',
            },
            {
                value: 10709,
                label: '南源村委会',
            },
            {
                value: 10710,
                label: '清溪村委会',
            },
            {
                value: 10711,
                label: '石岭村委会',
            },
            {
                value: 10712,
                label: '石源村委会',
            },
            {
                value: 10713,
                label: '水井村委会',
            },
            {
                value: 10714,
                label: '桃文村委会',
            },
            {
                value: 10715,
                label: '新坝村委会',
            },
            {
                value: 10716,
                label: '杨岐村委会',
            },
        ]
    },
    {
        value: 108,
        label: '鸡冠山乡',
        children: [
            {
                value: 10801,
                label: '豆田村委会  ',
            },
            {
                value: 10802,
                label: '高田村委会',
            },
            {
                value: 10803,
                label: '横下村委会',
            },
            {
                value: 10804,
                label: '恢柳村委会',
            },
            {
                value: 10805,
                label: '鸡冠村委会',
            },
            {
                value: 10806,
                label: '流源村委会',
            },
            {
                value: 10807,
                label: '芦下村委会',
            },
            {
                value: 10808,
                label: '庙背村委会',
            },
            {
                value: 10809,
                label: '三垅村委会',
            },
            {
                value: 10810,
                label: '石上村委会',
            },
            {
                value: 10811,
                label: '砖岭村委会',
            },
            {
                value: 10812,
                label: '圳上村委会',
            },
            {
                value: 10813,
                label: '驿马村委会',
            },
        ]
    }

]
</script>