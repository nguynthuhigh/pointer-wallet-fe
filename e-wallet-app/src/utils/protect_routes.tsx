import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const ProtectRoutes = () => {
  console.log(cookie.get('refresh_token'))
  const token = localStorage.getItem('logged')
  return token ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectRoutes;
