import axios from 'axios'
// 组合式API的好处，想在哪引入就在哪引入！！！
import { useUserStore } from '@/stores'
// import { ElMessage as EM } from 'element-plus'
// import { useRouter } from 'vue-router'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    config.headers.Authorization = useUserStore().token
    return config
  },

  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    if (res.data.code === 0 || res.data.status === 0) {
      return res
    }
    // 弹窗提示
    ElMessage.error(res.data.message || 'error!!!')
    return Promise.reject(res.data)
  },
  async (err) => {
    // TODO 5. 处理401错误 ==>权限不足 | token过期，拦截到登录
    if (err.response.status === 401) {
      router.push('/login')
    }
    // 错误的默认情况
    ElMessage.error(err.response.data.message || 'error!!!')

    // 弹窗提示
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
