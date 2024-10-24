import axiosInstance from "../configs/axios.config";
import { setToken } from "../utils/cookie";

const signInWithPointer = async (code) => {
  const res = await axiosInstance.post(
    process.env.REACT_APP_API + "/api/v1/partner/sign-in-with-pointer",
    {
      code,
    },
    {
      withCredentials: true,
    }
  );
  setToken(res.data.data.token);
  return res.data.data.token;
};
const exportObject = {
  signInWithPointer,
};

export default exportObject;
