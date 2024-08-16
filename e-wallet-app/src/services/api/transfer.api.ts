import axios from "axios";
import { DataSend } from "../../types/transfer";
import Cookies from "universal-cookie";
const cookie = new Cookies()
export const getUserByEmail =async (email:string)=>{
    return  await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/get-user?email=${email}`);
}
export const sendMoneyAPI =async (body:DataSend)=>{
    return  await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/wallet/send-money`,body,{
        headers:{
            Authorization: 'Bearer '+cookie.get('token_auth')
        }
    });
}