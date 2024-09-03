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
