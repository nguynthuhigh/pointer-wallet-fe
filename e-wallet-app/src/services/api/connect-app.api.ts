import { createAxios } from "../../config/axios.config";
interface BodyType {
  partnerId: string;
  userId: string;
  security_code: string;
}

export const getPartnerWallet = async ({partnerId} : {partnerId: string}) => {
  const axiosInstance = createAxios();
  const response =  await axiosInstance.get(`/api/v1/partner/${partnerId}`)
  return response.data.data;
}

export const connectWallet = async (body: BodyType) => {
  const axiosInstance = createAxios();
  return await axiosInstance.post("/api/v1/connect-wallet", {
    partnerID: body.partnerId,
    security_code: body.security_code,
    userID: body.userId,
  })
};

export async function getConnectedAppWallet() {
  const axiosInstance = createAxios();
  const response = await axiosInstance.get(`/api/v1/connected-app`);
  return response.data.data
}

export const disconnectWallet = async ({partnerId} : {partnerId:string}) => {
    const axiosInstance = createAxios();
    const response = await axiosInstance.delete(`/api/v1/disconnect-wallet/${partnerId}`)
    return response.data
}