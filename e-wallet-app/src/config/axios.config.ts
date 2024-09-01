import axios from "axios";

export const createAxios = () => {
  const newInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
  newInstance.defaults.withCredentials = true;
  newInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      if (error.response.status === 401) {
        originalRequest._retry = true;
        try {
          const response = await newInstance.post(
            `/api/v1/user/refresh-token`,
            {
              withCredentials: true,
            }
          );
          if (response.status === 200) {
            originalRequest.withCredentials = true;
            return newInstance(originalRequest);
          }
        } catch (error) {
          localStorage.removeItem("logged");
        }
      }
      return Promise.reject(error);
    }
  );
  return newInstance;
};
