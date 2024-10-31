import { Outlet, Navigate } from "react-router-dom";
import { getCookie } from "./cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";

const ProtectRoutes = async () => {
  const token = await getCookie("at");
  if (!token) {
    return <Navigate to="/auth/login" />;
  }
  const decoded = jwtDecode<JwtPayload>(token);
  const currentTime = Math.floor(Date.now() / 1000);
  const isTokenExpired = decoded.exp ? decoded.exp < currentTime : true;
  return isTokenExpired ? <Navigate to="/auth/login" /> : <Outlet />;
};

export default ProtectRoutes;
