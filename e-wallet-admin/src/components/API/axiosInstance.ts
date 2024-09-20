import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api-presspay.azurewebsites.net/api/v1/user/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
