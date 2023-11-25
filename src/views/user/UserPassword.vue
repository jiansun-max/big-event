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
      <el-form-item label="原密码" prop="old_pwd">
        <el-input v-model="formModel.old_pwd" type="password"></el-input>
      </el-form-item>

      <el-form-item label="新密码" prop="new_pwd">
        <el-input
          v-model="formModel.new_pwd"
          :type="pwbVisible ? '' : 'password'"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input
          v-model="formModel.re_pwd"
          :type="pwbVisible ? '' : 'password'"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="pwbVisible" label="显示密码" size="large" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">修改密码</el-button>
        <el-button type="primary" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </PageContainer>
</template>

<script setup>
import { ref } from 'vue'
import { useUpdateUserPasswordService } from '@/api'

const formRef = ref()
const pwbVisible = ref(false)

// 自定义校验
const checkRepassword = (rule, value, callback) => {
  if (value !== formModel.value.new_pwd) {
    callback(new Error(rule.message))
  } else {
    callback()
  }
}
const rules = ref({
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/i,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/i,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  re_pwd: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/i,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    },
    {
      validator: checkRepassword,
      message: '两次输入密码不一致',
      trigger: 'blur'
    }
  ]
})
const formModel = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

const handleSubmit = async () => {
  await formRef.value.validate()
  const res = await useUpdateUserPasswordService(formModel.value)
  const code = res.data.code
  if (!code) {
    ElMessage.success('密码修改成功')
  }
}

const handleReset = () => {
  formRef.value.resetFields()
}
</script>

<style scoped></style>
