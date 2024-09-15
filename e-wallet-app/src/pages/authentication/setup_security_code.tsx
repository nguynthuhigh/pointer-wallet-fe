import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "preact/hooks";
import toast, { Toaster } from "react-hot-toast";
import OTPInput from "react-otp-input";
import AuthImg from "../../assets/png/auth_img.png";
import { securityCode } from "../../services/api/auth.api";
import { ButtonSubmit } from "../../components/authentication/button_submit";
interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}
export default function SecurityCode() {
  const navigate = useNavigate();
  const location = useLocation();

  const [security, setSecurityCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const message = location.state?.message;
    if (message) {
      toast(message, { icon: "🗝️" });
    }
  }, [location.state?.message]);

  const handleSubmit = async () => {
    if (security.length === 6) {
      setIsLoading(true);
      try {
        const response = await securityCode({
          security_code: security,
        });

        if (response.status === 200) {
          setError(false);
          toast.success(response.data.message);
          localStorage.setItem("logged", "true");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else if (response.status === 401) {
          setError(true);
          toast.error("Phiên của bạn đã hết hạn!");
          setTimeout(() => {
            navigate("/auth/register");
          }, 1000);
        } else {
          setError(true);
          toast.error(response.data.message);
        }
      } catch (error: unknown) {
        const typedError = error as ErrorResponse;
        const errorMsg = typedError?.response?.data?.message || "Đã xảy ra lỗi";
        setError(true);
        toast.error(errorMsg);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError(true);
      toast.error("Mã bảo mật phải có 6 ký tự.");
    }
  };

  return (
    <div>
      <img className="mx-auto mt-10 w-52" src={AuthImg} alt="Auth" />
      <h1 className="text-center font-semibold text-2xl my-4">
        Cài đặt mã bảo mật
      </h1>
      <div className="mx-auto w-fit relative">
        <OTPInput
          value={security}
          onChange={(value) => setSecurityCode(value)}
          numInputs={6}
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
        <ButtonSubmit
          title="Xác nhận"
          onClick={handleSubmit}
          isLoading={isLoading}
        />
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
