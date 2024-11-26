import axios from "axios";
import { createAxios } from "../../config/axios.config";
export const loginAPI = async (body: any) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/signin`,
    body,
    {
      withCredentials: true,
    }
  );
  return response;
};

export const verifyLoginAPI = async (body: any) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/signin/verify`,
    body,
    {
      withCredentials: true,
    }
  );
  return response;
};
export const verifyRegisterAPI = async (body: any) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/signup/verify`,
    body,
    {
      withCredentials: true,
    }
  );
  return response;
};

export const registerAPI = async (body: any) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/signup`,
    body,
    {
      withCredentials: true,
    }
  );
  return response;
};
export const securityCode = async (body: { security_code: string }) => {
  const axiosInstance = createAxios();
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

export const getProfileAPI = async () => {
  const axiosInstance = createAxios();
  return await axiosInstance.get("/api/v1/user/profile");
};

export const logout = async () => {
  const axiosInstance = createAxios();
  return await axiosInstance.post("/api/v1/user/log-out");
};

export const forgotPassword = async (email: string) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/forgot-password`,
    { email: email }
  );
};

export const resetPassword = async ({
  email,
  password,
  otp,
}: {
  email: string;
  password: string;
  otp: string;
}) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/reset-password`,
    {
      email,
      password,
      otp,
    }
  );
  return response;
};
