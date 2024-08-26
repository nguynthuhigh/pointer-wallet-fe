import axios from "axios";
import  { createAxios } from '../../config/axios.config'
const axiosInstance = createAxios();
export const getTransactionPaginate = async (page: number,limit:number) => {
    return await axiosInstance.get(
      `/api/v1/transaction/get/transactions?page=${page}&limit=${limit}`,
      {
        withCredentials:true
      }
    );
  };
// import { createAxios } from "../../config/axios.config";
// const axiosInstance = createAxios();
// import Cookies from "universal-cookie";
// const cookie = new Cookies();
// export const getTransactionPaginate = async (page: number, limit: number) => {
//   return await axiosInstance.get(
//     `${
//       import.meta.env.VITE_API_URL
//     }/api/v1/transaction/get/transactions?page=${page}&limit=${limit}`,
//     {
//       headers: {
//         Authorization: `Bearer ${cookie.get("accessToken")}`,
//       },
//     }
//   );
// };
