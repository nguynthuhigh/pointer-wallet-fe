import axios from "axios";
import axiosConfig from '../../config/axios.config'
import Cookies from "universal-cookie";
const cookie = new Cookies();
export const getTransactionPaginate = async (page: number,limit:number) => {
    return await axiosConfig.get(
      `/api/v1/transaction/get/transactions?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${cookie.get("token_auth")}`,
        },
      }
    );
  };