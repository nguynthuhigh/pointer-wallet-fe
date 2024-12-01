import { Navigate, Outlet } from "react-router-dom";
import { useTokenExpired } from "./tokenExpired";

const ProtectedRoute = () => {
    const expiredToken = useTokenExpired();
    return expiredToken ? (<Navigate to= '/login' />) : (<Outlet/>)
}
export default ProtectedRoute