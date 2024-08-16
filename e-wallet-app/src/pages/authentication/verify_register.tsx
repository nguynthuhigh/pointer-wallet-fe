import Cookies from "universal-cookie";
const cookie = new Cookies();
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "preact/hooks";
import OTPInput from "react-otp-input";
import toast, { Toaster } from "react-hot-toast";
import LoadingIcon from "../../assets/svg/loading.svg";
import { verifyRegisterAPI } from "../../services/api/auth.api";
import AuthImg from "../../assets/png/auth_img.png";

export default function VerifyRegister() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleChangeOTP = async (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      setIsLoading(true);
      try {
        console.log({
          email: location.state.email,
          otp: value,
        });
        const response = await verifyRegisterAPI({
          email: location.state.email,
          otp: value,
        });
        if (response.status === 200) {
          const expiryDate = new Date();
          expiryDate.setMonth(expiryDate.getMonth() + 1);
          cookie.set("token_auth", response.data.token, {
            path: "/",
            expires: expiryDate,
          });
          setError(!error);
          navigate("/auth/security-code");
          setIsLoading(false);
        } else {
          toast.error(response.data.message);
          setIsLoading(false);
          setError(!error);
        }
      } catch (error) {
        setIsLoading(false);
        setError(!error);
        toast.error("Mã OTP đã hết hạn vui lòng thử lại");
      }
    }
  };
  return (
    <div>
      <img class={`mx-auto mt-10 w-52`} src={AuthImg}></img>
      <h1 class={`text-center font-semibold text-2xl my-4`}>
        Xác minh đăng nhập
      </h1>
      <h1 class={`text-center font-inter text-sm my-4 mb-10`}>
        Chúng tôi đã gửi mã OTP đến{" "}
        <span
          class={`text-center font-inter text-sm my-2 text-blue-default font-semibold`}
        >
          {location.state?.email}
        </span>
      </h1>
      <div class={`mx-auto w-fit relative`}>
        <OTPInput
          value={otp}
          onChange={handleChangeOTP}
          numInputs={6}
          renderInput={({ style, ...props }) => (
            <input
              class={`text-center font-semibold text-3xl border w-14 h-14 mx-2 bg-gray-50 rounded-xl ${
                error && "border-red-500"
              }`}
              {...props}
            />
          )}
        />
        {isLoading && (
          <img
            class={`animate-spin absolute top-[30%]  text-center right-[50%] left-[50%]`}
            src={LoadingIcon}
          ></img>
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
