import React, { useState } from "react";
import DrawerBottom from "../../components/transfer/drawer_security";
import { DataSend } from "../../types/transfer";
import { formatCurrency } from "../../utils/format_currency";
import { convertCurrency } from "../../utils/convert_currency";
import CurrencyInput from "react-currency-input-field";
import { symbolCurrency } from "../../utils/symbol_currency";
import avatar from "../../assets/png/default_avatar.png";
import HeaderTransfer from "../../components/header/header_transfer";

const InputAmount = ({ ...props }) => {
  const [dataSend, setDataSend] = useState<DataSend>({
    amount: 0,
    message: "",
    receiver: props.userData._id,
    currency: props.currencyData.currency,
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
      props.currencyData.currency
    );
    const balance =
      convertCurrency(
        props.currencyData.balance,
        props.currencyData.currency
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
          convertCurrency(100, props.currencyData.currency),
          props.currencyData.currency
        )}`
      );
    }
    if (amount % 100 !== 0) {
      return setError("Vui lòng nhập số tiền chẵn");
    } else if (amount > 100000000) {
      return setError(
        `Số tiền chuyển tối đa là ${formatCurrency(100000000, "VND")}`
      );
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="container-center">
      <HeaderTransfer
        onClick={() => {
          props.handleStepTransfer("search_user");
        }}
        title="Nhập số tiền"
      />
      <div className="mt-14">
        <h1 className="font-semibold text-center text-red-500">{error}</h1>
        <CurrencyInput
          prefix={symbolCurrency(props.currencyData.currency)}
          id="input-example"
          name="input-name"
          placeholder={`0 ${props.currencyData.currency}`}
          defaultValue={0}
          decimalsLimit={0}
          className={`border-0 mt-5 focus:outline-none text-center text-6xl w-full font-semibold bg-white ${
            error && "text-red-500"
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
          className="border mt-10 rounded-xl w-full h-24 p-1"
          placeholder="Nhập nội dung đính kèm"
        ></textarea>
      </div>
      <div className="rounded-xl bg-gray-100 p-4 flex">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={props.currencyData.image}
          alt="Currency"
        />
        <div className="ml-4">
          <h1 className="text-sm text-gray-500">Số dư:</h1>
          <h1 className="text-md">
            {formatCurrency(
              props.currencyData.balance,
              props.currencyData.currency
            )}
          </h1>
        </div>
      </div>
      <div className="rounded-xl bg-gray-100 mt-2 p-4 flex">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={props.userData.avatar ? props.userData.avatar : avatar}
          alt="User Avatar"
        />
        <div className="ml-4">
          <h1 className="text-sm text-gray-500">Người nhận:</h1>
          <h1 className="text-md">{props.userData.full_name}</h1>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full mt-10 p-3 bg-blue-600 font-semibold text-white rounded-full"
      >
        Gửi
      </button>
      <DrawerBottom data={dataSend} onClose={handleSubmit} state={isOpen} />
    </div>
  );
};

export default InputAmount;
