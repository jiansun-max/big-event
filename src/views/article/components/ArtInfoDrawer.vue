<template>
  <el-drawer
    v-model="visible"
    :title="title"
    :before-close="handleClose"
    direction="rtl"
    size="50%"
  >
    <template v-if="type != 'read'">
      <el-form
        :model="formModel"
        :rules="rules"
        label-width="80px"
        size="default"
        ref="formRef"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="formModel.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select
            v-model="formModel.cate_id"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.cate_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_img">
          <el-upload class="uploader">
            <img
              v-if="formModel.cover_img"
              :src="getImgSrc(formModel.cover_img)"
              class="cover-img"
            />
            <el-icon v-else class="uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <el-input v-model="formModel.content" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmitOffice">发布</el-button>
          <el-button @click="handleSubmitDemo">草稿</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template v-else>
      <div class="read">
        <el-row class="read-title">
          <h1>{{ formModel.title }}</h1>
        </el-row>
        <el-row>
          <el-text>作者：{{ formModel.username }}</el-text>
        </el-row>
        <el-row>
          <el-text>发布时间：{{ dateFormatter(formModel.pub_date) }}</el-text>
        </el-row>
        <el-row>
          <el-text>文章分类：{{ formModel.cate_name }}</el-text>
        </el-row>
        <el-divider />
        <el-row class="read-img">
          <el-image
            :style="{ boxShadow: 'var(--el-box-shadow-light)' }"
            :src="getImgSrc(formModel.cover_img)"
            fit="scale-down"
          />
        </el-row>
        <el-row>
          <p v-html="formModel.content" style="text-indent: 2em"></p
        ></el-row>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import { ref, defineExpose } from 'vue'
import { useGetChannelListService, useGetArticleInfoService } from '@/api'
import { baseURL } from '@/utils/request'
import { dateFormatter } from '@/utils/dateFormatter'

// 由于表单被v-if隐藏，不存在dom结构，故起始实例无法用ref获取，不适合用resetFileds重置表单

const formRef = ref()
const cateList = ref([])
const formModel = ref({
  id: '',
  title: '',
  content: '',
  cover_img: '',
  pub_date: '',
  state: '',
  cate_id: '',
  author_id: '',
  cate_name: '',
  username: '',
  nickname: ''
})
const rules = {
  title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
  cate_id: [{ required: true, message: '请选择文章分类', trigger: 'blur' }],
  cover_img: [{ required: true, message: '请选择文章封面', trigger: 'blur' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
}

const visible = ref(false)
const title = ref('')
const type = ref('')

// 拼接封面图片地址
const getImgSrc = (path) => {
  return baseURL + path
}

// 抽屉页面关闭
const handleClose = async () => {
  try {
    await ElMessageBox.confirm(`确定退出${title.value}?`, '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
  } catch (error) {
    return
  }
  visible.value = false
}

// 提交为文章
const handleSubmitOffice = async () => {
  //   await formRef.value.validate()
  visible.value = false
}

// 提交草稿
const handleSubmitDemo = async () => {
  //   await formRef.value.validate()
  visible.value = false
}

const open = async (row, state) => {
  if (state == 'add') {
    title.value = '发布文章'
    formModel.value = {
      id: '',
      title: '',
      content: '',
      cover_img: '',
      pub_date: '',
      state: '',
      cate_id: '',
      author_id: '',
      cate_name: '',
      username: '',
      nickname: ''
    }
  } else if (state == 'edit') {
    title.value = '编辑文章'
  } else if (state == 'read') {
    title.value = '文章预览'
  }

  if (state != 'add') {
    formModel.value = (await useGetArticleInfoService(row.id)).data.data
  }

  if (state != 'read') {
    const {
      data: { data }
    } = await useGetChannelListService()
    cateList.value = data
  }

  type.value = state
  visible.value = true
}

defineExpose({
  open
})
</script>

<style lang="scss">
.uploader .el-upload {
  width: 160px;
  height: 160px;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 160px;
  height: 160px;
  text-align: center;
}

.cover-img {
  width: 100%;
  height: 100%;
}
.read {
  .read-title {
    margin-bottom: 20px;
  }
  .read-img {
    margin-bottom: 20px;
  }
}
</style>
