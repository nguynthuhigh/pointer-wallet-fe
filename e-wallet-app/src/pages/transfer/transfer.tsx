import { useNavigate } from "react-router-dom";
import SearchUser from "./search_user";
import InputAmount from "./input_amount";
import SelectCurrency from "./select_currency";
import { useState } from "react";
import { Currency, User } from "../../types/transfer";

import { useGetProfileQuery } from "../../redux/features/profile/profileApi";

const Transfer = () => {
  const { data: wallet, isLoading } = useGetProfileQuery();
  const [step, setStep] = useState("select_currency");
  const [selectCurrency, setSelectCurrency] = useState<Currency>();
  const [userData, setUserData] = useState<User>();
  const navigate = useNavigate();

  const currencies = wallet?.data.walletData.currencies;

  const handleStepTransfer = (step_change: string) => {
    if (step_change === "home") {
      navigate("/");
    }
    setStep(step_change);
  };

  const handleUserData = (data: User) => {
    setUserData(data);
  };

  const handleCurrencyData = (data: Currency) => {
    setSelectCurrency(data);
  };

  switch (step) {
    case "select_currency":
      return (
        <SelectCurrency
          currency={currencies}
          handleCurrencyData={handleCurrencyData}
          handleStepTransfer={handleStepTransfer}
          isLoading={isLoading}
        />
      );
    case "search_user":
      return (
        <SearchUser
          handleUserData={handleUserData}
          handleStepTransfer={handleStepTransfer}
        />
      );
    case "input_amount":
      return (
        <InputAmount
          currencyData={selectCurrency}
          userData={userData}
          handleStepTransfer={handleStepTransfer}
        />
      );
    default:
      return <div>Invalid step</div>;
  }
};

export default Transfer;
