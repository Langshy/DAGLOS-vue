<template>
    <div class="body">
        <el-row class="row-bg" :gutter="24">
            <el-col :span="22" :offset="1">
                <p>添加档案</p>
            </el-col>
            <el-col :span="20" :offset="2">
                <el-steps style="max-width: 100%" :active="active" finish-status="success">
                    <el-step title="填写基本信息" />
                    <el-step title="添加家庭成员信息" />
                    <el-step title="上传凭证" />
                </el-steps>
            </el-col>
            <el-divider />
            <!-- 步骤一：填写户籍档案基本信息 -->
            <el-col :span="22" :offset="1" v-show="page1">
                <p>档案基本信息</p>
                <el-config-provider :locale="language">
                    <el-form :model="formData" :inline="true" class="form-inline">
                        <el-form-item label="县区：">
                            <el-select v-model="formData.county_id" disabled placeholder="请选择县区">
                                <el-option v-for="item in counties" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="乡镇：">
                            <el-select v-model="formData.town_id" placeholder="请选择乡镇" @change="getVillage">
                                <el-option v-for="item in townOptions" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="村：">
                            <el-select v-model="formData.village_id" placeholder="请选择村">
                                <el-option v-for="item in villageOptions" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="详细地址：">
                            <el-input style="width: 800px" v-model="formData.detailed_address" clearable
                                placeholder="请输入" />
                        </el-form-item>
                        <el-form-item label="档案编号：">
                            <el-input style="width: 200px" v-model="formData.file_id" clearable placeholder="请输入" />
                        </el-form-item>
                        <el-form-item label="被征地项目名称：">
                            <el-select v-model="formData.project_id" placeholder="请选择项目">
                                <el-option v-for="item in project" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="被征地时间：">
                            <el-date-picker v-model="formData.land_acquisition_time" type="date" placeholder="请选择日期"
                                style="width: 200px" />
                        </el-form-item>
                        <el-form-item label="资格认定时间：">
                            <el-date-picker v-model="formData.qualification_recognition_time" type="date"
                                placeholder="请选择日期" style="width: 200px" />
                        </el-form-item>
                        <el-form-item label="批准部门：">
                            <el-input style="width: 200px" v-model="formData.approval_department" clearable
                                placeholder="请输入" />
                        </el-form-item>
                        <el-form-item label="被征地时家庭成员数：">
                            <el-input style="width: 200px" v-model="formData.family_num_a" type="number" clearable
                                placeholder="请输入" />
                        </el-form-item>
                        <el-form-item label="现家庭成员数：">
                            <el-input style="width: 200px" v-model="formData.family_num_n" type="number" clearable
                                placeholder="请输入" />
                        </el-form-item>
                        <el-form-item label="符合纳入社保人数：">
                            <el-input style="width: 200px" v-model="formData.num_of_people_eligible_social_security"
                                type="number" clearable placeholder="请输入" />
                        </el-form-item>
                        <el-form-item label="原有承包耕地面积（亩）：">
                            <el-input style="width: 200px" v-model="formData.cultivate_area_a" type="number" step="0.01"
                                clearable placeholder="请输入" />
                        </el-form-item>
                        <el-form-item label="共被征地（亩）：">
                            <el-input style="width: 200px" v-model="formData.land_area_requisitioned" type="number"
                                clearable placeholder="请输入" />
                        </el-form-item>
                        <el-form-item label="现有承包耕地（亩）：">
                            <el-input style="width: 200px" v-model="formData.cultivate_area_n" type="number" clearable
                                placeholder="请输入" />
                        </el-form-item>
                        <el-form-item label="户主姓名：">
                            <el-input style="width: 200px" v-model="formData.household_name" clearable
                                placeholder="请输入" />
                        </el-form-item>
                        <el-form-item label="户主身份证号：">
                            <el-input style="width: 200px" v-model="formData.card_id" clearable placeholder="请输入" />
                        </el-form-item>
                        <el-form-item label="手机号：">
                            <el-input style="width: 200px" v-model="formData.iphone_number" clearable
                                placeholder="请输入" />
                        </el-form-item>
                        <br>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmitPage1">下一步</el-button>
                            <el-button>重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-config-provider>
            </el-col>
            <!-- 步骤二：添加家庭成员信息 -->
            <el-col :span="22" :offset="1" v-show="page2">
                <p>家庭成员信息</p>
                <el-form :model="familyForms" label-width="auto" class="form-inline">
                    <!-- 数量输入 -->
                    <el-form-item label="家庭成员数量：">
                        <el-input min="0" v-model.number="formCount" @change="updateForms" style="width: 100px;" />
                    </el-form-item>
                    <!-- 动态表单区域 -->
                    <div v-for="(form, index) in familyForms" :key="index" class="form-item">
                        <span>成员 {{ index + 1 }}</span>
                        <el-form-item label="姓名：">
                            <el-input v-model="form.name" placeholder="请输入姓名" />
                        </el-form-item>
                        <el-form-item label="身份证号：">
                            <el-input v-model="form.c_id" placeholder="请输入身份证号" />
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitPage2">下一步</el-button>
                    </el-form-item>
                </el-form>
            </el-col>

            <!-- 步骤三：上传档案图片 -->
            <el-col :span="22" :offset="1" v-show="page3">
                <p>上传档案图片</p>
                <el-upload :action="uploadUrl" list-type="picture-card" :on-preview="handlePreview"
                    :on-remove="handleRemove" :on-success="handleSuccess" :before-upload="beforeUpload"
                    :file-list="fileList" :limit="maxCount" :on-exceed="handleExceed" :multiple="true" with-credentials>
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <!-- 图片预览弹窗 -->
                <el-dialog v-model="previewVisible" width="70%">
                    <img :src="previewUrl" alt="预览图" style="width: 100%" />
                </el-dialog>

                <!-- 已上传图片展示 -->
                <div v-if="uploadedImages.length" class="image-grid">
                    <div v-for="(img, index) in uploadedImages" :key="index" class="image-item">
                        <el-image :src="img.url" :preview-src-list="previewList" fit="cover" class="thumb"
                            hide-on-click-modal />
                        <div class="image-overlay">
                            <el-icon class="delete-icon" @click="deleteImage(index)">
                                <Delete />
                            </el-icon>
                        </div>
                    </div>
                </div>
                <div><el-button type="primary" @click="onSubmitPage3">提交</el-button></div>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import { reactive, computed, ref } from 'vue';
