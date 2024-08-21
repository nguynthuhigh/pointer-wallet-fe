import { Link, Outlet } from "react-router-dom";
import HeaderDefault from "../../components/header/header_default";
export default function DepositWithdraw() {
  return (
    <div class={`p-4`}>
      <HeaderDefault title="Nạp / Rút" />
      <div>Hello</div>
      <Outlet />
    </div>
  );
}
