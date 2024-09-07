import { createAxios } from "../../config/axios.config";
const axiosInstance = createAxios();
export const editProfile = async (formData:any) => {
  return await axiosInstance.put(
    `/api/v1/user/edit-profile`,formData,
    {
      withCredentials: true,
      headers:{
        'Content-Type':'multipart/form-data'
      }
    }
  );
};
export const changePassword = async (body:any) => {
    return await axiosInstance.patch(
      `/api/v1/user/change-password`,body,
      {
        withCredentials: true,
      }
    );
  };
  export const changeSecurityCode = async (body:any) => {
    return await axiosInstance.patch(
      `/api/v1/user/change-security-code`,body,
      {
        withCredentials: true,
      }
    );
  };
