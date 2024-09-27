import React, {useState } from "react";
import DrawerBottom from "../../components/transfer/drawer_security";
import { DataSend } from "../../types/transfer";
import { formatCurrency } from "../../utils/format_currency";
import { convertCurrency } from "../../utils/convert_currency";
import CurrencyInput from "react-currency-input-field";
import { symbolCurrency } from "../../utils/symbol_currency";
import avatar from "../../assets/png/default_avatar.png";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useSearchParams } from "react-router-dom";
import { getUserByEmail } from "../../services/api/transfer.api";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading";
import ItemCurrency from "../../components/receive/item_currency";
const TransferByQrCode:React.FC = () => {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') ?? ''
  const currency = searchParams.get('currency') ?? ''
  const wallets = useSelector(
    (state: RootState) => state.user.userState.walletData.currencies
  ) 
  const wallet = wallets.find(item => item.currency.symbol === currency)
  const {isLoading,data,isError} = useQuery({
    queryKey:['receive-user'],
    queryFn: async ()=>{
      const response = await getUserByEmail(email)
      return response.data.data
    },
    refetchOnWindowFocus:false
  })
  if(isLoading){
    return <Loading></Loading>
  }
  if(isError){
    console.log(isError)
  }
  const [dataSend, setDataSend] = useState<DataSend>({
    amount: 0,
    message: "",
    receiver: data._id,
    currency: currency,
    security_code: "",
  });
  const [error, setError] = useState<string | null>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleChange = (event: React.ChangeEvent) => {
    setError(null);
    const { name, value } = event.target as HTMLInputElement;
    setDataSend({
      ...dataSend,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    const amount = convertCurrency(
      dataSend.amount,
      dataSend.currency
    );
    const balance =
      convertCurrency(
        wallet?.balance ?? 0,
        dataSend.currency
      ) || 0;
    if (!amount) {
      return setError(`Vui lòng nhập số tiền`);
    }
    if (amount > balance) {
      return setError(`Số dư không đủ`);
    }
    if (amount < 100) {
      return setError(
        `Số tiền chuyển tối thiểu là ${formatCurrency(
          convertCurrency(100, currency),
          currency
        )}`
      );
    } else if (amount > 100000000) {
      return setError(
        `Số tiền chuyển tối đa là ${formatCurrency(100000000, "VND")}`
      );
    }
    setIsOpen(!isOpen);
  };
  return (
    <div class={`container-center`}>
      <div class={`mt-14`}>
        <h1 class={`font-semibold text-center text-red-500`}>{error}</h1>
        <CurrencyInput
          prefix={symbolCurrency(dataSend.currency)}
          id="input-example"
          name="input-name"
          placeholder={`0 ` + dataSend.currency}
          defaultValue={0}
          decimalsLimit={2}
          class={`border-0 mt-5 focus:outline-none text-center text-6xl w-full font-semibold bg-white ${
            error && " text-red-500"
          }`}
          onValueChange={(values) => {
            setDataSend({ ...dataSend, amount: Number(values) });
            setError(null);
          }}
        />
        <textarea
          onChange={handleChange}
          name="message"
          maxLength={100}
          class={`border mt-10 rounded-xl w-full h-24 p-1`}
          placeholder={`Nhập nội dung đính kèm`}
        ></textarea>
      </div>
     <ItemCurrency balance={wallet?.balance} currency={dataSend.currency}></ItemCurrency>
      <div class={`rounded-xl bg-gray-100 mt-2 p-4 flex`}>
        <img
          class={`w-10 h-10 rounded-full object-cover`}
          src={data.avatar ? data.avatar : avatar}
        ></img>
        <div class={`ml-4`}>
          <h1 class={`text-sm text-gray-500`}>Người nhận:</h1>
          <h1 class={`text-md`}>{data.full_name}</h1>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        class={`w-full mt-10  p-3 bg-blue-600 font-semibold text-white rounded-full `}
      >
        Gửi
      </button>
      <DrawerBottom
        data={dataSend}
        onClose={handleSubmit}
        state={isOpen}
      ></DrawerBottom>
    </div>
  );
};

export default TransferByQrCode;
