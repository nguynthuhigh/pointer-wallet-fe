import { Outlet, Navigate } from "react-router-dom";

const ProtectRoutes = () => {
  const token = localStorage.getItem("logged");
  return token ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectRoutes;
