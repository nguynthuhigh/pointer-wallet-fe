import axios from "axios";
import Cookies from "universal-cookie";
import { ApplyVoucher } from "../../types/payment";
const cookie = new Cookies();
import axiosConfig from '../../config/axios.config'

export const paymentAPI = async (token: unknown) => {
  return await axiosConfig.get(
    import.meta.env.VITE_API_URL + "/payment-gateway?token=" + token
  );
};

export const confirmPaymentAPI = async (body: unknown) => {
  return await axiosConfig.post(
    `/api/v1/confirm-payment`,
    body,
    {
      headers: {
        Authorization: `Bearer ${cookie.get("token_auth")}`,
      },
    }
  );
};
export const getVouchersPartner = async (id:string) => {
  return await axiosConfig.get(
    `/api/v1/voucher/get-vouchers-partner?partnerID=${id}`
  );
};

export const applyVoucher = async (body:ApplyVoucher) => {
  return await axiosConfig.post(
    `/api/v1/apply-voucher`,body, {
      headers: {
        Authorization: `Bearer ${cookie.get("token_auth")}`,
      },
    }
  );
};

