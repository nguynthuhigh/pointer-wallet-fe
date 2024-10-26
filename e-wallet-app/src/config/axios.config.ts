import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";

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
  const newInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("at")}`,
    },
  });

  newInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const response = await newInstance.post(
              `/api/v1/user/refresh-token`
            );

            if (response.status === 200) {
              onRefreshed();
              isRefreshing = false;
              setCookie("at", response.data.data);
              return newInstance(originalRequest);
            }
          } catch (error) {
            console.error("Failed to refresh token:", error);
            isRefreshing = false;
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
