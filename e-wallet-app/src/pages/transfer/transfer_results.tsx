import React, { useEffect, useState } from "react";
import avatar_default from "../../assets/png/default_avatar.png";
import { Link } from "react-router-dom";
import ic_success from "../../assets/png/ic_success.png";
import ic_home from "../../assets/svg/Home.svg";
import { formatDate } from "../../utils/format_date";
import { useLocation } from "react-router-dom";
import { getTransactionAPI } from "../../services/api/transfer.api";
import Loading from "../loading";
import { TransactionData } from "../../types/transfer";
import { formatCurrency } from "../../utils/format_currency";
const TransferResults: React.FC = () => {
  const location = useLocation();
  const [transactionData, setTransactionData] = useState<TransactionData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log(location.state.id);
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
    <div
      class={`p-4 w-full bg-white m-2 rounded-lg max-w-[800px] shadow-xl mx-auto`}
    >
      <Link to="/">
        <img class={`ml-auto`} src={ic_home}></img>
      </Link>
      <div class={`bg-white rounded-2xl`}>
        <img class={`mx-auto`} src={ic_success}></img>
        <div class={`space-y-4 text-center py-4 font-semibold`}>
          <h1 class={`text-lg`}>Chuyển tiền thành công</h1>
          <h1 class={`text-5xl font-bold text-blue-600`}>
            {formatCurrency(
              transactionData?.amount,
              transactionData?.currency.symbol
            )}
          </h1>
          <h1 class={`text-sm text-gray-500`}>
            {formatDate(transactionData?.createdAt)}
          </h1>
        </div>
        <div class={`p-4 font-semibold`}>
          <div class={` rounded-xl border-bg-gray border w-full p-4`}>
            <h1>Người nhận</h1>
            <div class={`mx-auto w-fit mb-0.5 text-center`}>
              <img
                class={`h-10 mx-auto w-10 object-cover rounded-full`}
                src={avatar_default}
              ></img>
              <h1>{transactionData?.receiver.full_name}</h1>
              <h1 class={`text-sm text-gray-400`}>
                {transactionData?.receiver.email}
              </h1>
            </div>
          </div>
          <div class={`flex w-full justify-between mt-5`}>
            <Link class={`border p-1.5 rounded-xl w-[48%] text-center`} to="/">
              Quay về
            </Link>
            <Link
              class={`border p-1.5 rounded-xl w-[48%] text-center`}
              to="/transfer"
            >
              Chuyển tiếp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferResults;
