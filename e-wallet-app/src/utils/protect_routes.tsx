import { Outlet, Navigate } from "react-router-dom";
import Cookie from "universal-cookie";
const cookie = new Cookie();
const ProtectRoutes: React.FC = () => {
  const token = cookie.get("at");
  return !token ? <Navigate to="/auth/login" /> : <Outlet />;
};

export default ProtectRoutes;
