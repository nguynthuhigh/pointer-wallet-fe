import logo_white from "../../assets/svg/logo_white.svg";
import arrow_right from "../../assets/svg/arrow_right.svg";
import { Link } from "react-router-dom";
import Pointer from '../../assets/images/logo.png'
const Button = ({ ...props }) => {
  return (
    <Link className="ml-auto" to={props.link}>
      <div className="w-[100px] border-[1px] border-white  h-[30px] justify-center text-[12px]  rounded-full items-center flex   bg-white text-color-default font-semibold">
        <h1>{props.name}</h1>
        <img alt="" className="w-[4px] h-[7px] ml-2" src={arrow_right}></img>
      </div>
    </Link>
  );
};

export default function Home({ ...props }) {
  return (
    <div
      className={`w-full fixed z-10 py-4 ${
        !props.color ? "" : "bg-color-default"
      }`}
    >
      <div className="flex items-center px-4 max-w-[1250px] mx-auto">
        <Link to="/">
          <img alt="logo_pressPay" src={Pointer} className='size-[70px]'></img>
        </Link>
        <div className="max-md:hidden flex ml-10 space-x-[40px] justify-between text-[20px] font-semibold text-white">
          <Link to="/docs">Documents</Link>
          <a href='https://wallet.pointer.io.vn' target='_blank' rel ='noreferrer'>Pointer Wallet</a>
        </div>
        <Button name={"Sign-in"} link={"/sign-in"}></Button>
      </div>
    </div>
  );
}
