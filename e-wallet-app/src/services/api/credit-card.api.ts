import axios from "axios";
import Cookies from "universal-cookie";
const cookie = new Cookies();
const accessToken = cookie.get("access_token");
import axiosConfig from '../../config/axios.config'

interface CardsAPI {
  message: string;
  data: [ListCards];
}
export interface Card {
  _id?: string;
  name: string;
  number: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
  type: string;
}
interface DetailCardAPI {
  message: string;
  data: Card;
}

interface ListCards {
  _id: string;
  number: string;
  type: string;
}
type Item = Omit<Card, "_id">;
export const addCard = async (body: Item) => {
  const response = await axiosConfig.post(
    `/api/v1/card/add-card`,
    body,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response;
};
export const getCards = async () => {
  const response = await axiosConfig.get(
    `/api/v1/card/get-cards
`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response.data;
};
export const getDetailCard = async (id: string) => {
  const response = await axiosConfig.get(
    `/api/v1/card/details/${id}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
};
export const deleteCard = async (id: string) => {
  const response = await axiosConfig.delete(
    `/api/v1/card/delete-card/${id}
  
`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response;
};

export const getAllCards = async (): Promise<Card[] | undefined> => {
  try {
    const cards: CardsAPI = await getCards();
    if (Array.isArray(cards.data) && cards?.data) {
      const listCards: Card[] = await Promise.all(
        cards.data.map(async (item) => {
          const card: DetailCardAPI = await getDetailCard(item._id);
          return {
            ...card.data,
            _id: item._id,
          };
        })
      );
      return listCards;
    }
  } catch (error) {
    console.log(error);
  }
};
