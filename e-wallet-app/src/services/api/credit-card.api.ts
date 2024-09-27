import { createAxios } from "../../config/axios.config";
const axiosInstance = createAxios();

export interface Card {
  name: string;
  number: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
  type: string;
  _id?: string;
}

export type Item = Omit<Card, "_id">;
export const addCard = async (body: Item) => {
  const response = await axiosInstance.post(`/api/v1/card/add-card`, body, {
    withCredentials: true,
  });
  return response;
};
export const getCards = async () => {
  const response = await axiosInstance.get(
    `/api/v1/card/get-cards
`,
    {
      withCredentials: true,
    }
  );
  return response.data.data;
};

export const deleteCard = async (_id: string) => {
  const response = await axiosInstance.delete(
    `/api/v1/card/delete-card/${_id}
  
`,
    { withCredentials: true }
  );
  return response;
};
