import axios from "axios";
import Cookies from "universal-cookie";
import axiosInstance from "../configs/axios.config";
const cookie = new Cookies();
export const addWebhook = async (body) => {
  console.log(body);
  return await axiosInstance.post(
    process.env.REACT_APP_API + "/api/v1/webhook/add-endpoint",
    body
  );
};
export const deleteWebhook = async () => {
  return await axiosInstance.delete(
    process.env.REACT_APP_API + "/api/v1/webhook/delete-endpoint"
  );
};
const exportObject = {
  addWebhook,
  deleteWebhook,
};
export default exportObject;
