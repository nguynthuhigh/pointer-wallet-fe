import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LogoPressPay from "../../assets/svg/logo_presspay.svg";
import { Link } from "react-router-dom";
export default function Header() {
  const user = useSelector(
    (state: RootState) => state.user.userState.userData
  );
  return (
    <div>
      <div
        class={`h-20 w-full flex fixed top-0 left-0 right-0 z-50 bg-white p-4 items-center shadow-sm`}
      >
        <Link to="/">
          <img class={`w-40`} src={LogoPressPay} />
        </Link>
        <div class={`ml-auto`}>
          <img class={`w-14 h-14 object-cover rounded-full`} src={user.avatar}></img>
        </div>
      </div>
      <div class={`h-20`}></div>
    </div>
  );
}
