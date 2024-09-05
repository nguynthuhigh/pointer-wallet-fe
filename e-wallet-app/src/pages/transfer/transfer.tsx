import { useNavigate } from "react-router-dom";
import SearchUser from "./search_user";
import InputAmount from "./input_amount";
import SelectCurrency from "./select_currency";
import { useEffect, useState } from "react";
import { Currency, User } from "../../types/transfer";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const Transfer = () => {
  const [step, setStep] = useState("select_currency");
  const [selectCurrency, setSelectCurrency] = useState<Currency>();
  const [userData, setUserData] = useState<User>();
  const [currency, setCurrency] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const wallet = useSelector(
    (state: RootState) => state.user.userState.walletData.currencies
  );
  useEffect(() => {
    setCurrency(wallet);
    setIsLoading(false);
  }, [wallet]);
  const handleStepTransfer = (step_change: string) => {
    if (step_change === "home") {
      navigate("/");
    }
    setStep(step_change);
  };
  const handleUserData = (data: any) => {
    setUserData(data);
  };
  const handleCurrencyData = (data: any) => {
    setSelectCurrency(data);
  };
  switch (step) {
    case "select_currency":
      return (
        <>
          <div class={`flex w-full`}>
            <SelectCurrency
              currency={currency}
              handleCurrencyData={handleCurrencyData}
              handleStepTransfer={handleStepTransfer}
              isLoading={isLoading}
            />
          </div>
        </>
      );
    case "search_user":
      return (
        <>
          <div class={`flex`}>
            <SearchUser
              handleUserData={handleUserData}
              handleStepTransfer={handleStepTransfer}
            />
          </div>
        </>
      );
    case "input_amount":
      return (
        <>
          <div class={`flex`}>
            <InputAmount
              currencyData={selectCurrency}
              userData={userData}
              handleStepTransfer={handleStepTransfer}
            />
          </div>
        </>
      );
    default:
      return <div>Invalid step</div>;
  }
};

export default Transfer;
