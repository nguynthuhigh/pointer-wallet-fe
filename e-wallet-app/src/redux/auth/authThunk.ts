import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

export const loginUsers = createAsyncThunk(
  "auth/loginUser",
  async (
    { user, navigate }: { user: User; navigate: (path: string) => void },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/signin`,
        user
      );
      if (res.status === 200) {
        navigate("/auth/login/verify-login");
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

export const registerUsers = createAsyncThunk(
  "auth/registerUser",
  async (
    { user, navigate }: { user: User; navigate: (path: string) => void },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/signup`,
        user
      );
      if (res.status === 200) {
        navigate("/auth/register/verify-register");
        return { ...res.data, ...user };
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
