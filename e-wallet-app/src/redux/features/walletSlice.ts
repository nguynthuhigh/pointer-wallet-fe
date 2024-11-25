import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IWallet {
  isUpdated: boolean;
}

const initialState: IWallet = {
  isUpdated: false,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletUpdated: (state, action: PayloadAction<boolean>) => {
      state.isUpdated = action.payload;
    },
  },
});
export const { setWalletUpdated } = walletSlice.actions;
export default walletSlice.reducer;
