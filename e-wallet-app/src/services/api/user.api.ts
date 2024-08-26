import Cookies from "universal-cookie";
import  { createAxios } from '../../config/axios.config'
const axiosInstance = createAxios();
export const getProfileAPI = async()=>{
    return axiosInstance.get('/api/v1/user/profile',{
        withCredentials:true
    })
}
// import Cookies from "universal-cookie";
// const cookie = new Cookies();
// const accessToken = cookie.get("accessToken");
// import { createAxios } from "../../config/axios.config";
// const axiosInstance = createAxios();
// export const getProfileAPI = async () => {
//   const response = await axiosInstance.get(
//     `${import.meta.env.VITE_API_URL}/api/v1/user/profile`,
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );
//   return response;
// };
