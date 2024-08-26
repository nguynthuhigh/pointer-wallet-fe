import {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
} from "./authSlice";
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
export const loginUser = async (
  user: User,
  dispatch: (action: any) => void,
  navigate: (path: string) => void
): Promise<void> => {
  dispatch(loginStart());
  try {
    const res = await loginAPI(user);
    if (res.status === 200) {
      const { email } = user;
      dispatch(loginSuccess({ ...res.data, email }));
      navigate("/auth/verify-login");
    } else {
      dispatch(loginFailed({ message: res.data.message }));
    }
  } catch (error: unknown) {
    const typedError = error as ErrorResponse;
    const errorMsg = typedError?.response?.data?.message;
    dispatch(loginFailed({ message: errorMsg }));
  }
};
export const registerUser = async (
  user: User,
  dispatch: (action: any) => void,
  navigate: (path: string) => void
): Promise<void> => {
  dispatch(registerStart());
  try {
    const res = await registerAPI(user);
    if (res.status === 200) {
      dispatch(registerSuccess({ ...res.data, ...user }));
      navigate("/auth/verify-register");
    } else {
      dispatch(registerFailed({ message: res.data.message }));
    }
  } catch (error) {
    const typedError = error as ErrorResponse;
    const errorMsg = typedError?.response?.data?.message || "Đăng ký thất bại";
    dispatch(registerFailed({ message: errorMsg }));
  }
};
