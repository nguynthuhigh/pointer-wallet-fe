import axios from 'axios';
// https://api-presspay.azurewebsites.net
const axiosInstance = axios.create({
  baseURL: ' http://localhost:8888', 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
