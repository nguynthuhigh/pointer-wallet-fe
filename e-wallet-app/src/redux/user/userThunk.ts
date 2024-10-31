import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileAPI } from "../../services/api/auth.api";

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    const res = await getProfileAPI();
    if (res.status === 200) {
      const data = res.data.data;
      return {
        userData: data.userData,
        walletData: data.walletData,
      };
    } else {
      return rejectWithValue(res.data.message || "Failed to get profile");
    }
  }
);
