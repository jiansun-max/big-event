<template>
  <el-container class="layout-container">
    <el-aside width="200px" class="side-menu">
      <div class="side-logo"></div>

      <!-- default-active 默认激活对应index值的item -->
      <!-- router 开启vue-router点击跳转至index对应路由  -->
      <!-- $route.path 表示当前路由路径 -->

      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        text-color="#fff"
        :default-active="$route.path"
        router
      >
        <!-- index为路由，若不以/开头，则会以当前路由为父路由；若有，则替换当前路由 -->
        <el-menu-item index="/article/channel">
          <!-- 标签型图标也可通过import引入 -->
          <el-icon><Management /></el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <!-- #title 为slot插槽语法 -->
          <template #title>
            <div>
              <el-icon><UserFilled /></el-icon>
              <span>个人中心</span>
            </div>
          </template>

          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>基本资料</el-menu-item
          >
          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>更换头像</el-menu-item
          >
          <el-menu-item index="/user/password">
            <el-icon><EditPen /></el-icon>重置密码</el-menu-item
          >
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="el-header">
        <div>
          黑马程序员：<b>{{ userInfo.nickname || userInfo.username }}</b>
        </div>
        <div>
          <!-- command事件:在下拉项被点击时触发，接收一个值为下拉项的command属性值的参数 -->
          <el-dropdown @command="handleCommand" placement="bottom-end">
            <span class="dropdown-root">
              <el-avatar :size="40" :src="userInfo.user_pic || avatar" />
              <el-icon color="#999"><CaretBottom /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <!-- command属性 -->
                <el-dropdown-item :icon="User" command="profile"
                  >基本资料</el-dropdown-item
                >
                <el-dropdown-item :icon="Crop" command="avatar">
                  更换头像
                </el-dropdown-item>
                <el-dropdown-item :icon="EditPen" command="password"
                  >重置密码</el-dropdown-item
                >
                <el-dropdown-item :icon="SwitchButton" command="logout"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
      <el-footer class="footer">
        大事件 ©2023 Created by 黑马程序员
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
// 标签型图标也可通过import引入
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores'
// avatar值为文件在项目中的路径
import avatar from '@/assets/default.png'

const router = useRouter()

// 从store获取用户信息
const userStore = useUserStore(),
  { userInfo } = storeToRefs(userStore)

// 下拉菜单command事件处理函数
const handleCommand = async (type) => {
  if (type === 'logout') {
    // 用户登出确认
    // 取消时会有error需要进行catch
    try {
      // 内容 标题 配置对象
      await ElMessageBox.confirm('确定要退出登录?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    } catch (error) {
      return
    }

    ElMessage('已退出登录')
    userStore.resetUserStore()
    router.push('/login')
  } else {
    router.push(`/user/${type}`)
  }
}

onMounted(() => {
  userStore.updateUserInfo()
})
</script>

<style scoped lang="scss">
* {
  border: none;
}

// 只需设置container的高度，子层级高度会自适应
.layout-container {
  height: 100vh;
  background-color: #f5f5f5;
}
.side-menu {
  background-color: #232323;
}
.side-logo {
  height: 120px;
  background-image: url('@/assets/logo.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 120px;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: white;

  .dropdown-root {
    display: flex;
    align-items: center;

    & > *:first-child {
      margin-right: 8px;
    }
  }
}

.main {
  padding: 20px;

  & > * {
    height: 100%;
    border-radius: 4px;
  }
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #666;
}
</style>
