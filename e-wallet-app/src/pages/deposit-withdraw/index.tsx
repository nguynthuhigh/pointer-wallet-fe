import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import toast, { Toaster } from "react-hot-toast";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { FaCreditCard } from "react-icons/fa";
import HeaderDefault from "../../components/header/header_default";
import { Wallet, wallet } from "../../components/button/wallet";
import { getProfileAPI } from "../../services/api/user.api";
import { getAllCards } from "../../services/api/credit-card.api";
import { Card } from "../../services/api/credit-card.api";
const cookie = new Cookies();
const accessToken = cookie.get("token_auth");
interface Currencies {
  _id: string;
  balance: number;
  currency: string;
}

export default function DepositWithdraw() {
  const [currencies, setCurrencies] = useState<Currencies[]>([]);
  const [listCards, setListCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShowing, setIsShowing] = useState<boolean>(true);
  const [isSelected, setIsSelected] = useState<number>(0);
  const navigate = useNavigate();
  const fetchCurrencies = async (): Promise<void> => {
    try {
      const response = await getProfileAPI();
      if (response.status === 200) {
        setCurrencies(response.data?.data?.walletData?.currencies);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCurrencies();
    getListCards();
  }, [accessToken]);
  const getListCards = async (): Promise<void> => {
    try {
      const response = await getAllCards();
      if (Array.isArray(response) && response.length == 0) {
        setIsShowing(true);
        toast((t) => (
          <div className="flex items-center gap-2">
            <FaCreditCard size={24} />
            <span className={`whitespace-nowrap`}>
              Vui lòng thêm thẻ tín dụng!
            </span>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded whitespace-nowrap"
              onClick={() => {
                toast.dismiss(t.id);
                navigate("/credit-card/add-card");
              }}
            >
              Thêm thẻ
            </button>
          </div>
        ));
      } else if (response !== undefined) {
        setListCards(response);
        setIsShowing(true);
      } else {
        toast.error("Đã xảy ra lỗi!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`p-4`}>
      <HeaderDefault title="Nạp / Rút" />
      {isShowing ? null : (
        <div>
          {listCards.map((card, index) => {
            return (
              <Cards
                key={index}
                number={card.number}
                expiry={`${card.expiryMonth}/${card.expiryYear}`}
                cvc={card.cvv}
                name={card.name}
              />
            );
          })}
          <div className={`flex items-center justify-between mt-4`}>
            {wallet.map((value, index) => {
              return (
                <Wallet
                  icon={value.img}
                  currency={value.currency}
                  balance={currencies[index]?.balance}
                  isSelected={isSelected === index}
                  isLoading={isLoading}
                  onClick={() => setIsSelected(index)}
                />
              );
            })}
          </div>
        </div>
      )}
      <Toaster position="top-center" />
      <Outlet />
    </div>
  );
}
