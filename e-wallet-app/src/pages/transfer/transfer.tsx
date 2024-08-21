import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import SearchUser from "./search_user";
import InputAmount from "./input_amount";
import SelectCurrency from "./select_currency";
import { useState, useEffect } from "react";
import { Currency, User } from "../../types/transfer";
import { getProfileAPI } from "../../services/api/user.api";
import SideBar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
const Transfer = () => {
  const [step, setStep] = useState("select_currency");
  const [selectCurrency, setSelectCurrency] = useState<Currency>();
  const [wallet, setWallet] = useState();
  const [userData, setUserData] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const cookies = new Cookies();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfileAPI(cookies.get("token_auth"));
        if (response.status === 200) {
          setWallet(response.data.data.walletData.currencies);
          setIsLoading(false);
        }
      } catch (error) {
        navigate("/auth/login");
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);
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
  if (isLoading) {
    return <div>...Loading</div>;
  }
  switch (step) {
    case "select_currency":
      return (
        <>
          <Header></Header>
          <div class={`flex`}>
          <SideBar state='Chuyển tiền'></SideBar>
          <SelectCurrency
            currency={wallet}
            handleCurrencyData={handleCurrencyData}
            handleStepTransfer={handleStepTransfer}
          />
          </div>
        </>
       
      );
    case "search_user":
      return (
        <>
          <Header></Header>
        <div class={`flex`}>
          <SideBar state='Chuyển tiền'></SideBar>
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
        <Header></Header>
        <div class={`flex`}>
          <SideBar state='Chuyển tiền'></SideBar>
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
