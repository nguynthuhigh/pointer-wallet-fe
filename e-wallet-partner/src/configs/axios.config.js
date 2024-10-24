import axios from "axios";
import { getToken } from "../utils/cookie";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " +  getToken("access_token")
  },

});
axiosInstance.defaults.withCredentials = true;
axios.defaults.withCredentials = true;
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/partner/refresh-token`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          return axiosInstance(originalRequest, { withCredentials: true });
        }
      } catch (error) {
        window.location.href =
          "https://sso-pointer.vercel.app/authorize?callbackUrl=https://pointer.io.vn/authorize";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
