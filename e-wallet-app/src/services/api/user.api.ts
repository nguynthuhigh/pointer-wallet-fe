import { createAxios } from "../../config/axios.config";
const axiosInstance = createAxios();
export const getProfileAPI = async () => {
  return axiosInstance.get("/api/v1/user/profile", {
    withCredentials: true,
  });
};
