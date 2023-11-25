import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useGetUserInfoService } from '@/api'

// 用户模块Store
export const useUserStore = defineStore(
  'user',
  () => {
    const isRemenber = ref(false)
    const token = ref('')
    const userInfo = ref({})

    // 由于初始化时token为'',只有在pinia读取本地存储后才可正常获取用户信息
    async function updateUserInfo() {
      userInfo.value = (await useGetUserInfoService()).data.data
    }

    function setToken(newToken) {
      token.value = newToken ? newToken : ''
    }

    function remenberMe(newValue) {
      isRemenber.value = newValue
    }

    function resetUserStore() {
      isRemenber.value = false
      token.value = ''
      userInfo.value = {}
    }

    return {
      isRemenber,
      token,
      userInfo,
      updateUserInfo,
      setToken,
      remenberMe,
      resetUserStore
    }
  },
  {
    persist: true
  }
)
