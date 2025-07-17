<template>
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

      <!-- 原有信息展示部分保持不变... -->

      <!-- 家庭成员信息表格保持不变... -->
    </el-card>

    <!-- 档案照片对话框 - 一次性显示所有照片 -->
    <el-dialog 
      v-model="photoDialogVisible" 
      title="户籍档案照片" 
      width="90%" 
      top="5vh"
      class="all-photos-dialog"
    >
      <div class="photos-container" v-if="photos.length > 0">
        <div class="photo-grid">
          <div class="photo-item" v-for="(photo, index) in photos" :key="index">
            <div class="photo-wrapper">
              <img 
                :src="photo.url" 
                :alt="`档案照片 ${index + 1}`" 
                class="archive-photo" 
                @click="openPhotoViewer(index)"
              />
              <div class="photo-meta">
                <span>照片 {{ index + 1 }}</span>
                <el-button 
                  type="primary" 
                  link 
                  :icon="Download" 
                  @click="downloadPhoto(photo.url, photo.name)"
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-empty description="暂无档案照片" v-else />
    </el-dialog>

    <!-- 单张照片查看器 -->
    <el-dialog 
      v-model="singlePhotoVisible" 
      :title="`档案照片 ${currentPhotoIndex + 1}/${photos.length}`" 
      width="80%"
      top="5vh"
      append-to-body
    >
      <div class="single-photo-container">
        <img 
          :src="photos[currentPhotoIndex]?.url" 
          :alt="`档案照片 ${currentPhotoIndex + 1}`" 
          class="single-photo"
        />
        <div class="photo-nav">
          <el-button 
            :icon="ArrowLeft" 
            @click="prevPhoto" 
            :disabled="currentPhotoIndex === 0"
            circle
          />
          <el-button 
            :icon="ArrowRight" 
            @click="nextPhoto"
            :disabled="currentPhotoIndex === photos.length - 1"
            circle
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Download, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { 
  getArchiveDetails, 
  getArchivePhotos,
  getFamilyMembers
} from '@/api/archive'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const loading = ref(true)
const details = ref({})
const photoDialogVisible = ref(false)
const singlePhotoVisible = ref(false)
const photos = ref([])
const currentPhotoIndex = ref(0)
const familyMembers = ref([])

// 获取档案详情和照片
const fetchArchiveDetails = async () => {
  try {
    loading.value = true
    const [detailRes, membersRes, photosRes] = await Promise.all([
      getArchiveDetails(id),
      getFamilyMembers(id),
      getArchivePhotos(id)
    ])
    details.value = detailRes.data
    familyMembers.value = membersRes.data
    photos.value = photosRes.data
  } catch (error) {
    ElMessage.error('获取档案信息失败')
    console.error(error)
  } finally {
    loading.value = false
  }
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

// 上一张照片
const prevPhoto = () => {
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--
  }
}

// 下一张照片
const nextPhoto = () => {
  if (currentPhotoIndex.value < photos.value.length - 1) {
    currentPhotoIndex.value++
  }
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