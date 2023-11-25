import request from '@/utils/request'
// 管理相关
// 更新文章详情
export const useUpdateArticleInfoService = (data) =>
  request.put('/my/article/add', data)

// 发布文章
export const useAddArticleService = (data) =>
  request.post('/my/article/add', data)

// 获取文章详情
export const useGetArticleInfoService = (id) =>
  request.get('/my/article/info', {
    params: {
      id
    }
  })

// 删除文章
export const useDeleteArticleService = (id) =>
  request.delete('/my/article/info', {
    params: {
      id
    }
  })

// 获取文章列表
export const useGetArticleListService = (params) =>
  request.get('/my/article/list', {
    params
  })
