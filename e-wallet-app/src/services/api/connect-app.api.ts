import { createAxios } from "../../config/axios.config";
interface BodyType {
  partnerId: string;
  userId: string;
  security_code: string;
}

export async function getPartnerWallet({ partnerId }: { partnerId: string }) {
  const axiosInstance = createAxios();
  const response = await axiosInstance.get(`/api/v1/partner/${partnerId}`);
  return response.data;
}

export const connectWallet = async (body: BodyType) => {
  const axiosInstance = createAxios();
  return await axiosInstance.post("/api/v1/connect-wallet", {
    partnerID: body.partnerId,
    security_code: body.security_code,
    userID: body.userId,
  })
};
