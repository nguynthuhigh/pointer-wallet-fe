import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    Authorization: "Bearer " + token,
    "x-api-key": "123123",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
