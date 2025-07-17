<template>
    <div class="body">
        <div class="archive-details-container">
            <el-page-header :icon="null" @back="goBack">
                <template #content>
                    <div class="flex items-center">
                        <span class="text-large font-600 mr-3"> 户籍档案详情 </span>
                    </div>
                </template>
            </el-page-header>

            <el-card shadow="never" class="mt-4" v-loading="loading">
                <template #header>
                    <div class="card-header">
                        <span>基本信息</span>
                        <el-button type="primary" @click="showArchivePhotos">查看档案照片（{{ photos.length }}张）</el-button>
                    </div>
                </template>

                <el-descriptions :column="2" border>
                    <el-descriptions-item label="档案编号">{{ details.file_id || '-----' }}</el-descriptions-item>
                    <!-- <el-descriptions-item label="户号">{{ details.account_number || '-----' }}</el-descriptions-item> -->
                    <el-descriptions-item label="户主姓名">{{ details.household_name || '-----' }}</el-descriptions-item>
                    <el-descriptions-item label="身份证号">{{ details.card_id || '-----' }}</el-descriptions-item>
                    <el-descriptions-item label="手机号">{{ details.iphone_number || '-----' }}</el-descriptions-item>
                    <el-descriptions-item label="详细地址">{{ formatAddress(details) || '-----' }}</el-descriptions-item>
                </el-descriptions>

                <el-divider />

                <el-descriptions title="征地信息" :column="2" border>
                    <el-descriptions-item label="被征地项目">{{ details.project_id || '-' }}</el-descriptions-item>
                    <el-descriptions-item label="被征地时间">{{ details.land_acquisition_time || '-'
                        }}</el-descriptions-item>
                    <el-descriptions-item label="资格认定时间">{{ details.qualification_recognition_time || '-'
                        }}</el-descriptions-item>
                    <el-descriptions-item label="批准部门">{{ details.approval_department || '-' }}</el-descriptions-item>
                </el-descriptions>

                <el-divider />

                <el-descriptions title="家庭成员与土地信息" :column="2" border>
                    <el-descriptions-item label="被征地时家庭成员数">{{ details.family_num_a || '-' }}</el-descriptions-item>
                    <el-descriptions-item label="现家庭成员数">{{ details.family_num_n || '-' }}</el-descriptions-item>
                    <el-descriptions-item label="符合社保人数">{{ details.num_of_people_eligible_social_security || '-'
                        }}</el-descriptions-item>
                    <el-descriptions-item label="原有承包耕地面积">{{ details.cultivate_area_a ? `${details.cultivate_area_a}亩`
                        :
                        '-'
                        }}</el-descriptions-item>
                    <el-descriptions-item label="现有承包耕地面积">{{ details.cultivate_area_n ? `${details.cultivate_area_n}亩`
                        :
                        '-'
                        }}</el-descriptions-item>
                    <el-descriptions-item label="共被征地面积">{{ details.land_area_requisitioned ?
                        `${details.land_area_requisitioned}亩`
                        : '-' }}</el-descriptions-item>
                </el-descriptions>

                <el-divider />

                <!-- 家庭成员信息表格 -->
                <div class="family-members-section">
                    <div class="section-header">
                        <h3>家庭成员信息</h3>
                        <div class="member-count">
                            共 {{ familyMembers.length }} 名成员
                        </div>
                    </div>

                    <el-table :data="familyMembers" border style="width: 100%" class="mt-2">
                        <el-table-column prop="name" label="姓名" width="200"  />
                        <el-table-column prop="card_id" label="身份证号" width="250" />
                        <el-table-column prop="gender" label="性别" width="100">
                            <template #default="{ row }">
                                {{ row.gender === 'male' ? '男' : row.gender === 'female' ? '女' : '-' }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="is_householder" label="是否户主" width="100">
                            <template #default="{ row }">
                                <el-tag :type="row.is_householder ? 'success' : 'info'" size="small">
                                    {{ row.is_householder ? '是' : '否' }}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="phone" label="联系电话" width="200" />
                        <el-table-column prop="remark" label="备注" />
                    </el-table>
                </div>
            </el-card>

            <!-- 档案照片对话框 - 一次性显示所有照片 -->
            <el-dialog v-model="photoDialogVisible" title="户籍档案照片" width="90%" top="5vh" class="all-photos-dialog">
                <div class="photos-container" v-if="photos.length > 0">
                    <div class="photo-grid">
                        <div class="photo-item" v-for="(photo, index) in photos" :key="index">
                            <div class="photo-wrapper">
                                <img :src="photo.url" :alt="`档案照片 ${index + 1}`" class="archive-photo"
                                    @click="openPhotoViewer(index)" />
                                <div class="photo-meta">
                                    <span>照片 {{ index + 1 }}</span>
                                    <el-button type="primary" link :icon="Download"
                                        @click="downloadPhoto(photo.url, photo.name)" size="small" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <el-empty description="暂无档案照片" v-else />
            </el-dialog>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Download } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const loading = ref(true)
