import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ic_success from "../../assets/png/ic_success.png";
import ic_home from "../../assets/svg/Home.svg";
import { formatDate } from "../../utils/format_date";
import { useLocation } from "react-router-dom";
import { getTransactionAPI } from "../../services/api/transfer.api";
import Loading from "../loading";
import { formatCurrency } from "../../utils/format_currency";
import { TransactionPayment } from "../../types/payment";
const PaymentResults: React.FC = () => {
  const location = useLocation();
  const [transactionData, setTransactionData] = useState<TransactionPayment>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await getTransactionAPI(location.state.id);
        if (response.status === 200) {
          setTransactionData(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchTransaction();
  }, []);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div class={`p-6 max-w-[600px] mx-auto bg-white rounded-lg shadow-lg`}>
      <Link to="/">
        <img class={`ml-auto`} src={ic_home}></img>
      </Link>
      <div class={`bg-white rounded-2xl`}>
        <img class={`mx-auto`} src={ic_success}></img>
        <div class={`space-y-4 text-center py-4 font-semibold`}>
          <h1 class={`text-lg`}>Thanh toán thành công</h1>
          <h1 class={`text-5xl font-bold text-blue-600`}>
            {formatCurrency(
              transactionData?.amount,
              transactionData?.currency.symbol
            )}
          </h1>
          <h1 class={`text-sm text-gray-500`}>
            {formatDate(transactionData?.createdAt ?? new Date())}
          </h1>
        </div>
        <div class={`p-4 font-semibold`}>
          <div class={` rounded-xl border-bg-gray border w-full p-4`}>
            <h1>Thông tin sản phẩm</h1>
            <div class={`space-y-2 w-full mt-2 mb-0.5`}>
              <div class={`flex`}>
                <h1 class={`text-sm text-gray-400`}>Tên sản phẩm</h1>
                <h1 class={`text-sm text-black ml-auto`}>
                  {transactionData?.message}
                </h1>
              </div>
              <div class={`flex`}>
                <h1 class={`text-sm text-gray-400`}>Nhà cung cấp</h1>
                <h1 class={`text-sm text-black ml-auto`}>
                  {transactionData?.partnerID.name}
                </h1>
              </div>
            </div>
          </div>
          <div class={`flex w-full justify-between mt-5`}>
            <Link class={`border p-1.5 rounded-xl w-[48%] text-center`} to="/">
              Quay về
            </Link>
            <Link class={`border p-1.5 rounded-xl w-[48%] text-center`} to="/">
              Tiếp tục thanh toán
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentResults;
