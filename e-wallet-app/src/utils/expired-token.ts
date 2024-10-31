import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { RootState } from "../redux/store";

interface JwtPayload {
  exp: number;
}

export const useTokenExpired = (): boolean => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  if (!accessToken) {
    return true;
  }
  const { exp } = jwtDecode<JwtPayload>(accessToken);
  const currentTime = Math.floor(Date.now() / 1000);
  return exp < currentTime;
};
