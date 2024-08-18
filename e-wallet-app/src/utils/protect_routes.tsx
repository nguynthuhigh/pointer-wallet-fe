import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const ProtectRoutes = () => {
  const token = cookie.get("token_auth");
  return token ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectRoutes;
