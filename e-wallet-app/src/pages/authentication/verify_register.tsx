import Cookies from "universal-cookie";
const cookie = new Cookies();
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "preact/hooks";
import OTPInput from "react-otp-input";
import toast, { Toaster } from "react-hot-toast";
import LoadingIcon from "../../assets/svg/loading.svg";
import { verifyRegisterAPI, resendOTP } from "../../services/api/auth.api";
import AuthImg from "../../assets/png/auth_img.png";

export default function VerifyRegister() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const message = location.state?.message;
    toast.success(message);
  }, []);
  const handleChangeOTP = async (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      setIsLoading(true);
      try {
        const response = await verifyRegisterAPI({
          email: location.state.email,
          otp: value,
        });
        if (response.status === 200) {
          setError(false);
          const expiryDate = new Date();
          expiryDate.setMonth(expiryDate.getMonth() + 1);
          cookie.set("token_auth", response.data.token, {
            path: "/",
            expires: expiryDate,
          });
          navigate("/auth/security-code", {
            state: { message: response.data.message },
          });
        } else {
          setError(true);
          toast.error(response.data.message);
        }
      } catch (error) {
        setError(true);
        toast.error("Mã OTP đã hết hạn vui lòng thử lại");
      } finally {
        setIsLoading(false);
      }
    }
  };
  const resend = async () => {
    setIsLoading(true);
    try {
      console.log({
        email: location.state.email,
        password: location.state.password,
      });
      const response = await resendOTP({
        email: location.state.email,
        password: location.state.password,
      });
      if (response.status === 200) {
        setIsLoading(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleResendOTP = () => {
    if (count >= 3) {
      toast.error("Bạn đã đạt tới số lần gửi lại OTP tối đa.");
      return;
    }
    setCount((count) => count + 1);
    resend();
  };

  return (
    <div>
      <img class={`mx-auto mt-10 w-52`} src={AuthImg}></img>
      <h1 class={`text-center font-semibold text-2xl my-4`}>
        Xác minh đăng ký
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
            class={`animate-spin absolute -top-[35%] text-center right-[50%] left-[50%]`}
            src={LoadingIcon}
          ></img>
        )}
        <div class={`flex justify-end`}>
          <button
            class={`mt-4 font-semibold text-sm ${
              isLoading || count > 3
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-default"
            } px-2`}
            onClick={handleResendOTP}
            disabled={isLoading || count > 3}
          >
            Gửi lại OTP
          </button>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
