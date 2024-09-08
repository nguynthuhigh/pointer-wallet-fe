import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCards, addCard } from "../../services/api/credit-card.api";
import { Item as CardType } from "../../services/api/credit-card.api";
interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}
export const getCardList = createAsyncThunk(
  "card/getCardList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllCards();
      if (Array.isArray(res) && res.length > 0) {
        return res;
      } else {
        return [];
      }
    } catch (error: unknown) {
      const typedError = error as ErrorResponse;
      const errorMsg = typedError?.response?.data?.message;
      return rejectWithValue(errorMsg);
    }
  }
);
export const addCreditCard = createAsyncThunk(
  "card/addCard",
  async (Card: CardType, { rejectWithValue }) => {
    try {
      const res = await addCard(Card);
      if (res.status === 200) {
        return { ...Card };
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error: unknown) {
      const typedError = error as ErrorResponse;
      const errorMsg = typedError?.response?.data?.message;
      return rejectWithValue(errorMsg);
    }
  }
);
