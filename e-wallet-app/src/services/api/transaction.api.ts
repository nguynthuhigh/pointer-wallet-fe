import axios from "axios";

import Cookies from "universal-cookie";
const cookie = new Cookies();
export const getTransactionPaginate = async (page: number,limit:number) => {
    return await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/transaction/get/transactions?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${cookie.get("token_auth")}`,
        },
      }
    );
  };