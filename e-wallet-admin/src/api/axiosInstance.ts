import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    Authorization: "Bearer " +  cookies.get('token'),
    "Content-Type": 'application/json'
  }
});

export default axiosInstance;
