import request from '@/utils/request'

// 注册接口
export const userRegisterService = (data) => request.post('/api/reg', data)

// 登录接口
export const userLoginService = (data) => request.post('/api/login', data)

// 获取用户信息
export const useGetUserInfoService = () => request.get('/my/userinfo')

// 更新用户头像
export const useUpdateUserAvatarService = (avatar) =>
  request.patch('/my/update/avatar', { avatar })

// 更新用户密码
export const useUpdateUserPasswordService = (data) =>
  request.patch('/my/updatepwd', data)

// 更新用户基本资料
export const useUpdateUserInfoService = (data) =>
  request.put('/my/userinfo', data)
