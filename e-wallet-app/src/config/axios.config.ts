

import axios from "axios"
import { useNavigate } from "react-router-dom";

export const createAxios = ()=>{
  const newInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  newInstance.defaults.withCredentials = true
  newInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      async function  (error) {
        const originalRequest = error.config
        if(error.response.status === 401){
          originalRequest._retry = true
          try {
            const response = await newInstance.post(`/api/v1/user/refresh-token`,{
              withCredentials:true
            })
            if(response.status === 200){
                originalRequest.withCredentials=true
                return newInstance(originalRequest)
              }
          } catch (error) {
            const navigate = useNavigate()
            localStorage.removeItem('logged')
            navigate('/auth/login')
          }
        }
        return Promise.reject(error);
      },
    );
    return newInstance
}

// import axios from "axios";
// import Cookies from "universal-cookie";
// import { jwtDecode } from "jwt-decode";
// const cookie = new Cookies();

// export const createAxios = () => {
//   const newInstance = axios.create({
//     baseURL:''
//   });

//   newInstance.interceptors.request.use(
//     async (config) => {
//       let accessToken = await cookie.get("accessToken");
//       if (accessToken) {
//         const decodedToken: any = jwtDecode(accessToken);
//         const currentTime = new Date().getTime() / 1000;
//         if (decodedToken.exp < currentTime) {
//           try {
//             const response = await axios.post(
//               `${import.meta.env.VITE_API_URL}/api/v1/user/refresh-token`,
//               {
//                 withCredentials: true,
//               }
//             );
//             accessToken = response.data.data.accessToken;
//             cookie.set("accessToken", accessToken, {
//               path: "/",
//               maxAge: 15 * 60,
//             });
//             config.headers["Authorization"] = `Bearer ${accessToken}`;
//           } catch (error) {
//             console.error("Failed to refresh token", error);
//           }
//         } else {
//           config.headers["Authorization"] = `Bearer ${accessToken}`;
//         }
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
//   return newInstance;
// };