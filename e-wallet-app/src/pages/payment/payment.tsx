import { useLocation } from "react-router-dom";
import { paymentAPI } from "../../services/api/payment.api";
import { useState } from "react";
import PageNotFound from "../page_not_found";
import Loading from "../loading";
import DrawerBottom from "../../components/payment/drawer_bottom";
import ApplyVoucher from "../../components/payment/apply_voucher";
import { formatCurrency } from "../../utils/format_currency";
import { formatDate } from "../../utils/format_date";
import { useQuery } from "@tanstack/react-query";

export const PaymentGateway: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const [newAmount, setNewAmount] = useState<number>();
  const [voucherCode, setVoucherCode] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenVoucher, setIsOpenVoucher] = useState<boolean>(false);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["payment-bill", token],
    queryFn: async () => {
      const response = await paymentAPI(token);
      setNewAmount(response.data.amount);
      return response.data;
    },
  });
  if (isError) {
    return <PageNotFound></PageNotFound>;
  }
  if (isLoading) {
    return <Loading></Loading>;
  }
  const handleClose = () => {
    setIsOpen(!isOpen);
  };
  const handleOpenVoucher = () => {
    setIsOpenVoucher(!isOpenVoucher);
  };
  const handleApplyVoucher = (code: string, amount: number) => {
    setNewAmount(amount);
    setVoucherCode(code);
    setIsOpenVoucher(false);
  };
  return (
    <div class={`w-full`}>
      <h1 class={`font-semibold text-center my-4 text-lg`}>
        Thanh toán hóa đơn
      </h1>
      <div class={`p-6  max-w-[600px] mx-auto bg-white rounded-lg shadow-lg`}>
        <div class={`flex items-center`}>
          <div class={`font-semibold space-y-2`}>
            <h1 class={`text-lg`}>Hóa đơn từ {data?.partnerID.name}</h1>
            <h1 class={`text-6xl max-sm:text-3xl`}>
              {formatCurrency(data?.amount, data?.currency.symbol)}
            </h1>
            <h1 class={`text-gray-400`}>
              {formatDate(data?.createdAt ? data?.createdAt : new Date())}
            </h1>
          </div>
          <img
            class={`w-20 h-20 object-cover rounded-xl ml-auto`}
            src={`https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg`}
          ></img>
        </div>
        <div class={`border-b-2 border-dashed my-4`}></div>
        <div class={`space-y-2`}>
          <h1 class={`font-semibold text-xl my-5`}>Thông tin sản phẩm</h1>
          <div class={`flex `}>
            <h1 class={`w-[50%] text-gray-400`}>Tên sản phẩm</h1>
            <h1 class={`w-[50%] font-semibold`}>{data?.message}</h1>
          </div>
          <div class={`flex`}>
            <h1 class={`w-[50%] text-gray-400`}>Mã đơn hàng</h1>
            <h1
              class={`w-[50%] font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis`}
            >
              {data?.orderID}{" "}
            </h1>
          </div>
          <div class={`flex`}>
            <h1 class={`w-[50%] text-gray-400`}>Giao dịch hết hạn sau</h1>
            <h1 class={`font-semibold`}>5p</h1>
          </div>
        </div>
        <div class={`border-b-2 border-dashed my-4`}></div>
        <h1 class={`font-semibold text-xl my-2`}>Ưu đãi</h1>
        <button
          class={`border border-blue-default border-dashed rounded-xl w-full p-3 text-blue-default font-semibold`}
          onClick={handleOpenVoucher}
        >
          {voucherCode
            ? `Đang áp dụng voucher ${voucherCode}`
            : "Chọn thẻ quà tặng"}
        </button>
        <div class={`border-b-2 border-dashed my-4`}></div>
        <div class={`flex `}>
          <h1 class={` text-gray-400`}>Tổng tiền</h1>
          <h1 class={`ml-auto font-semibold`}>
            {formatCurrency(newAmount, data?.currency.symbol)}
          </h1>
        </div>
        <button
          class={`bg-blue-default text-lg font-semibold text-white w-full py-2 rounded-lg my-4`}
          onClick={handleClose}
        >
          Thanh toán
        </button>
      </div>
      {!isLoading && (
        <DrawerBottom
          transactionID={data?._id}
          voucher_code={voucherCode}
          state={isOpen}
          onClose={handleClose}
        ></DrawerBottom>
      )}
      {!isLoading && (
        <ApplyVoucher
          amount={data?.amount ?? 1}
          partnerID={data?.partnerID._id ?? ""}
          id={data?._id}
          handleDataVoucher={handleApplyVoucher}
          state={isOpenVoucher}
          onClose={handleOpenVoucher}
        ></ApplyVoucher>
      )}
    </div>
  );
};
