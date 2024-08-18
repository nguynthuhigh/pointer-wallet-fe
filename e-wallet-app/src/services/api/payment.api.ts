import axios from "axios";
import Cookies from "universal-cookie";
import { ApplyVoucher } from "../../types/payment";
const cookie = new Cookies();
export const paymentAPI = async (token: unknown) => {
  return await axios.get(
    import.meta.env.VITE_API_URL + "/payment-gateway?token=" + token
  );
};

export const confirmPaymentAPI = async (body: unknown) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/confirm-payment`,
    body,
    {
      headers: {
        Authorization: `Bearer ${cookie.get("token_auth")}`,
      },
    }
  );
};
export const getVouchersPartner = async (id:string) => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/voucher/get-vouchers-partner?partnerID=${id}`
  );
};

export const applyVoucher = async (body:ApplyVoucher) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/apply-voucher`,body, {
      headers: {
        Authorization: `Bearer ${cookie.get("token_auth")}`,
      },
    }
  );
};

