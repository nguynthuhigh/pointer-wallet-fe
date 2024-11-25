import React, { useState } from "react";
import { Box, Drawer } from "@mui/material";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { DataSend } from "../../types/transfer";
import { sendMoneyAPI } from "../../services/api/transfer.api";
import ic_close from "../../assets/svg/close.svg";
import ic_loading from "../../assets/svg/loading.svg";
type DrawerFunction = () => void;
import { setWalletUpdated } from "../../redux/features/walletSlice";
import { useAppDispatch } from "../../redux/hooks";

interface BottomDrawerProps {
  onClose: DrawerFunction;
  state: boolean;
  data: DataSend;
}
const DrawerBottom: React.FC<BottomDrawerProps> = ({
  onClose,
  state,
  data,
}) => {
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleChangeOTP = async (value: string) => {
    setOtp(value);
    setError(null);
    if (value.length === 6) {
      const body = {
        ...data,
        security_code: value,
      };
      try {
        setIsLoading(true);
        const response = await sendMoneyAPI(body);
        if (response.status === 200) {
          navigate("/transfer/result", {
            state: { id: response.data.data._id },
          });
          dispatch(setWalletUpdated(true));
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        setError(error?.response.data.message);
      }
    }
  };
  return (
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
            <div class={`p-4`}>
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
                <img class={`mx-auto mt-4 animate-spin`} src={ic_loading}></img>
              </div>
            )}
          </div>
        </Box>
      </Drawer>
    </div>
  );
};

export default DrawerBottom;
