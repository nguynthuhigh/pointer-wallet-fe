import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "preact/hooks";
import toast, { Toaster } from "react-hot-toast";
import OTPInput from "react-otp-input";
import AuthImg from "../../assets/png/auth_img.png";
import { securityCode } from "../../services/api/auth.api";
import { ButtonSubmit } from "../../components/authentication/button_submit";

export default function SecurityCode() {
  const navigate = useNavigate();
  const location = useLocation();

  const [security, setSecurityCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const message = location.state?.message;
    if (message) {
      toast(message, { icon: "✍️" });
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
          navigate("/", {
            state: { message: response.data.message },
          });
        } else {
          setError(true);
          toast.error(response.data.message);
        }
      } catch (error: any) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message || "Đã xảy ra lỗi");
        }
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
              class={`text-center font-semibold text-3xl border w-14 h-14 mx-2 bg-gray-50 rounded-xl ${
                error && "border-red-500"
              }`}
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
