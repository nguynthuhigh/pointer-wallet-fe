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

export default function DepositWithdraw() {
  const [isSelectedCard, setIsSelectedCard] = useState<string | null>(null);
  const [isSelectedCurrency, setIsSelectedCurrency] = useState<string | null>(
    "VND"
  );
  const [isDepositModalOpen, setIsDepositModalOpen] = useState<boolean>(false);

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
          <div>
            <div className="font-semibold text-gray-500 text-base">
              Chọn thẻ tín dụng
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cardData?.cardState?.cards.map((card) => (
                <div
                  key={card._id}
                  onClick={() => handleCardSelect(card._id ?? "")}
                  className={`my-4 rounded-[18px] shadow-lg cursor-pointer transition-all flex items-center justify-center w-fit ${
                    isSelectedCard === card._id
                      ? "border-2 border-blue-500"
                      : "border-2 border-gray-200"
                  } hover:bg-gray-200`}
                >
                  <Cards
                    number={card.number}
                    expiry={`${card.expiryMonth}/${card.expiryYear}`}
                    cvc={card.cvv}
                    name={card.name}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-6">
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

          {showActionButtons && (
            <div className="mt-6 flex gap-4 justify-center">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                onClick={handleDepositSelect}
              >
                Nạp tiền
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600">
                Rút tiền
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal for Deposit */}
      <Modal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
      >
        <Deposit
          cardId={isSelectedCard ?? ""}
          currency={isSelectedCurrency ?? ""}
        />
      </Modal>

      <Toaster position="top-center" />
    </div>
  );
}
