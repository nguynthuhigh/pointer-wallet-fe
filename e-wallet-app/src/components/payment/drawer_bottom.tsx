import React, { useEffect, useRef, useState } from "react";
import { Box, Drawer } from "@mui/material";
import OTPInput from "react-otp-input";
import { confirmPaymentAPI } from "../../services/api/payment.api";
import { useNavigate } from "react-router-dom";
import ic_close from "../../assets/svg/close.svg";
import ic_loading from "../../assets/svg/loading.svg";
import { useAppDispatch } from "../../redux/hooks";
import { setWalletUpdated } from "../../redux/features/walletSlice";
type DrawerFunction = () => void;

interface BottomDrawerProps {
  onClose: DrawerFunction;
  state: boolean;
  transactionID: string | undefined | null;
  voucher_code: string | undefined;
}
const DrawerBottom: React.FC<BottomDrawerProps> = ({
  onClose,
  state,
  transactionID,
  voucher_code,
}) => {
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const focusInput = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const current = focusInput.current as any;
    current.focus();
  }, []);
  const handleChangeOTP = async (value: string) => {
    setOtp(value);
    const body = {
      security_code: value,
      transactionID: transactionID,
      voucher_code: voucher_code,
    };
    if (value.length === 6) {
      try {
        setIsLoading(true);
        const response = await confirmPaymentAPI(body);
        if (response.status === 200) {
          navigate("/payment/results", { state: { id: transactionID } });
          setIsLoading(false);
          dispatch(setWalletUpdated(true));
        }
      } catch (error: any) {
        setIsLoading(false);
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div>
      <div>
        <Drawer anchor="bottom" open={state} onClose={onClose}>
          <button
            class={`bg-gray-100 m-2 rounded-full p-2 ml-auto`}
            onClick={onClose}
          >
            <img src={ic_close}></img>
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
            <h1 class={`font-semibold my-2`}>Nhập mã bảo mật</h1>
            <h1 class={`font-semibold text-red-500`}>{error}</h1>
            <div
              class={`mx-auto ${
                error && `border-red-500`
              } relative w-fit  border  rounded-full`}
            >
              <div class={`p-4`} ref={focusInput}>
                <OTPInput
                  value={otp}
                  onChange={handleChangeOTP}
                  numInputs={6}
                  inputType="password"
                  renderInput={({ style, ...props }) => (
                    <input
                      inputmode="tel"
                      pattern="[0-9]*"
                      class={`rounded-full ${
                        error && `border-red-500`
                      } text-center font-semibold   border w-5 h-5  mx-2 bg-gray-50  ${
                        error && "border-red-500"
                      }`}
                      {...props}
                    />
                  )}
                />
              </div>
              {isLoading && (
                <div
                  class={`absolute w-full bg-gray-100 rounded-full top-0 h-full`}
                >
                  <img
                    class={`mx-auto mt-4 animate-spin`}
                    src={ic_loading}
                  ></img>
                </div>
              )}
            </div>
          </Box>
        </Drawer>
      </div>
    </div>
  );
};

export default DrawerBottom;
