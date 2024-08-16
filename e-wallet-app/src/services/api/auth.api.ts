import axios from "axios";
import Cookies from "universal-cookie";
export const loginAPI = async(body:any)=>{
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/signin`,body);
      return response;
}

export const verifyLoginAPI = async(body:any)=>{
  const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/user/signin/verify`,body);
    return response;
}