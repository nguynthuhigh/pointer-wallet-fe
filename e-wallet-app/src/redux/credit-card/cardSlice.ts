import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "../../services/api/credit-card.api";
import { getCardList, addCreditCard, deleteCreditCard } from "./cardThunk";

type CardType = {
  card: Card;
  message: string;
};
type RemoveCardType = {
  _id: string;
  message: string;
};
const initialState = {
  cardState: {
    cards: [] as Card[],
  },
  isFetching: false,
  message: "",
  error: "",
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCardList.pending, (state) => {
      state.isFetching = true;
      state.error = "";
      state.message = "";
    }),
      builder.addCase(
        getCardList.fulfilled,
        (state, action: PayloadAction<Card[]>) => {
          state.isFetching = false;
          state.cardState.cards = action.payload;
          state.message = "";
          state.error = "";
        }
      ),
      builder.addCase(getCardList.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as string;
        state.message = "";
      }),
      builder.addCase(addCreditCard.pending, (state) => {
        state.isFetching = true;
        state.message = "";
        state.error = "";
      }),
      builder.addCase(
        addCreditCard.fulfilled,
        (state, action: PayloadAction<CardType>) => {
          state.isFetching = false;
          state.cardState.cards.push(action.payload.card);
          state.message = action.payload.message;
          state.error = "";
        }
      ),
      builder.addCase(addCreditCard.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as string;
      }),
      builder.addCase(deleteCreditCard.pending, (state) => {
        state.isFetching = true;
        state.error = "";
        state.message = "";
      }),
      builder.addCase(
        deleteCreditCard.fulfilled,
        (state, action: PayloadAction<RemoveCardType>) => {
          state.isFetching = false;
          state.cardState.cards = state.cardState.cards.filter(
            (card) => card._id !== action.payload._id
          );
          state.message = action.payload.message;
          state.error = "";
        }
      ),
      builder.addCase(deleteCreditCard.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMessage } = cardSlice.actions;

export default cardSlice.reducer;
