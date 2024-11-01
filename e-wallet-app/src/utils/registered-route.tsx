import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export default function RegisteredRoute() {
  // const { security_code } = useAppSelector(
  //   (state) => state.user.userState?.userData
  // );

  // return security_code ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to={"/auth/register/security-code"} />
  // );
  return <Outlet />;
}
