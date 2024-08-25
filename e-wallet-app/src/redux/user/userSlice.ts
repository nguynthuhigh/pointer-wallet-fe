import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface UserProfileState {
  userData: UserData;
  walletData: WalletData;
}
interface UserData {
  _id: string;
  avatar: "" | string;
  email: string;
  password: string;
  inactive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  security_code: string;
  full_name: string;
}
interface WalletData {
  _id: string;
  address: string;
  mnemonic: string;
  balance: number;
  userID: string;
  partnerID: null | string;
  currencies: [Currencies];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface Currencies {
  balance: number;
  currency: string;
  _id: string;
}
const userSlice = createSlice({
  name: "user",
  initialState: {
    userState: {
      userData: {
        _id: "",
        avatar: "",
        email: "",
        password: "",
        createdAt: "",
        updatedAt: "",
        __v: 0,
        security_code: "",
        inactive: false,
        full_name: "",
      },

      walletData: {
        _id: "",
        address: "",
        mnemonic: "",
        balance: 0,
        userID: "",
        partnerID: null,
        currencies: [{ balance: 0, currency: "", _id: "" }],
        createdAt: "",
        updatedAt: "",
        __v: 0,
      },
    } as UserProfileState,
    isFetching: false,
    error: "",
  },
  reducers: {
    userStart: (state) => {
      state.isFetching = true;
    },
    userSuccess: (state, action: PayloadAction<UserProfileState>) => {
      state.isFetching = false;
      state.userState = action.payload;
    },
    userFailed: (state, action: PayloadAction<{ message: string }>) => {
      state.isFetching = false;
      state.error = action.payload.message;
    },
  },
});
export const { userStart, userSuccess, userFailed } = userSlice.actions;
export default userSlice.reducer;
