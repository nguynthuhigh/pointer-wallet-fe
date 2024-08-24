import { loginStart, loginSuccess, loginFailed } from "./authSlice";
import { loginAPI } from "../../services/api/auth.api";
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
    dispatch(loginSuccess({...res.data, user}));
    navigate("/auth/verify-login");
  } catch (error: unknown) {
    const typedError = error as ErrorResponse;
    const errorMsg = typedError?.response?.data?.message;
    dispatch(loginFailed({ message: errorMsg }));
  }
};
