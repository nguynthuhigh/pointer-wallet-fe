import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api-presspay.azurewebsites.net', 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
