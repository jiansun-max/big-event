import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

// pinia独立维护
export default pinia

// 仓库统一导出
// 导入并导出
export * from './modules/user'
