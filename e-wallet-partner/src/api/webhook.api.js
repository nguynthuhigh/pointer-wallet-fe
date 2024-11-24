import axios from "axios";
import Cookies from "universal-cookie";
import axiosInstance from "../configs/axios.config";
const cookie = new Cookies();
const REACT_APP_API = 'https://api-presspay.azurewebsites.net/';
export const addWebhook = async (body) => {
  console.log(body);
   const response = await axiosInstance.post(
    process.env.REACT_APP_API + "/api/v1/webhook/add-endpoint",
    body
  )
  return response;
};
export const deleteWebhook = async (id) => {
  return await axiosInstance.delete(
    process.env.REACT_APP_API + `/api/v1/webhook/delete-endpoint/${id}`
  );
};

export const getWebHook = async () => {
  const response = await axiosInstance.get(`${REACT_APP_API}/api/v1/webhook`)
  return response.data
}

const exportObject = {
  addWebhook,
  deleteWebhook,
};
export default exportObject;
