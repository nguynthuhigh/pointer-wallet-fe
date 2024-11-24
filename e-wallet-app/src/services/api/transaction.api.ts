import { createAxios } from "../../config/axios.config";
export const getTransactionPaginate = async (page: number, limit: number) => {
  const axiosInstance = createAxios();
  return await axiosInstance.get(
    `/api/v1/transaction/get/transactions?page=${page}&page_limit=${limit}`,
    {
      withCredentials: true,
    }
  );
};

export const getTransactionDetails = async (id: string) => {
  const axiosInstance = createAxios();
  return await axiosInstance.get(
    `/api/v1/transaction/get/transaction/details/${id}`,
    {
      withCredentials: true,
    }
  );
};
