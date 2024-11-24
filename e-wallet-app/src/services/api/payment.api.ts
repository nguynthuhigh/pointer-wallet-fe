import axios from "axios";
import { createAxios } from "../../config/axios.config";
import { ApplyVoucher } from "../../types/payment";

export const paymentAPI = async (token: unknown) => {
  return await axios.get(
    import.meta.env.VITE_API_PAYMENT + "/api/payment/get-order/" + token,
    { withCredentials: false }
  );
};

export const confirmPaymentAPI = async (body: unknown) => {
  const axiosInstance = createAxios();
  return await axiosInstance.post(`/api/v1/confirm-payment`, body, {
    withCredentials: true,
  });
};
export const getVouchersPartner = async (id: string) => {
  return await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/api/v1/voucher/get-vouchers-partner?partnerID=${id}`
  );
};

export const applyVoucher = async (body: ApplyVoucher) => {
  const axiosInstance = createAxios();
  return await axiosInstance.post(`/api/v1/apply-voucher`, body, {
    withCredentials: true,
  });
};
