import { Outlet, Navigate } from "react-router-dom";
import { useTokenExpired } from "./expired-token";

const ProtectRoutes = () => {
  const expiredToken = useTokenExpired();
  return expiredToken ? <Navigate to="/auth/login" /> : <Outlet />;
};

export default ProtectRoutes;
