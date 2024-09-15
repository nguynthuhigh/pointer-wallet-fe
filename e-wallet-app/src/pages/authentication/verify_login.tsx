import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "preact/hooks";
import OTPInput from "react-otp-input";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { verifyLoginAPI } from "../../services/api/auth.api";
import LoadingIcon from "../../assets/svg/loading.svg";
import PageNotFound from "../page_not_found";
import AuthImg from "../../assets/png/auth_img.png";
import { RootState, AppDispatch } from "../../redux/store";
import { clearMessage } from "../../redux/auth/authSlice";
type ErrorResponse = {
  response: {
    data: {
      message: string;
    };
  };
};

const VerifyLogin = () => {
  const { error, loginUser } = useSelector(
    (state: RootState) => state.auth.login
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  if (!loginUser.email) {
    return <PageNotFound />;
  }

  useEffect(() => {
    if (loginUser.message) {
      toast.success(loginUser.message);
      dispatch(clearMessage("login"));
    }
  }, [loginUser.message]);

  const [otp, setOtp] = useState("");

  const handleChangeOTP = async (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      const body = {
        email: loginUser.email,
        otp: value,
      };
      setIsLoading(true);
      try {
        const response = await verifyLoginAPI(body);
        if (response.status === 200) {
          toast.success("Đăng nhập thành công!");
          localStorage.setItem("logged", "true");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (error: unknown) {
        const typeError = error as ErrorResponse;
        toast.error(typeError.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <img class={`mx-auto mt-10 w-52`} src={AuthImg} />
      <h1 class={`text-center font-semibold text-2xl my-4`}>
        Xác minh đăng nhập
      </h1>
      <h1 class={`text-center font-inter text-sm my-4 mb-10`}>
        Chúng tôi đã gửi mã OTP đến{" "}
        <span
          class={`text-center font-inter text-sm my-2 text-blue-default font-semibold`}
        >
          {loginUser?.email}
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
              class={`text-center font-semibold text-3xl border w-14 h-14 mx-2 focus:outline-blue-default bg-gray-50 rounded-xl ${
                error && "border-red-500"
              } ${isLoading ? "cursor-not-allowed bg-gray-200" : ""}`}
              disabled={isLoading}
              {...props}
            />
          )}
        />
        {isLoading && (
          <img
            className={`animate-spin absolute -top-[50%] text-center right-[50%] left-[50%]`}
            src={LoadingIcon}
          />
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default VerifyLogin;
