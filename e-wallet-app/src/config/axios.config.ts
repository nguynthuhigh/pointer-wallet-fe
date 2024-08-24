// import axios from "axios"
// import { useNavigate } from "react-router-dom";
// const axiosConfig = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
// axiosConfig.defaults.withCredentials = true
// axiosConfig.interceptors.response.use(
//     function (response) {
//       //store last request
//       localStorage.setItem('last_access',Date.now().toString())
//       return response;
//     },
//     async function  (error) {
//       const originalRequest = error.config
//       if(error.response.status === 401){
//         //expire access token
//         // check last request > 15m
//         const lastTimeAccess = localStorage.getItem('last_access') || Date.now()
//         if(Date.now() - Number(lastTimeAccess) > 60*15*1000){
//           //require providing a security code to refresh token
//           //using redux
//         }
//         originalRequest._retry = true
//         try {
//           const response = await axiosConfig.post(`${import.meta.env.VITE_API_URL}/api/v1/user/refresh-token`,{
//             withCredentials:true
//           })
//           if(response.status === 200){
//               originalRequest.headers['Authorization'] = 'Bearer ' + response.data.data.accessToken
//               return axiosConfig(originalRequest)
//             }
//         } catch (error) {
//           const navigate = useNavigate()
//           localStorage.removeItem('logged')
//           navigate('/auth/login')
//         }
//       }
//       return Promise.reject(error);
//     },
//   );

// export default axiosConfig
