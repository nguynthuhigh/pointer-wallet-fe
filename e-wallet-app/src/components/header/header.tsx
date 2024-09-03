import LogoPressPay from "../../assets/svg/logo_presspay.svg";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div>
      <div class={`h-20 w-full flex fixed bg-white p-4 items-center shadow-sm`}>
        <Link to="/">
          <img class={`w-40`} src={LogoPressPay} />
        </Link>
        <h1 class={`ml-auto`}>note: Drawer</h1>
      </div>
      <div class={`h-20`}></div>
    </div>
  );
}
