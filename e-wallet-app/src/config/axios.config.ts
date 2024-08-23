import axios from "axios"
import Cookies from "universal-cookie";
const cookie = new Cookies()

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

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
        const lastTimeAccess =localStorage.getItem('last_access')
        if(Date.now() - Number(lastTimeAccess) > 60*15*1000){
          //require providing a security code to refresh token
          console.log('using redux')
        }
        originalRequest._retry = true
        const response = await axiosConfig.post(`${import.meta.env.VITE_API_URL}/api/v1/user/refresh-token`,{
          refreshToken:cookie.get('refresh_token')
        })
        if(response.status === 200){
          cookie.set('refresh_token',response.data.data.refreshToken)
          cookie.set('token_auth',response.data.data.accessToken)
          originalRequest.headers['Authorization'] = 'Bearer ' + response.data.data.accessToken
          return axiosConfig(originalRequest)
        }
        else{
          //redirect to login
        }
      }
      return Promise.reject(error);
    },
  );

export default axiosConfig