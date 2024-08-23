import axios from "axios"
import Cookies from "universal-cookie";
const cookie = new Cookies()
import { useNavigate } from "react-router-dom";
const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosConfig.defaults.withCredentials = true
axiosConfig.interceptors.response.use(
    function (response) {
      //store last request
      localStorage.setItem('last_access',Date.now().toString())
      return response;
    },
    async function  (error) {
      const originalRequest = error.config
      if(error.response.status === 401){
        //expire access token
        // check last request > 15m
        const lastTimeAccess = localStorage.getItem('last_access') || Date.now()
        if(Date.now() - Number(lastTimeAccess) > 60*15*1000){
          //require providing a security code to refresh token
          //using redux
          console.log('')
        }
        originalRequest._retry = true
        const response = await axiosConfig.post(`${import.meta.env.VITE_API_URL}/api/v1/user/refresh-token`,{
          withCredentials:true
        })
        if(response.status === 200){
          cookie.set('refresh_token',response.data.data.refreshToken,
            {
              httpOnly:true,
              path: "/",
              secure:true,
              sameSite:'none'
            }
          )
          cookie.set('access_token',response.data.data.accessToken,
            {
              httpOnly:true,
              path: "/",
              secure:true,
              sameSite:'none'
            }
          )
          originalRequest.headers['Authorization'] = 'Bearer ' + response.data.data.accessToken
          return axiosConfig(originalRequest)
        }
        const navigate = useNavigate()
        navigate('/auth/login')
        //redirect to login
      }
      return Promise.reject(error);
    },
  );

export default axiosConfig