<template>
  <PageContainer title="基本资料">
    <el-form
      :model="formModel"
      ref="formRef"
      :rules="rules"
      label-width="100px"
      size="large"
      style="width: 50%"
    >
      <el-form-item label="登录名称">
        <el-input v-model="formModel.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="formModel.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="formModel.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </PageContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores'
import { useGetUserInfoService, useUpdateUserInfoService } from '@/api'

const formRef = ref()
const rules = ref({
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{1,10}$/i,
      message: '用户名必须是1-10位大小写字母和数字',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    {
      pattern: /^\d+@[a-z]+\.com$/,
      message: '邮箱必须符合邮箱格式',
      trigger: 'blur'
    }
  ]
})
const formModel = ref({
  username: '',
  nickname: '',
  email: ''
})

const handleSubmit = async () => {
  await formRef.value.validate()
  const res = await useUpdateUserInfoService(formModel.value)
  const code = res.data.code
  if (!code) {
    ElMessage.success('提交修改成功')
    await useUserStore().updateUserInfo()
  }
}

onMounted(async () => {
  formModel.value = (await useGetUserInfoService()).data.data
})
</script>

<style scoped></style>
