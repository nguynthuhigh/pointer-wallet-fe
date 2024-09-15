import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const getWithExpiry = (key: string) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export default function RegisteredRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const registered = getWithExpiry("registered");
    if (registered) {
      navigate("/auth/register/security-code");
    }
  }, [navigate]);

  return <Outlet />;
}
