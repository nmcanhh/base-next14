import { setCookie } from '@/utils/storage'
import http from './axiosClient'
const namePath = '/auth'

class AuthService {
  login = async (body: any) => {
    const res = await http.post(`${namePath}/login`, body)
    return res?.data
  }

  logout = async () => {
    const res = await http.post(`${namePath}/logout`)
    return res?.data
  }

  refreshToken = async (body: { refreshToken: string }) => {
    const res = await http.post(`${namePath}/refresh-token`, body)
    if (res?.data?.tokens) {
      const accessTokenSecret = res?.data?.tokens?.accessToken
      setCookie('accessToken', accessTokenSecret)

      const accessRefreshTokenSecret = res?.data?.tokens?.refreshToken
      setCookie('refreshToken', accessRefreshTokenSecret)
    }
    return res?.data
  }

  getMe = async () => {
    const config = {
      enableFlashMessage: true,
    }
    const res = await http.get(`${namePath}/me`, config)

    return res?.data
  }
}

export default new AuthService()
