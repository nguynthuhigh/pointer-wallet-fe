import axios from "axios"
const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
});
axiosConfig.defaults.withCredentials = true
axios.defaults.withCredentials = true
axiosConfig.interceptors.response.use(
    function (response) {
      return response;
    },
    async function  (error) {
      const originalRequest = error.config
      if(error.response.status === 401){
        originalRequest._retry = true
        try {
          const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/partner/refresh-token`,{
            withCredentials:true
          })
          if(response.status === 200){
              return axiosConfig(originalRequest,{withCredentials:true})
          }
        } catch (error) {
          window.location.href = '/sign-in'
        }
      }
      return Promise.reject(error);
    },
  );

export default axiosConfig