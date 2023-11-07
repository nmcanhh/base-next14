export interface LoginData {
  email: string;
  password: string;
}

export type LoginApiResponse = ApiResponse<{
  token: string;
  refreshToken: string;
  session: UserSession;
}>;

export type RefreshApiResponse = ApiResponse<{
  token: string;
}>;
