import axios from "axios";
import { createAxios } from "../../config/axios.config";
const axiosInstance = createAxios();
export const loginAPI = async (body: any) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/signin`,
    body
  );
  return response;
};

export const verifyLoginAPI = async (body: any) => {
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/signin/verify`,
    body,{
      withCredentials:true
    }
  );
  return response;
};
export const verifyRegisterAPI = async (body: any) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/signup/verify`,body,
    {
      withCredentials:true
    }
  );
  return response;
};
export const registerAPI = async (body: any) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/signup`,
    body
  );
  return response;
};
export const securityCode = async (body: { security_code: string }) => {
  const response = await axiosInstance.put(
    `/api/v1/user/update-security-code`,
    body,
    {
      withCredentials: true,
    }
  );
  return response;
};
export const resendOTP = async (body: { email: string; password: string }) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/resend-email`,
    body
  );
  return response;
};
