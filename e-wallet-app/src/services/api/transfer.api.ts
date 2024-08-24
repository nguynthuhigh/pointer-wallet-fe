// import axios from "axios";
// import { DataSend } from "../../types/transfer";
// import Cookies from "universal-cookie";
// const cookie = new Cookies()
// import axiosConfig from '../../config/axios.config'

// export const getUserByEmail =async (email:string)=>{
//     return  await axiosConfig.get(`/api/v1/user/get-user?email=${email}`);
// }
// export const sendMoneyAPI =async (body:DataSend)=>{
//     return  await axiosConfig.post(`/api/v1/wallet/send-money`,body,{
//         headers:{
//             Authorization: 'Bearer '+cookie.get('access_token')
//         }
//     });
// }
// export const getTransactionAPI = async (id:string)=>{
//     return await axiosConfig.get(`/api/v1/transaction/get/transaction/details/${id}`,{
//         headers:{
//             Authorization: 'Bearer '+cookie.get('access_token')
//         }
//     })
// }
import axios from "axios";
import { DataSend } from "../../types/transfer";
import Cookies from "universal-cookie";
const cookie = new Cookies();
export const getUserByEmail = async (email: string) => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/user/get-user?email=${email}`
  );
};
export const sendMoneyAPI = async (body: DataSend) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/wallet/send-money`,
    body,
    {
      headers: {
        Authorization: "Bearer " + cookie.get("access_token"),
      },
    }
  );
};
export const getTransactionAPI = async (id: string) => {
  return await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/api/v1/transaction/get/transaction/details/${id}`,
    {
      headers: {
        Authorization: "Bearer " + cookie.get("access_token"),
      },
    }
  );
};
