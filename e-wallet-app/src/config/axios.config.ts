import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
const cookie = new Cookies();

export const createAxios = () => {
  const newInstance = axios.create();

  newInstance.interceptors.request.use(
    async (config) => {
      let accessToken = await cookie.get("accessToken");
      if (accessToken) {
        const decodedToken: any = jwtDecode(accessToken);
        const currentTime = new Date().getTime() / 1000;

        if (decodedToken.exp < currentTime) {
          try {
            const response = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/v1/user/refresh-token`,
              {
                withCredentials: true,
              }
            );
            accessToken = response.data.data.accessToken;
            cookie.set("accessToken", accessToken, {
              path: "/",
              maxAge: 60 * 60 * 24 * 15,
            });
            config.headers["Authorization"] = `Bearer ${accessToken}`;
          } catch (error) {
            console.error("Failed to refresh token", error);
          }
        } else {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return newInstance;
};
