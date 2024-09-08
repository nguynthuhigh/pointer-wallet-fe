import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProfile } from "./userThunk";
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
  currencies: Currencies[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Currencies {
  balance: number;
  currency: {
    symbol:string
  };
  _id: string;
}

export interface ErrorPayload {
  message: string;
}

const initialState = {
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
      currencies: [{ balance: 0, currency: {
        symbol:''
      }, _id: "" }],
      createdAt: "",
      updatedAt: "",
      __v: 0,
    },
  } as UserProfileState,
  isFetching: false,
  error: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.isFetching = true;
      state.error = "";
    });
    builder.addCase(
      getProfile.fulfilled,
      (state, action: PayloadAction<UserProfileState>) => {
        state.isFetching = false;
        state.userState = action.payload;
      }
    );
    builder.addCase(getProfile.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload as string;
    });
  },
});

export default userSlice.reducer;
