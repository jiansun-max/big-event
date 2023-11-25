import request from '@/utils/request'

// 分类相关
// 删除文章分类
export const useDeleteChannelService = (id) =>
  request.delete('/my/cate/del', { params: { id } })

// 获取文章分类详情
export const useGetChannelInfoService = (id) =>
  request.get('/my/cate/info', { params: { id } })

// 更新文章分类
export const useUpdateChannelInfoService = (data) =>
  request.put('/my/cate/info', data)

// 增加文章分类
export const useAddChannelService = (data) => request.post('/my/cate/add', data)

// 获取文章分类列表
export const useGetChannelListService = () => request.get('/my/cate/list')
