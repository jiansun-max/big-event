<template>
  <PageContainer title="文章分类">
    <template #extra>
      <el-button class="button" type="primary" @click="onAddChannel">
        添加分类
      </el-button>
    </template>

    <!-- table的父盒子 -->

    <el-table
      :data="cateList"
      style="width: 100%"
      size="large"
      v-loading="loading"
      stripe
      class="cate-table"
    >
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="cate_name" label="分类名称" min-width="100" />
      <el-table-column prop="cate_alias" label="分类别名" min-width="100" />
      <el-table-column label="操作" width="120">
        <!-- 接收一个对象 -->
        <template #default="{ row }">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            plain
            @click="onEditChannel(row)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            circle
            plain
            @click="onDelChannel(row)"
          />
        </template>
      </el-table-column>
      <!-- 空数据插槽 -->
      <template #empty>
        <el-empty description="没有数据" />
      </template>
      <!-- 添加分类 dialog对话框 -->
    </el-table>

    <!-- dialog表单 -->
    <ChannelDialog ref="dialog" @updateList="updateList"></ChannelDialog>
  </PageContainer>
</template>

<script setup>
import PageContainer from '@/components/PageContainer.vue'
import ChannelDialog from './components/ChannelDialog.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { useGetChannelListService, useDeleteChannelService } from '@/api'

// 分类列表
const cateList = ref([])

// 加载状态
const loading = ref(true)

// 数据更新
const updateList = async () => {
  loading.value = true
  cateList.value = (await useGetChannelListService()).data.data
  loading.value = false
}

onMounted(async () => {
  // 数据初渲染
  cateList.value = (await useGetChannelListService()).data.data
  loading.value = false
})

const onDelChannel = async (row) => {
  try {
    // 内容 标题 配置对象
    await ElMessageBox.confirm('确认删除该分类信息？', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
  } catch (error) {
    return
  }
  const {
    data: { code }
  } = await useDeleteChannelService(row.id)
  if (!code) {
    ElMessage.success('分类删除成功')
    updateList()
  }
}

// 获取子组件实例并调用其暴露的方法
const dialog = ref()
const onAddChannel = () => {
  dialog.value.open()
}
const onEditChannel = async (row) => {
  dialog.value.open(row)
}
</script>

<!-- reactive 与 ref -->
