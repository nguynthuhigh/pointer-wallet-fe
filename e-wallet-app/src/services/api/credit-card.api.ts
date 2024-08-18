import axios from "axios";
import Cookies from "universal-cookie";
const cookie = new Cookies();
const accessToken = cookie.get("token_auth");
import { Card } from "../../types/transfer";
export const addCard = async (body: Card) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/card/addcard`,
    body,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response;
};
export const getCards = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/card/getcards
`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response;
};
export const getDetailCard = async (id: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/card/details/${id}`
  );
  return response;
};
export const deleteCard = async (id: string) => {
  const response = await axios.delete(`${
    import.meta.env.VITE_API_URL
  }/api/v1/card/deletecard/${id}
`);
  return response;
};
