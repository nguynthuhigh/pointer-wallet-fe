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
  inactive: boolean;
  full_name: string;
}

interface WalletData {
  _id: string;
  address: string;
  balance: number;
  userID: string;
  partnerID: null | string;
  currencies: Currencies[];
}

interface Currencies {
  balance: number;
  currency: {
    symbol: string;
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
      inactive: false,
      full_name: "",
    },
    walletData: {
      _id: "",
      balance: 0,
      address:"",
      userID: "",
      partnerID: null,
      currencies: [
        {
          balance: 0,
          currency: {
            symbol: "",
          },
          _id: "",
        },
      ],
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
