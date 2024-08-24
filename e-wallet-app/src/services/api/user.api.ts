// import Cookies from "universal-cookie";
// import axiosConfig from '../../config/axios.config'
// const cookie = new Cookies()
// export const getProfileAPI = async()=>{
//     return axiosConfig.get('/api/v1/user/profile',{
//         withCredentials:true
//     })
// }
import Cookies from "universal-cookie";
const cookie = new Cookies();
const accessToken = cookie.get("access_token");
import axios from "axios";
export const getProfileAPI = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/user/profile`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};
