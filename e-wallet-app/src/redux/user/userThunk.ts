import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileAPI } from "../../services/api/user.api";
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
        return {
          userData: data.userData,
          walletData: data.walletData,
        };
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error: unknown) {
      console.error("API Error:", error);
      const typedError = error as ErrorResponse;
      const errorMsg =
        typedError?.response?.data?.message || "Failed to fetch profile";
      return rejectWithValue(errorMsg);
    }
  }
);
