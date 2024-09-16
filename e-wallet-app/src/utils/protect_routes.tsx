import { Outlet, Navigate } from "react-router-dom";

const ProtectRoutes = () => {
  const logged = localStorage.getItem("logged");
  return logged ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectRoutes;
