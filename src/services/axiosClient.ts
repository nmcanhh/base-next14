import { getCookie } from "@/utils/storage";
import axios from "axios";
import authService from "./auth.service";
import { notification } from "antd";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8899/";

const axiosClient = axios.create({
  baseURL: `${apiUrl}`,
  headers: {
    "content-type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config: any) => {
  const customHeaders = {
    Authorization: "",
    "x-client-id": "",
  };
  const token = getCookie("accessToken")
    ? getCookie("accessToken")
    : "";
  if (token) {
    customHeaders.Authorization = token;
  }

  const currentUser = getCookie("currentUser");
  if (currentUser) {
    const { userId } = JSON.parse(currentUser);
    customHeaders["x-client-id"] = userId;
  }

  return {
    ...config,
    headers: {
      ...customHeaders, // auto attach token
      ...config.headers, // but you can override for some requests
    },
  };
});

let isRefreshing = false;
let refreshSubscribers: any[] = [];

axiosClient.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (config?.enableFlashMessage) {
      notification.error(error.message || "Bad Request");
    }

    if (status === 422) {
      const retryOrigReq = new Promise((resolve, reject) => {
        subscribeTokenRefresh((token: string) => {
          originalRequest.headers["Authorization"] = token;
          resolve(axios(originalRequest));
        });
      });
      retryOrigReq;

      if (!isRefreshing) {
        isRefreshing = true;
        const dataRefreshToken = await authService.refreshToken({
          refreshToken: getCookie("refreshToken"),
        });
        if (dataRefreshToken?.data?.tokens) {
          isRefreshing = false;
          onRreFreshed(dataRefreshToken?.data?.tokens?.accessToken);
        } else {
          window.location.href = "/login";
        }
      }
    }

    // console.error(error.response, "interceptors Error")
    if (status === 401) {
      // window.location.href = '/login'
    } else {
      throw error.response;
    }
  }
);

const subscribeTokenRefresh = (cb: any) => {
  refreshSubscribers.push(cb);
};

const onRreFreshed = (token: string) => {
  refreshSubscribers.map((cb) => cb(token));
};

export default axiosClient;
