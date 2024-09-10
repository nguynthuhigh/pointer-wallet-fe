import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileAPI } from "../../services/api/user.api";
import { UserProfileState } from "./userSlice";
interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}
export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProfileAPI();
      if (res.status === 200) {
        const data = res.data.data;
        const userProfile: UserProfileState = {
          userData: {
            _id: data.userData._id,
            avatar: data.userData.avatar || "",
            email: data.userData.email,
            inactive: data.userData.inactive,
            full_name: data.userData.full_name,
          },
          walletData: {
            _id: data.walletData._id,
            address: data.walletData.address,
            balance: data.walletData.balance,
            userID: data.walletData.userID,
            partnerID: data.walletData.partnerID,
            currencies: data.walletData.currencies.map((currency: any) => ({
              balance: currency.balance,
              currency: {
                symbol: currency.currency.symbol,
              },
              _id: currency._id,
            })),
          },
        };

        return userProfile;
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error: unknown) {
      const typedError = error as ErrorResponse;
      const errorMsg =
        typedError?.response?.data?.message || "Failed to fetch profile";
      return rejectWithValue(errorMsg);
    }
  }
);
