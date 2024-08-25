import { userStart, userSuccess, userFailed } from "./userSlice";
import { getProfileAPI } from "../../services/api/user.api";
interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}
export const getProfile = async (
  dispatch: (action: any) => void
): Promise<void> => {
  dispatch(userStart());
  try {
    const res = await getProfileAPI();
    if (res.status === 200) {
      dispatch(userSuccess(res.data.data));
    } else {
      dispatch(userFailed({ message: res.data.message }));
    }
  } catch (error: unknown) {
    const typedError = error as ErrorResponse;
    const errorMsg = typedError?.response?.data?.message;
    dispatch(userFailed({ message: errorMsg }));
  }
};
