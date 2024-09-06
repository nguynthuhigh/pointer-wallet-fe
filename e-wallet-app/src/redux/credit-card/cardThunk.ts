import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCards } from "../../services/api/credit-card.api";
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
