import axiosInstance from "../configs/axios.config";
import Cookies from "universal-cookie";
const cookie = new Cookies();
export const getProfilePartner = async () => {
  return await axiosInstance.get(
    process.env.REACT_APP_API + "/api/v1/partner/dashboard",
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie.get("access_token"),
      },
    }
  );
};
export const updateProfilePartner = async (body) => {
  return await axiosInstance.post(
    process.env.REACT_APP_API + "/api/v1/partner/edit-profile",
    body,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
export const getTransactions = async (page, pagesize) => {
  return await axiosInstance.get(
    process.env.REACT_APP_API +
      "/api/v1/partner/get-transactions?page=" +
      page +
      "&pagesize=" +
      pagesize,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie.get("access_token"),
      },
    }
  );
};
export const getVouchers = async () => {
  return await axiosInstance.get(
    process.env.REACT_APP_API + `/api/v1/voucher/get-vouchers`,
    {
      withCredentials: true,
    }
  );
};
const exportObject = {
  getProfilePartner,
  updateProfilePartner,
  getTransactions,
  getVouchers,
};
export default exportObject;
