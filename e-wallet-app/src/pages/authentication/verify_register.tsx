import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "preact/hooks";
import Cookies from "universal-cookie";
const cookie = new Cookies();
import OTPInput from "react-otp-input";
import toast, { Toaster } from "react-hot-toast";
import LoadingIcon from "../../assets/svg/loading.svg";
import { verifyRegisterAPI, resendOTP } from "../../services/api/auth.api";
import AuthImg from "../../assets/png/auth_img.png";
import { RootState } from "../../redux/store";

export default function VerifyRegister() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const data = useSelector((state: RootState) => state.auth.register);
  useEffect(() => {
    toast.success(data.registerUser.message);
  }, [data.registerUser.message]);
  const handleChangeOTP = async (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      setIsLoading(true);
      try {
        const response = await verifyRegisterAPI({
          email: data.registerUser.email,
          otp: value,
        });
        if (response.status === 200) {
          setError(false);
          await cookie.set("accessToken", response.data.data.accessToken, {
            path: "/",
            maxAge: 60 * 60 * 24 * 15,
          });
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/auth/security-code", {
              state: { message: response.data.message },
            });
          }, 2000);
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
      const response = await resendOTP({
        email: data.registerUser.email,
        password: data.registerUser.password,
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
    if (count > 2) {
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
          {data.registerUser.email}
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
              isLoading || count > 2
                ? "text-gray-400 cursor-default"
                : "text-blue-default"
            } px-2`}
            onClick={handleResendOTP}
            disabled={isLoading}
          >
            Gửi lại OTP
          </button>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
