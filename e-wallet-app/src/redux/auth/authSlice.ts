import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUsers, registerUsers } from "./authThunk";

export interface UserState {
  email: string;
  password: string;
  message: string;
}

type User = Omit<UserState, "password">;

export interface AuthState {
  login: {
    loginUser: User;
    isFetching: boolean;
    error: string;
  };
  register: {
    registerUser: UserState;
    isFetching: boolean;
    error: string;
  };
  accessToken: string;
}

const initialState: AuthState = {
  login: {
    loginUser: {
      email: "",
      message: "",
    },
    isFetching: false,
    error: "",
  },
  register: {
    registerUser: {
      email: "",
      password: "",
      message: "",
    },
    isFetching: false,
    error: "",
  },
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessage: (state, action: PayloadAction<"login" | "register">) => {
      if (action.payload === "login") {
        state.login.loginUser.message = "";
      } else if (action.payload === "register") {
        state.register.registerUser.message = "";
      }
    },
    clearError: (state, action: PayloadAction<"login" | "register">) => {
      if (action.payload === "login") {
        state.login.error = "";
      } else if (action.payload === "register") {
        state.register.error = "";
      }
    },
    addAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    removeAccessToken: (state) => {
      state.accessToken = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUsers.pending, (state) => {
      state.login.isFetching = true;
      state.login.error = "";
    });
    builder.addCase(
      loginUsers.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.login.loginUser.email = action.payload.email;
        state.login.loginUser.message = action.payload.message;
        state.login.isFetching = false;
        state.login.error = "";
      }
    );
    builder.addCase(loginUsers.rejected, (state, action) => {
      state.login.isFetching = false;
      state.login.error = action.payload
        ? (action.payload as string)
        : action.error.message || "Có lỗi xảy ra!";
    });

    builder.addCase(registerUsers.pending, (state) => {
      state.register.isFetching = true;
      state.register.error = "";
    });
    builder.addCase(
      registerUsers.fulfilled,
      (state, action: PayloadAction<UserState>) => {
        state.register.registerUser.email = action.payload.email;
        state.register.registerUser.password = action.payload.password;
        state.register.registerUser.message = action.payload.message;
        state.register.isFetching = false;
        state.register.error = "";
      }
    );
    builder.addCase(registerUsers.rejected, (state, action) => {
      state.register.isFetching = false;
      state.register.error = action.payload
        ? (action.payload as string)
        : action.error.message || "Có lỗi xảy ra!";
    });
  },
});

export const { clearMessage, clearError, addAccessToken, removeAccessToken } =
  authSlice.actions;
export default authSlice.reducer;
