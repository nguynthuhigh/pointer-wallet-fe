import cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface JwtPayLoad {
  exp: number;
}

export const useTokenExpired = () => {
  const accessToken = cookies.get("token");
  if (!accessToken) {
    return false;
  }

  const decodeToken = jwtDecode<JwtPayLoad>(accessToken);
  const currentTime = Math.floor(Date.now() / 1000);
  return decodeToken.exp < currentTime;
};
