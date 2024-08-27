import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authThunk";

export interface UserState {
  email: string;
  password: string;
  message: string;
}

type User = Omit<UserState, "password">;

const initialState = {
  login: {
    loginUser: {
      email: "",
      message: "",
    } as User,
    isFetching: false,
    error: "",
  },
  register: {
    registerUser: {
      email: "",
      password: "",
      message: "",
    } as UserState,
    isFetching: false,
    error: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.login.isFetching = true;
      state.login.error = "";
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.login.loginUser.email = action.payload.email;
        state.login.loginUser.message = action.payload.message;
        state.login.isFetching = false;
        state.login.error = "";
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.login.isFetching = false;
      state.login.error = action.payload as string;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.register.isFetching = true;
      state.register.error = "";
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<UserState>) => {
        state.register.registerUser.email = action.payload.email;
        state.register.registerUser.password = action.payload.password;
        state.register.registerUser.message = action.payload.message;
        state.register.isFetching = false;
        state.register.error = "";
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      state.register.isFetching = false;
      state.register.error = action.payload as string;
    });
  },
});

export default authSlice.reducer;
