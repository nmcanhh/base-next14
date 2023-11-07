export type UserSession = {
  userId?: string
  email?: string
}

export type DataLogin = {
  userId: string
  email: string
  accessToken: string
  refreshToken: string
}
