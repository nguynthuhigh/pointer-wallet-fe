import axios from "axios";
import { createAxios } from "../../config/axios.config";
const axiosInstance = createAxios();
import { DataSend } from "../../types/transfer";
export const getUserByEmail = async (email: string) => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/user/get-user?email=${email}`
  );
};
export const sendMoneyAPI = async (body: DataSend) => {
  return await axiosInstance.post(`/api/v1/wallet/send-money`, body, {
    withCredentials: true,
  });
};
export const getTransactionAPI = async (id: string) => {
  return await axiosInstance.get(
    `/api/v1/transaction/get/transaction/details/${id}`,
    {
      withCredentials: true,
    }
  );
};
interface DepositProps {
  currency: string;
  cardID: string;
  security_code: string;
  amount: string;
}
type WithdrawProps = Omit<DepositProps, "currency">;
export const depositMoney = async (body: DepositProps) => {
  return await axiosInstance.post(`/api/v1/wallet/deposit-money`, body, {
    withCredentials: true,
  });
};
export const withdrawMoney = async (body: WithdrawProps) => {
  return await axiosInstance.post(`/api/v1/wallet/withdraw-money`, body, {
    withCredentials: true,
  });
};
