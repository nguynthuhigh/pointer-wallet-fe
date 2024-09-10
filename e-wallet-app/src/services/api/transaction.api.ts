import { createAxios } from "../../config/axios.config";
const axiosInstance = createAxios();
export const getTransactionPaginate = async (page: number, limit: number) => {
  return await axiosInstance.get(
    `/api/v1/transaction/get/transactions?page=${page}&limit=${limit}`,
    {
      withCredentials: true,
    }
  );
};

export const getTransactionDetails = async (id:string) => {
  return await axiosInstance.get(
    `/api/v1/transaction/get/transaction/details/${id}`,
    {
      withCredentials: true,
    }
  );
};

