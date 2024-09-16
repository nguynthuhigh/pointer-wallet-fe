import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { FaCreditCard } from "react-icons/fa";
import HeaderDefault from "../../components/header/header_default";
import { Wallet, wallet } from "../../components/button/wallet";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Modal from "../credit-card/modal";
import Deposit from "./deposit";
import Withdraw from "./withdraw";

export default function DepositWithdraw() {
  const [isSelectedCard, setIsSelectedCard] = useState<string | null>(null);
  const [isSelectedCurrency, setIsSelectedCurrency] = useState<string | null>(
    "VND"
  );
  const [isDepositModalOpen, setIsDepositModalOpen] = useState<boolean>(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const walletData = useSelector((state: RootState) => state.user);
  const cardData = useSelector((state: RootState) => state.cards);

  useEffect(() => {
    if (cardData?.cardState?.cards.length === 0) {
      toast((t) => (
        <div className="flex items-center gap-2">
          <FaCreditCard size={24} />
          <span className="whitespace-nowrap">Vui lòng thêm thẻ tín dụng!</span>
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
    }
  }, [cardData?.cardState?.cards]);

  const handleCardSelect = (cardId: string) => {
    setIsSelectedCard(cardId);
  };

  const handleCurrencySelect = (currency: string) => {
    setIsSelectedCurrency(currency);
  };

  const handleDepositSelect = () => {
    setIsDepositModalOpen(true);
  };

  const handleWithdrawSelect = () => {
    setIsWithdrawModalOpen(true);
  };

  const showActionButtons = isSelectedCard && isSelectedCurrency;

  return (
    <div className="p-4 border bg-white m-2 rounded-xl shadow-lg h-fit w-full">
      <HeaderDefault title="Nạp/Rút" />
      {cardData?.isFetching ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="animate-pulse p-4 bg-gray-300 rounded-xl h-[182px] w-[290px] shadow-md mx-auto"
            ></div>
          ))}
        </div>
      ) : (
        <>
          <div >
          <div className="flex flex-col mt-6 mx-auto">
            <div className="font-semibold text-gray-600 text-lg mb-2">
              Chọn nguồn tiền
            </div>
            <div className="flex items-center gap-4 flex-wrap max-w-full">
              {wallet.map((value, index) => (
                <Wallet
                  key={index}
                  icon={value.img}
                  currency={value.currency}
                  balance={
                    walletData?.userState?.walletData?.currencies?.[index]
                      ?.balance
                  }
                  isSelected={isSelectedCurrency === value.currency}
                  isLoading={walletData.isFetching}
                  onClick={() => handleCurrencySelect(value.currency)}
                />
              ))}
            </div>
          </div>

            <div className="font-semibold text-gray-500 text-base">
              Chọn thẻ tín dụng
            </div>
            <div className="grid grid-cols-1 sm:grid-flow-col-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cardData?.cardState?.cards.map((card) => (
                <div
                  key={card._id}
                  onClick={() => handleCardSelect(card._id ?? "")}
                  className={`my-1 rounded-[18px] md:w-fit shadow-lg cursor-pointer transition-all flex items-center justify-center  ${
                    isSelectedCard === card._id
                      ? "border-4 border-blue-500"
                      : "border-2 border-gray-200"
                  } hover:bg-gray-200`}
                >
                 <div class={`max-md:hidden mx-auto w-fit`}>
                  <Cards
                      number={card.number}
                      expiry={`${card.expiryMonth}/${card.expiryYear}`}
                      cvc={card.cvv}
                      name={card.name}
                    />
                 </div>
                 <div class={`md:hidden w-full flex items-center p-2`}>
                  <img class={`w-10 h-fit`} src={`https://static-00.iconduck.com/assets.00/visa-icon-2048x628-6yzgq2vq.png`}></img>
                  <div class={`font-semibold ml-4`}>
                    <h1>{card.number}</h1>
                    <h1 class={`text-sm`}>{card.type}</h1>
                  </div>
                 
                  {
                    isSelectedCard === card._id 
                    ? <div class={`rounded-full border-[1px] w-5 h-5 bg-blue-500 ml-auto flex justify-center items-center`}>
                        <div class={`rounded-full w-3 h-3 bg-white flex justify-center items-center`}>
                          <div class={`rounded-full w-[7px] h-[7px] bg-blue-500`}>
                          
                          </div>
                        </div>
                      </div> 
                    : <div class={`rounded-full w-5 h-5 bg-blue-500 ml-auto flex justify-center items-center`}>
                        <div class={`rounded-full w-3 h-3 bg-white`}></div>
                      </div>
                  }
                 </div>
                </div>
              ))}
            </div>
          </div>
       
          {showActionButtons && (
            <div className="mt-6 flex gap-4 justify-center">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                onClick={handleDepositSelect}
              >
                Nạp tiền
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                onClick={handleWithdrawSelect}
              >
                Rút tiền
              </button>
            </div>
          )}
        </>
      )}

      <Modal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
      >
        <Deposit
          cardId={isSelectedCard ?? ""}
          currency={isSelectedCurrency ?? ""}
        />
      </Modal>

      <Modal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
      >
        <Withdraw
          cardId={isSelectedCard ?? ""}
          currency={isSelectedCurrency ?? ""}
        />
      </Modal>

      <Toaster position="top-center" />
    </div>
  );
}
