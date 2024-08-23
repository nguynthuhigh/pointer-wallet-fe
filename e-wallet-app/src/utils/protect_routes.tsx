import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const ProtectRoutes = () => {
  console.log(cookie.get('access_token'))
  const token = '123'
  return token ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectRoutes;
