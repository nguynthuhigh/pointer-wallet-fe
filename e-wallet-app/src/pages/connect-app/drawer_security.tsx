import React, { useState } from "react";
import { bottomNavigationActionClasses, Box, Drawer } from "@mui/material";
import OTPInput from "react-otp-input";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ic_close from "../../assets/svg/close.svg";
import ic_loading from "../../assets/svg/loading.svg";
import { useMutation } from "@tanstack/react-query";
import { connectWallet } from "../../services/api/connect-app.api";

type DrawerFunction = () => void;
interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}
interface DrawerDataProps {
  partnerId: string;
  userId: string;
  security_code: string;
  returnUrl: string
}

interface BottomDrawerProps {
  onClose: DrawerFunction;
  state: boolean;
  data: DrawerDataProps;
}
interface bodyType {
  partnerId: string;
  userId: string;
  security_code: string;
  returnUrl: string
}

const DrawerBottom: React.FC<BottomDrawerProps> = ({
  onClose,
  state,
  data,
}) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mutation = useMutation({
    mutationKey: ['connect-app'],
    mutationFn: async (body: bodyType) => {
      const response = await connectWallet(body)
      return response.data;
    },
    onSuccess: (body:bodyType) => {
      toast.success('Kết nối ví thành công!')
      console.log(body.returnUrl)
    }
  })
  const handleChangeOTP = async (value: string) => {
    setOtp(value);
    setError(null);
    if (value.length === 6) {
      const body = {
        ...data,
        security_code: value,
      };
      console.log(body)
      setIsLoading(true);
      try {
        await mutation.mutateAsync(body)
        window.location.href = body.returnUrl
        setIsLoading(false);
        onClose();
      } catch (error: unknown) {
        setIsLoading(false);
        const typedError = error as ErrorResponse;
        const errorMsg = typedError?.response?.data?.message;
        setError(errorMsg || "Đã xảy ra lỗi.");
      }
    }
  };

  return (
    <div>
      <Drawer anchor="bottom" open={state} onClose={onClose}>
        <button
          className="bg-gray-100 m-2 rounded-full p-2 ml-auto"
          onClick={onClose}
        >
          <img src={ic_close} alt="close icon"></img>
        </button>
        <Box
          sx={{
            width: "auto",
            padding: "16px",
            textAlign: "center",
            height: "400px",
          }}
          role="presentation"
        >
          <h1 className="font-semibold my-2">Nhập mã bảo mật</h1>
          <h1 className="font-semibold text-red-500">{error}</h1>
          <div
            className={`mx-auto ${error && "border-red-500"
              } relative w-fit border rounded-full`}
          >
            <div class="p-4">
              <OTPInput
                value={otp}
                onChange={handleChangeOTP}
                numInputs={6}
                inputType="password"
                renderInput={({ style, ...props }) => (
                  <input
                    inputmode="tel"
                    pattern="[0-9]*"
                    class={`rounded-full ${error && `border-red-500`
                      } text-center font-semibold border w-5 h-5 mx-2 bg-gray-50 ${error && "border-red-500"
                      }`}
                    {...props}
                  />
                )}
              />
            </div>
            {isLoading && (
              <div className="absolute w-full bg-gray-100 rounded-full top-0 h-full">
                <img
                  className="mx-auto mt-4 animate-spin"
                  src={ic_loading}
                  alt="loading"
                />
              </div>
            )}
          </div>
          <Toaster position="top-center" />
        </Box>
      </Drawer>
    </div>
  );
};

export default DrawerBottom;