const details = ref({})
const photoDialogVisible = ref(false)
const photoUrl = ref('')
const familyMembers = ref([])
const photos = ref([
    {
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    },
    {
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    }
])

// 获取档案详情和家庭成员
const fetchArchiveDetails = async () => {
    try {
        loading.value = true
        const [detailRes, membersRes] = await Promise.all([
            getArchiveDetails(id),
            getFamilyMembers(id)
        ])
        details.value = detailRes.data
        familyMembers.value = membersRes.data
    } catch (error) {
        ElMessage.error('获取档案信息失败')
        console.error(error)
    } finally {
        loading.value = false
    }
}

// 格式化地址显示
const formatAddress = (data) => {
    if (!data) return ''

    const addressParts = []
    if (data.county_id) addressParts.push(data.county_id)
    if (data.town_id) addressParts.push(data.town_id)
    if (data.village_id) addressParts.push(data.village_id)
    if (data.detailed_address) addressParts.push(data.detailed_address)

    return addressParts.join(' ')
}

// 显示所有档案照片
const showArchivePhotos = () => {
      if (photos.value.length === 0) {
        ElMessage.warning('该档案暂无照片')
        return
      }
    photoDialogVisible.value = true
}
// 打开单张照片查看器
const openPhotoViewer = (index) => {
    currentPhotoIndex.value = index
    singlePhotoVisible.value = true
}
// 下载照片
const downloadPhoto = (url, name) => {
    const link = document.createElement('a')
    link.href = url
    link.download = name || `档案照片_${details.value.file_id}_${new Date().getTime()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

// 返回上一页
const goBack = () => {
    router.go(-1)
}

onMounted(() => {
    fetchArchiveDetails()
})
</script>

<style scoped>
.body {
    height: auto;
    min-height: 100%;
    width: auto;
    background-color: white;
    border-radius: 10px;
}

.archive-details-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.family-members-section {
    margin-top: 30px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.member-count {
    color: #666;
    font-size: 14px;
}

.photo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
}

.archive-photo {
    max-width: 100%;
    max-height: 70vh;
    object-fit: contain;
}

:deep(.el-descriptions__title) {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
}

:deep(.el-descriptions__body) {
    background-color: #fff;
}

:deep(.el-descriptions-item__label) {
    width: 150px;
    font-weight: bold;
}

/* 照片网格布局 */
.photos-container {
    max-height: 70vh;
    overflow-y: auto;
    padding: 10px;
}

.photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.photo-item {
    position: relative;
    border: 1px solid #eee;
    border-radius: 4px;
    overflow: hidden;
    transition: all 0.3s;
}

.photo-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.photo-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.archive-photo {
    width: 100%;
    height: 200px;
    object-fit: contain;
    cursor: pointer;
    background-color: #f5f5f5;
}

.photo-meta {
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f9f9f9;
}

/* 单张照片查看器样式 */
.single-photo-container {
    position: relative;
    height: 70vh;
}

.single-photo {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: 0 auto;
}

.photo-nav {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
    padding: 0 20px;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .photo-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }

    .archive-photo {
        height: 150px;
    }
}
</style>