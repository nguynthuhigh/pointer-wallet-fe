import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "../../services/api/credit-card.api";
import { getCardList, addCreditCard } from "./cardThunk";
const initialState = {
  cardState: {
    cards: [] as Card[],
  },
  isFetching: false,
  error: "",
};
const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCardList.pending, (state) => {
      state.isFetching = true;
      state.error = "";
    }),
      builder.addCase(
        getCardList.fulfilled,
        (state, action: PayloadAction<Card[]>) => {
          state.isFetching = false;
          state.cardState.cards = action.payload;
          state.error = "";
        }
      ),
      builder.addCase(getCardList.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as string;
      }),
      builder.addCase(addCreditCard.pending, (state) => {
        state.isFetching = true;
        state.error = "";
      }),
      builder.addCase(
        addCreditCard.fulfilled,
        (state, action: PayloadAction<Card>) => {
          state.isFetching = false;
          state.cardState.cards.push(action.payload);
          state.error = "";
        }
      ),
      builder.addCase(addCreditCard.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as string;
      });
  },
});
export default cardSlice.reducer;
