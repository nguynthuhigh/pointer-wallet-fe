import axiosInstance from "../configs/axios.config";
import Cookies from "universal-cookie";

const cookie = new Cookies();

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
  cookie.set("access_token", res.data.data.token, {
    maxAge: 1000 * 60 * 15,
  });
  return res.data.data.token;
};
const exportObject = {
  signInWithPointer,
};

export default exportObject;
