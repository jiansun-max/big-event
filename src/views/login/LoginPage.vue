<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <template v-if="isRegister">
        <el-form
          class="form"
          size="large"
          :model="formModel"
          :rules="rules"
          ref="formRef"
        >
          <el-form-item>
            <h1 class="title">登录</h1>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="formModel.username"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="formModel.password"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item>
            <div class="flex">
              <el-checkbox label="记住我" size="large" v-model="isRemenber" />
              <el-button :key="'忘记密码?'" type="primary" link
                >忘记密码?</el-button
              >
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button" @click="login"
              >登录</el-button
            >
          </el-form-item>
          <el-form-item>
            <!-- 可自动文字居中？ -->
            <el-link type="info" :underline="false" @click="switchForm()"
              >注册 →</el-link
            >
          </el-form-item>
        </el-form>
      </template>
      <template v-else>
        <el-form
          class="form"
          size="large"
          :model="formModel"
          :rules="rules"
          ref="formRef"
        >
          <el-form-item>
            <h1 class="title">注册</h1>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              placeholder="请输入用户名"
              v-model="formModel.username"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              placeholder="请输入密码"
              v-model="formModel.password"
            />
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input
              type="password"
              :prefix-icon="Lock"
              placeholder="请再次输入密码"
              v-model="formModel.repassword"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button" @click="register"
              >注册</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-link type="info" :underline="false" @click="switchForm()"
              >← 登录</el-link
            >
          </el-form-item>
        </el-form>
      </template>
    </el-col>
  </el-row>
</template>

<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores'
import { userRegisterService, userLoginService } from '@/api'

// 账号与密码
// bilibili
// bilibili

// 表单元素
const formRef = ref()

// router
const router = useRouter()

// store
const store = useUserStore()

// 登录/注册切换
const isRegister = ref(true)
const switchForm = () => {
  isRegister.value = !isRegister.value
}

// 登录/注册以及表单预校验
const login = async () => {
  // 预校验
  await formRef.value.validate()
  const { data } = await userLoginService(formModel)
  // token保存
  store.setToken(data.token)
  ElMessage.success(data.message)

  // 跳转首页
  router.push('/')
}

const register = async () => {
  // 预校验
  await formRef.value.validate()
  const { data } = await userRegisterService(formModel)

  ElMessage.success(data.message)
  switchForm()
}

// 表单数据对象
const formModel = reactive({
  username: '',
  password: '',
  repassword: ''
})

// 自定义校验
const checkRepassword = (rule, value, callback) => {
  if (value !== formModel.password) {
    callback(new Error(rule.message))
  } else {
    callback()
  }
}

// 表单数据校验规则
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{1,10}$/i,
      message: '用户名必须是1-10位大小写字母和数字',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/i,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
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

// 表单重置监视
watch(isRegister, () => {
  formRef.value.resetFields()
})

const { isRemenber } = storeToRefs(store)
</script>

<style scoped lang="scss">
.login-page {
  height: 100vh;
  background-color: white;

  .bg {
    background-image: url('@/assets/logo2.png'), url('@/assets/login_bg.jpg');
    background-size: 240px, cover;
    background-position: center, center;
    background-repeat: no-repeat;
    background-position-x: 60%, center;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      margin-bottom: 10px;
    }
    .button {
      width: 100%;
    }
    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
}
</style>
