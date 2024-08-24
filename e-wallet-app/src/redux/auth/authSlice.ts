import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface UserState {
  user: {
    email: string;
    password: string;
  };
  message: string;
  data: null;
}
const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: {
        user: {
          email: "",
          password: "",
        },
        message: "",
        data: null,
      } as UserState,
      isFetching: false,
      error: "",
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<UserState>) => {
      state.login.isFetching = false;
      state.login.currentUser.user = action.payload.user;
      state.login.error = "";
      state.login.currentUser.message = action.payload.message;
    },
    loginFailed: (state, action: PayloadAction<{ message: string }>) => {
      state.login.isFetching = false;
      state.login.error = action.payload.message;
    },
  },
});
export const { loginStart, loginSuccess, loginFailed } = authSlice.actions;
export default authSlice.reducer;
