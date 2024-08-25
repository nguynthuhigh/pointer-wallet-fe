import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface UserState {
  email: string;
  password: string;
  message: string;
}
type User = Omit<UserState, "password">;
const authSlice = createSlice({
  name: "auth",
  initialState: {
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
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.login.loginUser.email = action.payload.email;
      state.login.isFetching = false;
      state.login.error = "";
      state.login.loginUser.message = action.payload.message;
    },
    loginFailed: (state, action: PayloadAction<{ message: string }>) => {
      state.login.isFetching = false;
      state.login.error = action.payload.message;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state, action: PayloadAction<UserState>) => {
      state.register.isFetching = false;
      state.register.registerUser = action.payload;
      state.register.error = "";
      state.register.registerUser.message = action.payload.message;
    },
    registerFailed: (state, action: PayloadAction<{ message: string }>) => {
      state.register.isFetching = false;
      state.register.error = action.payload.message;
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
} = authSlice.actions;
export default authSlice.reducer;
