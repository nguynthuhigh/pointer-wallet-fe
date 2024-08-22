import HeaderDefault from "../../components/header/header_default";
import VNDIcon from "../../assets/png/vnd_icon.png";
import QRCode from "react-qr-code";
import { useState } from "preact/hooks";
import wallet from "../../dummy-data/wallet.json";
import { formatCurrency } from "../../utils/format_currency";
type DataReceive = {
  userID: string;
  currency: string;
};
const ReceivePage: React.FC = () => {
  const [selected, SetSelected] = useState<string>("VND");
  const [data, setData] = useState<DataReceive>({
    userID: "",
    currency: "VND",
  });
  const [url, setUrl] = useState<string>(
    `${import.meta.env.VITE_WALLET_URL}/send-money?userID=${
      data.userID
    }&currency=${data.currency}`
  );
  const handleSelect = (select: string) => {
    SetSelected(select);
    setData({
      ...data,
      currency: select,
    });
    setUrl(
      `${import.meta.env.VITE_WALLET_URL}/send-money?userID=${
        data.userID
      }&currency=${select}`
    );
  };
  return (
    <div class={`p-4`}>
      <HeaderDefault title="Mã nhận tiền"></HeaderDefault>
      <div>
        <QRCode class={`mx-auto mt-20`} value={url}></QRCode>
      </div>
      <div
        class={` mt-5 grid grid-flow-row grid-cols-3 max-[400px]:grid-cols-2 gap-4`}
      >
        <SelectCurrency
          onClick={() => {
            handleSelect("VND");
          }}
          currency={`VND`}
          selected={selected}
          wallet={wallet[0]}
        ></SelectCurrency>
        <SelectCurrency
          onClick={() => {
            handleSelect("USD");
          }}
          currency={`USD`}
          selected={selected}
          wallet={wallet[1]}
        ></SelectCurrency>
        <SelectCurrency
          onClick={() => {
            handleSelect("ETH");
          }}
          currency={`ETH`}
          selected={selected}
          wallet={wallet[2]}
        ></SelectCurrency>
      </div>
    </div>
  );
};
type SelectItem = {
  onClick: any;
  wallet: {
    balance: number;
  };
  currency: string;
  selected: string;
};
const SelectCurrency: React.FC<SelectItem> = ({ ...props }) => {
  return (
    <button
      onClick={props.onClick}
      class={`${
        props.currency === props.selected && "border-blue-500"
      } flex border rounded-lg p-1.5 w-full`}
    >
      <img class={`w-10 h-10`} src={VNDIcon}></img>
      <div class={`font-semibold`}>
        <h1>{props.currency}</h1>
        <h1 class={`text-sm text-gray-500`}>
          {formatCurrency(props.wallet.balance, props.currency)}
        </h1>
      </div>
    </button>
  );
};
export default ReceivePage;
