import axios from "axios";
import Cookies from "universal-cookie";
const cookie = new Cookies();
const token = cookie.get("auth_token");
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
export const securityCode = async (body: any) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/profile/update-security-code`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
