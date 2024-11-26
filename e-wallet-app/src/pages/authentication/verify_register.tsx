import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "preact/hooks";
import OTPInput from "react-otp-input";
import toast, { Toaster } from "react-hot-toast";
import LoadingIcon from "../../assets/svg/loading.svg";
import { verifyRegisterAPI, resendOTP } from "../../services/api/auth.api";
import AuthImg from "../../assets/png/auth_img.png";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addAccessToken } from "../../redux/auth/authSlice";

interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export default function VerifyRegister() {
  const [otp, setOtp] = useState("");
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { registerUser } = useAppSelector((state) => state.auth.register);

  useEffect(() => {
    if (registerUser.message) {
      toast.success(registerUser.message);
    }
  }, [registerUser.message]);

  const handleChangeOTP = async (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      setIsLoading(true);
      try {
        const response = await verifyRegisterAPI({
          email: registerUser.email,
          otp: value,
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          dispatch(addAccessToken(response.data.data));
          setTimeout(() => {
            navigate("/auth/register/security-code", {
              state: { message: response.data.message },
            });
          }, 2000);
        } else {
          toast.error(response.data.message);
          setError(response.data.message);
        }
      } catch (error: unknown) {
        const typedError = error as ErrorResponse;
        const errorMsg = typedError?.response?.data?.message || "Đã xảy ra lỗi";
        toast.error(errorMsg);
        setError(errorMsg);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resend = async () => {
    setIsLoading(true);
    try {
      const response = await resendOTP({
        email: registerUser.email,
        password: registerUser.password,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
        setError(response.data.message);
      }
    } catch (error: unknown) {
      const typedError = error as ErrorResponse;
      const errorMsg = typedError?.response?.data?.message || "Đã xảy ra lỗi!";
      toast.error(errorMsg);
      setError(errorMsg);
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
      <img class={`mx-auto mt-10 w-52`} src={AuthImg} alt="Auth" />
      <h1 class={`text-center font-semibold text-2xl my-4`}>
        Xác minh đăng ký
      </h1>
      <h1 class={`text-center font-inter text-sm my-4 mb-10`}>
        Chúng tôi đã gửi mã OTP đến{" "}
        <span
          class={`text-center font-inter text-sm my-2 text-blue-default font-semibold`}
        >
          {registerUser.email}
        </span>
      </h1>
      <div class={`mx-auto w-fit relative`}>
        <OTPInput
          value={otp}
          onChange={handleChangeOTP}
          numInputs={6}
          inputType="tel"
          renderInput={({ style, ...props }) => (
            <input
              class={`text-center transition-colors duration-300 ease-in-out font-semibold text-3xl border outline-gray-500 w-14 h-14 mx-2 focus:border-blue-default focus:outline-blue-default bg-gray-50 rounded-xl ${
                error && "border-red-500"
              } ${isLoading ? "cursor-not-allowed bg-gray-200" : ""}`}
              disabled={isLoading}
              {...props}
            />
          )}
        />
        {isLoading && (
          <img
            class={`animate-spin absolute -top-[35%] text-center right-[50%] left-[50%]`}
            src={LoadingIcon}
            alt="Loading"
          />
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
