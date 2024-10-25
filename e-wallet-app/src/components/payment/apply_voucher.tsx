import React, { useEffect, useRef, useState } from "react";
import { Box, Drawer } from "@mui/material";
import ic_close from "../../assets/svg/close.svg";
import VoucherItem from "./voucher_item";
import {
  applyVoucher,
  getVouchersPartner,
} from "../../services/api/payment.api";
import toast, { Toaster } from "react-hot-toast";
type ApplyVoucherType = () => void;

interface BottomDrawerProps {
  onClose: ApplyVoucherType;
  handleDataVoucher: any;
  state: boolean;
  id: string | null | undefined;
  partnerID: string;
  amount: number;
}

type Voucher = {
  _id: string;
  title: string;
  content: string;
  code: string;
  quantity: number;
  usedCount: number;
  discountValue: number;
  type: string;
  min_condition: number;
  partnerID: string;
  image: string;
};
const ApplyVoucher: React.FC<BottomDrawerProps> = ({
  onClose,
  state,
  id,
  handleDataVoucher,
  partnerID,
  amount,
}) => {
  const [error, setError] = useState("");
  const [voucherData, setVoucherData] = useState<Voucher[]>();
  const [isLoading, setIsLoading] = useState(true);
  const codeRef = useRef<HTMLInputElement | null>(null);
  const handleApplyVoucher = async (e: Event) => {
    e.preventDefault();
    const current = codeRef.current as any;
    try {
      const response = await applyVoucher({
        transactionID: id,
        code: current.value,
      });
      if (response.status === 200) {
        handleDataVoucher(current.value, response.data.data);
        toast.success("Áp dụng voucher thành công");
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const handleAvailableApplyVoucher = async (code: string) => {
    try {
      const response = await applyVoucher({
        transactionID: id,
        code: code,
      });
      if (response.status === 200) {
        handleDataVoucher(code, response.data.data);
        toast.success("Áp dụng voucher thành công");
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const response = await getVouchersPartner(partnerID);
        if (response.status === 200) {
          setVoucherData(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchVoucher();
  }, []);
  return (
    <div>
      <div>
        <Toaster position="top-right" />
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
              height: "500px",
            }}
            role="presentation"
          >
            <h1 class={`font-semibold text-sm mb-2 text-red-500`}>{error}</h1>
            <form class={`flex`} onSubmit={handleApplyVoucher}>
              <input
                ref={codeRef}
                placeholder={`Nhập mã khuyến mãi`}
                class={` border rounded-lg w-full text-sm p-1.5`}
              ></input>
              <button
                class={`w-[100px] p-1.5 text-sm bg-blue-default text-white font-semibold rounded-lg ml-2`}
              >
                Áp dụng
              </button>
            </form>
            <div class={`mt-5`}>
              {isLoading
                ? "Loading"
                : voucherData?.map((item, key) => (
                    <VoucherItem
                      onClick={handleAvailableApplyVoucher}
                      data={item}
                      amount={amount}
                      key={key}
                    ></VoucherItem>
                  ))}
            </div>
          </Box>
        </Drawer>
      </div>
    </div>
  );
};

export default ApplyVoucher;
