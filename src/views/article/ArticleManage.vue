<template>
  <PageContainer title="文章管理">
    <template #extra>
      <el-button class="button" type="primary" @click="handleAddArt">
        发布文章
      </el-button>
    </template>
    <!-- 搜索栏：行内表单 -->
    <el-form inline ref="formRef" :model="info">
      <el-form-item label="文章分类" prop="cate_id">
        <el-select v-model="info.cate_id" placeholder="请选择">
          <el-option key="全部分类" label="全部" value="" />
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.cate_name"
            :value="item.id"
            placement="bottom"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态" prop="state">
        <el-select v-model="info.state" placeholder="请选择">
          <el-option key="全部状态" label="全部" value="" />
          <el-option
            v-for="item in stateList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="handleResetSearch">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 文章列表：表格 -->
    <el-table :data="artList" v-loading="loading" size="large" stripe>
      <el-table-column label="文章标题" prop="title">
        <!-- 默认插槽：好用 -->
        <template #default="{ row }">
          <el-link
            type="primary"
            :underline="false"
            @click="handleReadInfo(row)"
            >{{ row.title }}</el-link
          >
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"> </el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ dateFormatter(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"> </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            plain
            @click="handleEditInfo(row)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            circle
            plain
            @click="handleDelInfo(row)"
          />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 分页器 -->
    <div class="pageBox">
      <el-pagination
        v-model:current-page="info.pagenum"
        v-model:page-size="info.pagesize"
        :page-sizes="[4, 6, 8, 10]"
        background
        layout="jumper,total, sizes, prev, pager, next"
        :total="info.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </PageContainer>

  <!-- 抽屉组件 -->
  <ArtInfoDrawer ref="drawerRef"></ArtInfoDrawer>
</template>

<script setup>
import PageContainer from '@/components/PageContainer.vue'
import ArtInfoDrawer from './components/ArtInfoDrawer.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref, onMounted, reactive } from 'vue'
import { dateFormatter } from '@/utils/dateFormatter'
import {
  useGetChannelListService,
  useGetArticleListService,
  useDeleteArticleService
} from '@/api'

const loading = ref(false)
const cateList = ref([])
const stateList = ref([
  {
    value: '已发布'
  },
  {
    value: '草稿'
  }
])

const artList = ref()

const formRef = ref()

onMounted(() => {
  updateList()
})

const handleSearch = () => {
  updateList()
}
const handleResetSearch = () => {
  // validate不生效？
  info.cate_id = ''
  info.state = ''
}

const info = reactive({
  pagenum: 1,
  pagesize: 10,
  cate_id: '',
  state: '',
  total: 0
})

const updateList = async () => {
  loading.value = true
  cateList.value = (await useGetChannelListService()).data.data
  const {
    data: { data, total }
  } = await useGetArticleListService(info)

  info.total = total
  artList.value = data
  loading.value = false
}

const handleSizeChange = () => {
  info.pagenum = 1
  updateList()
}
const handleCurrentChange = () => {
  updateList()
}

const drawerRef = ref()

// 文章编辑
const handleEditInfo = (row) => {
  drawerRef.value.open(row, 'edit')
}

// 文章删除
const handleDelInfo = async (row) => {
  try {
    await ElMessageBox.confirm('确认删除该文章？', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
  } catch (error) {
    return
  }
  const {
    data: { code }
  } = await useDeleteArticleService(row.id)
  if (!code) {
    ElMessage.success('文章删除成功')
    updateList()
  }
}

// 文章添加
const handleAddArt = (row) => {
  drawerRef.value.open(row, 'add')
}

// 文章预览
const handleReadInfo = (row) => {
  drawerRef.value.open(row, 'read')
}
</script>

<style scoped>
.pageBox {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}
</style>
