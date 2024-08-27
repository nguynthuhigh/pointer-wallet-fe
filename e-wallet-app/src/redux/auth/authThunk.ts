import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registerAPI } from "../../services/api/auth.api";

interface User {
  email: string;
  password: string;
}

interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { user, navigate }: { user: User; navigate: (path: string) => void },
    { rejectWithValue }
  ) => {
    try {
      const res = await loginAPI(user);
      if (res.status === 200) {
        navigate("/auth/verify-login");
        const { email } = user;
        return { ...res.data, email };
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      const typedError = error as ErrorResponse;
      const errorMsg =
        typedError?.response?.data?.message || "Đăng nhập thất bại!";
      return rejectWithValue(errorMsg);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { user, navigate }: { user: User; navigate: (path: string) => void },
    { rejectWithValue }
  ) => {
    try {
      const res = await registerAPI(user);
      if (res.status === 200) {
        navigate("/auth/verify-register");
        return { ...res.data, user };
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      const typedError = error as ErrorResponse;
      const errorMsg =
        typedError?.response?.data?.message || "Đăng ký thất bại";
      return rejectWithValue(errorMsg);
    }
  }
);
