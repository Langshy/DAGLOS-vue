<template>
  <div class="center">
    <el-table v-loading="loading" :data="tableData" border style="width: 100%;margin-top: 20px;">
      <el-table-column label="序号" width="100" align="center">
        <template #default="scope">
          <div style="align-items: center">
            <span>{{ scope.row.serial_number }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="户籍编号" width="100" align="center">
        <template #default="scope">
          <div style="align-items: center">
            <span>{{ scope.row.id }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="户主姓名" width="150" align="center">
        <template #default="scope">
          <div style="align-items: center">
            <span>{{ scope.row.household_name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="档案编号" width="150" align="center">
        <template #default="scope">
          <div style="align-items: center">
            <span>{{ scope.row.registered_residence_number }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="家庭户籍人口总数" width="200" align="center">
        <template #default="scope">
          <div style="align-items: center">
            <span>{{ scope.row.total_registered_residence_population }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" width="150" align="center">
        <template #default="scope">
          <div style="align-items: center">
            <span>{{ scope.row.contact_number }}</span>
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
      <el-table-column label="选项" fixed="right" width="200" align="center">
        <template #default="scope">
          <el-button size="small" @click="handleView(scope.$index, scope.row)">查看</el-button>
          <el-button size="small" @click="handleChane(scope.$index, scope.row)">更改</el-button>
          <el-button size="small" @click="handleExport(scope.$index, scope.row)">导出</el-button>
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
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn'
import { useRouter } from 'vue-router'; // 引入useRouter函数

const route = useRouter();
const query = route.query;
console.log(query)


//设置中文
const language = computed(() => (zhCn))


const pages = ref(1)
const pageSize = ref(10)
const size = 40
const total = ref(100)

const loading = ref(false)  // 加载状态

const handleView = (index, row) => {
  console.log(row['id'])
      route.push({
        name: 'Details',
        params: {
            id: row['id'],
        }
    })
}
const handleChane = (index , row) => {
  console.log(row['id'])
}
const handleExport = (index, row) => {
  console,log(row['id'])
}

const tableData = [
  {
    serial_number: 1,
    id: "MX0001",
    household_name: 'Mona',
    registered_residence_number: '0110001',
    total_registered_residence_population: '3',
    contact_number: '131111111',
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

.center {
  padding: 20px;
}
</style>