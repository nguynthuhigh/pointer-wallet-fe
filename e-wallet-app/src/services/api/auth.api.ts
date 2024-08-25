// import axios from "axios";
// import Cookies from "universal-cookie";
// const cookie = new Cookies();
// const accessToken = cookie.get("access_token");
// import axiosConfig from '../../config/axios.config'

// export const loginAPI = async (body: any) => {
//   const response = await axios.post(
//     `${import.meta.env.VITE_API_URL}/api/v1/user/signin`,
//     body,
//     {withCredentials:true}
//   );
//   return response;
// };

// export const verifyLoginAPI = async (body: any) => {
//   const response = await axios.post(
//     `${import.meta.env.VITE_API_URL}/api/v1/user/signin/verify`,
//     body,
//     {withCredentials:true}
//   );
//   return response;
// };
// export const verifyRegisterAPI = async (body: any) => {
//   const response = await axios.post(
//     `${import.meta.env.VITE_API_URL}/api/v1/user/signup/verify`,
//     body
//   );
//   return response;
// };
// export const registerAPI = async (body: any) => {
//   const response = await axios.post(
//     `${import.meta.env.VITE_API_URL}/api/v1/user/signup`,
//     body
//   );
//   return response;
// };
// export const securityCode = async (body: { security_code: string }) => {
//   const response = await axiosConfig.put(
//     `/api/v1/user/update-security-code`,
//     body,
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );
//   return response;
// };
// export const resendOTP = async (body: { email: string; password: string }) => {
//   const response = await axios.post(
//     `${import.meta.env.VITE_API_URL}/api/v1/user/resend-email`,
//     body
//   );
//   return response;
// };
import axios from "axios";
import Cookies from "universal-cookie";
const cookie = new Cookies();
const accessToken = cookie.get("accessToken");
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
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/signin/verify`,
    body
  );
  return response;
};
export const verifyRegisterAPI = async (body: any) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/signup/verify`,
    body
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
    `${import.meta.env.VITE_API_URL}/api/v1/user/update-security-code`,
    body,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