import zhCn from 'element-plus/dist/locale/zh-cn'
import axios from 'axios';
import { useRouter } from 'vue-router'; // 引入useRouter函数
const router = useRouter();
//图片上传
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'

import { ElNotification } from 'element-plus'

//设置中文
const language = computed(() => (zhCn))


//征地项目
const project = [
    {
        value: 10010,
        label: '项目一'
    },
]
const getArhcivesProject = () => {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/action/comm/getAllVillage.${import.meta.env.VITE_API_BASE_URL_TYPE}`;
    axios.get(apiUrl).then(res => {
        project.value = res.data.data
    })
}

const formData = reactive({
    county_id: 360322,
    town_id: '',
    village_id: '',
    detailed_address: '',//详细地址
    file_id: '',//档案标号
    account_number:'',//户号
    project_id: '',//被征地项目名称编号
    land_acquisition_time: '',//被征地时间
    qualification_recognition_time: '',//资格认定时间
    approval_department: '',//批准部门
    family_num_a: 2,//  被征地时家庭成员数
    family_num_n: '',//现家庭成员数
    num_of_people_eligible_social_security: '',//符合纳入社保人数
    cultivate_area_a: '',//原有承包耕地面积
    cultivate_area_n: '',//现有承包耕地面积
    land_area_requisitioned: '',//共被征地面积
    household_name: '',//户主姓名
    card_id: '',//身份证号，
    iphone_number: ''//手机号
})
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

const onSubmitPage1 = () => {
    console.log(formData)
    formData.account_number = '1001'
    page1.value = false
    page2.value = true
    next()
    console.log(fileList)
}

//步骤条
const active = ref(0)
const next = () => {
    if (active.value++ > 2) active.value = 0
}

const page1 = ref(true)
const page2 = ref(false)
const page3 = ref(false)

//添加成员
import { watch } from 'vue'

// 控制表单数量
const formCount = ref(0)
// 存储表单数据的数组
const familyForms = ref([])

// 当数量变化时更新表单数组
const updateForms = () => {
    // 当数量增加时添加新表单
    while (familyForms.value.length < formCount.value) {
        familyForms.value.push({ name: '', c_id: '' })
    }
    // 当数量减少时移除多余表单
    while (familyForms.value.length > formCount.value) {
        familyForms.value.pop()
    }
}

// 监听数量变化自动更新
watch(formCount, updateForms)

// 提交处理
const onSubmitPage2 = () => {
    console.log('提交的表单数据：', familyForms.value)
    next()
    page2.value = false
    page3.value = true
    // 实际项目中这里可以添加AJAX提交逻辑
}

//图片上传
const uploadUrl = ref(`${import.meta.env.VITE_API_BASE_URL}/action/archive/upload.${import.meta.env.VITE_API_BASE_URL_TYPE}`)
// 最大上传数量
const maxCount = ref(20)
// 已上传文件列表
const fileList = ref([])
// 已上传图片数组
const uploadedImages = ref([
    { id: 1, url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, // 初始示例数据
    // 实际应从后台获取
])

// 预览功能相关状态
const previewVisible = ref(false)
const previewUrl = ref('')
const previewList = computed(() =>
    uploadedImages.value.map(img => img.url)
)

// 处理文件预览
const handlePreview = (file) => {
    previewUrl.value = file.url || URL.createObjectURL(file.raw)
    previewVisible.value = true
}

// 删除上传的文件
const handleRemove = (file) => {
    const index = fileList.value.findIndex(f => f.uid === file.uid)
    if (index !== -1) {
        fileList.value.splice(index, 1)
    }
}

// 上传成功处理
const handleSuccess = (response, file) => {
    // ✅ 实际项目替换为后端返回的图片URL
    const imageUrl = URL.createObjectURL(file.raw)
    uploadedImages.value.push({
        id: Date.now(), // 生成唯一ID
        url: imageUrl,
        name: file.name
    })
    ElMessage.success('图片上传成功')
}

// 自定义删除操作
const deleteImage = (index) => {
    ElMessageBox.confirm('确定删除这张图片吗？', '警告', {
        type: 'warning',
        confirmButtonText: '删除',
        cancelButtonText: '取消'
    }).then(() => {
        uploadedImages.value.splice(index, 1)
        ElMessage.success('图片已删除')
    })
}

// 文件上传前的校验
const beforeUpload = (file) => {
    const isImage = /^image\/(jpeg|png|jpg|gif|webp)$/.test(file.type)
    const isLt10M = file.size / 1024 / 1024 < 10

    if (!isImage) {
        ElMessage.error('只能上传图片格式!')
        return false
    }
    if (!isLt10M) {
        ElMessage.error('图片大小不能超过5MB!')
        return false
    }
    return true
}

// 处理数量超出限制
const handleExceed = () => {
    ElMessage.warning(`最多只能上传 ${maxCount.value} 张图片`)
}
const onSubmitPage3 = () => {
    next()
    submitSucess()
      router.push({
        name: 'Details',
        params: {
            id: formData.account_number,
        }
    })
}

//返回参数
const submitSucess = () => {
    ElNotification({
        title: 'Success',
        message: '提交成功！',
        type: 'success',
    })
}

const submitWarning = () => {
    ElNotification({
        title: 'Warning',
        message: '提交失败，请联系管理员！',
        type: 'warning',
    })
}

</script>
<style scoped>
.body {
    height: auto;
    min-height: 100%;
    width: auto;
    background-color: white;
    border-radius: 10px;
}

.el-row {
    margin-bottom: 20px;
}

.form-inline {
    --el-input-width: 20px;
    padding: 10px 20px;
}

.form-inline .el-select {
    --el-select-width: 200px;
}

.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    margin-top: 20px;
}

.image-item {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    height: 180px;
}

.thumb {
    display: block;
    width: 100%;
    height: 100%;
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-item:hover .image-overlay {
    opacity: 1;
}

.delete-icon {
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    transition: transform 0.3s, color 0.3s;
}

.delete-icon:hover {
    color: #ff4d4f;
    transform: scale(1.2);
}
</style>