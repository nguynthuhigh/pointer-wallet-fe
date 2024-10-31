import axios from "axios";
import { getStore } from "../redux/hooks";
import { addAccessToken } from "../redux/auth/authSlice";

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

const subscribeTokenRefresh = (cb: () => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = () => {
  refreshSubscribers.forEach((cb) => cb());
  refreshSubscribers = [];
};

export const createAxios = () => {
  const store = getStore();
  const accessToken = store.getState().auth.accessToken;
  const dispatch = store.dispatch;

  const newInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    withCredentials: true,
  });

  newInstance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  newInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const response = await newInstance.post(
              `/api/v1/user/refresh-token`
            );

            if (response.status === 200) {
              const newAccessToken = response.data.data;
              await dispatch(addAccessToken(newAccessToken));
              onRefreshed();
              isRefreshing = false;

              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return newInstance(originalRequest);
            }
          } catch (error) {
            console.error("Failed to refresh token:", error);
            isRefreshing = false;
            return Promise.reject(error);
          }
        } else {
          return new Promise((resolve) => {
            subscribeTokenRefresh(() => {
              resolve(newInstance(originalRequest));
            });
          });
        }
      }

      return Promise.reject(error);
    }
  );

  return newInstance;
};
