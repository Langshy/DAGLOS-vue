<template>
  <!-- 导航条 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>档案总览</el-breadcrumb-item>
  </el-breadcrumb>
  <el-table v-loading="loading" :data="tableData" border style="width: 100%;margin-top: 20px;">
    <el-table-column label="序号" width="100" align="center">
      <template #default="scope">
        <div style="align-items: center">
          <span>{{ scope.row.serialNumber }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="姓名" width="150" align="center">
      <template #default="scope">
        <div style="align-items: center">
          <span>{{ scope.row.name }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="性别" width="150" align="center">
      <template #default="scope">
        <div style="align-items: center">
          <span>{{ scope.row.sex }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="身份证号" width="250" align="center">
      <template #default="scope">
        <div style="align-items: center">
          <span>{{ scope.row.IDnumber }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="户籍" width="150" align="center">
      <template #default="scope">
        <div style="align-items: center">
          <span>{{ scope.row.domicile }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="乡镇" width="150" align="center">
      <template #default="scope">
        <div style="align-items: center">
          <span>{{ scope.row.town }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="村" width="150" align="center">
      <template #default="scope">
        <div style="align-items: center">
          <span>{{ scope.row.village }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="详细地址" width="400" align="center">
      <template #default="scope">
        <div style="align-items: center">
          <span>{{ scope.row.detailedAddress }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="选项" fixed="right" width="150" align="center">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-config-provider :locale="language">
      <el-pagination v-model:current-page="pages" v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
        :size="size" :disabled="false" :background="true" layout="total, sizes, prev, pager, next, jumper"
        :total="total" :hide-on-single-page="true" />
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn'

//设置中文
const language = computed(() => (zhCn))

const pages = ref(1)
const pageSize = ref(10)
const size = 40
const total = 100

const loading = ref(false)  // 加载状态

interface User {
  serialNumber: number
  name: string
  sex: string
  IDnumber: string
  domicile: string
  town: string
  village: string
  detailedAddress: string
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const tableData: User[] = [
  {
    serialNumber: 1,
    name: 'Mona',
    sex: '女',
    IDnumber: '123456789012345678',
    domicile: '广东省',
    town: '广州市',
    village: '白云区',
    detailedAddress: '白云区白云大道123号'
  },
  {
    serialNumber: 2,
    name: 'Mona',
    sex: '女',
    IDnumber: '123456789012345678',
    domicile: '广东省',
    town: '广州市',
    village: '白云区',
    detailedAddress: '白云区白云大道123号'
  },
  {
    serialNumber: 3,
    name: 'Mona',
    sex: '女',
    IDnumber: '123456789012345678',
    domicile: '广东省',
    town: '广州市',
    village: '白云区',
    detailedAddress: '白云区白云大道123号'
  },
  {
    serialNumber: 4,
    name: 'Mona',
    sex: '女',
    IDnumber: '123456789012345678',
    domicile: '广东省',
    town: '广州市',
    village: '白云区',
    detailedAddress: '白云区白云大道123号'
  },
  {
    serialNumber: 5,
    name: 'Mona',
    sex: '女',
    IDnumber: '123456789012345678',
    domicile: '广东省',
    town: '广州市',
    village: '白云区',
    detailedAddress: '白云区白云大道123号'
  },
  {
    serialNumber: 6,
    name: 'Mona',
    sex: '女',
    IDnumber: '123456789012345678',
    domicile: '广东省',
    town: '广州市',
    village: '白云区',
    detailedAddress: '白云区白云大道123号'
  },
  {
    serialNumber: 7,
    name: 'Mona',
    sex: '女',
    IDnumber: '123456789012345678',
    domicile: '广东省',
    town: '广州市',
    village: '白云区',
    detailedAddress: '白云区白云大道123号'
  },
  {
    serialNumber: 8,
    name: 'Mona',
    sex: '女',
    IDnumber: '123456789012345678',
    domicile: '广东省',
    town: '广州市',
    village: '白云区',
    detailedAddress: '白云区白云大道123号'
  },
  {
    serialNumber: 9,
    name: 'Mona',
    sex: '女',
    IDnumber: '123456789012345678',
    domicile: '广东省',
    town: '广州市',
    village: '白云区',
    detailedAddress: '白云区白云大道123号'
  },
  {
    serialNumber: 10,
    name: 'Mona',
    sex: '女',
    IDnumber: '123456789012345678',
    domicile: '广东省',
    town: '广州市',
    village: '白云区',
    detailedAddress: '白云区白云大道123号'
  },

]
</script>
<style scoped>
.pagination {
  width: 100%;
  height: 50px;
  margin-top: 40px;
}
</style>