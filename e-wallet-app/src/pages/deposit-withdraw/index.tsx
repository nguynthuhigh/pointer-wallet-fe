import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import CreditCard from "../../assets/svg/cCard.svg";
import HeaderDefault from "../../components/header/header_default";
import { Wallet, wallet } from "../../components/button/wallet";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Modal from "../credit-card/modal";
import Deposit from "./deposit";
import Withdraw from "./withdraw";

export default function DepositWithdraw() {
  const navigate = useNavigate();
  const walletData = useSelector((state: RootState) => state.user);
  const cardData = useSelector((state: RootState) => state.cards);
  useEffect(() => {
    if (cardData?.cardState?.cards.length === 0) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-fit px-3 py-2 bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex items-center gap-2">
            <img src={CreditCard} className={`w-8 h-8`} />
            <span className={` whitespace-nowrap text-gray-600 text-base`}>
              Vui lòng thêm thẻ tín dụng!
            </span>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded whitespace-nowrap"
              onClick={() => {
                toast.dismiss(t.id);
                navigate("/credit-card");
              }}
            >
              Thêm thẻ
            </button>
          </div>
        </div>
      ));
    }
  }, [cardData?.cardState?.cards]);
  const [isSelectedCard, setIsSelectedCard] = useState<string | null>(null);
  const [isSelectedCurrency, setIsSelectedCurrency] = useState<string | null>(
    "VND"
  );
  const [selectedBalance, setSelectedBalance] = useState<number>(
    walletData?.userState?.walletData?.currencies?.[0]?.balance
  );
  const [isDepositModalOpen, setIsDepositModalOpen] = useState<boolean>(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] =
    useState<boolean>(false);

  const handleCardSelect = (cardId: string) => {
    setIsSelectedCard(cardId);
  };

  const handleCurrencySelect = (currency: string, balance: number) => {
    setIsSelectedCurrency(currency);
    setSelectedBalance(balance);
  };

  const handleDepositSelect = () => {
    setIsDepositModalOpen(true);
  };

  const handleWithdrawSelect = () => {
    setIsWithdrawModalOpen(true);
  };

  const showActionButtons = isSelectedCard && isSelectedCurrency;

  return (
    <div className="p-4 border bg-white sm:m-2 rounded-xl shadow-lg h-fit w-full">
      <HeaderDefault title="Nạp/Rút" />
      {cardData?.cardState?.cards.length === 0 ? (
        <div
          className={`flex items-center justify-center text-lg text-gray-500`}
        >
          Bạn chưa liên kết với bất kỳ thẻ nào!
          <span className={`ml-2`}>
            <Link
              to={`/credit-card`}
              className={`text-blue-default font-semibold`}
            >
              Liên kết thẻ.
            </Link>
          </span>
        </div>
      ) : (
        <>
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
                <div className="font-semibold text-gray-600 text-lg mb-2">
                  Chọn thẻ tín dụng
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 self-center justify-items-center align-items-center">
                  {cardData?.cardState?.cards.map((card) => (
                    <div
                      key={card._id}
                      onClick={() => handleCardSelect(card._id ?? "")}
                      className={`my-4 rounded-[18px] shadow-lg cursor-pointer transition-all flex items-center justify-center w-fit ${
                        isSelectedCard === card._id
                          ? "border-4 border-blue-500"
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
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 flex-wrap">
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
                      onClick={() =>
                        handleCurrencySelect(
                          value.currency,
                          walletData?.userState?.walletData?.currencies?.[index]
                            ?.balance
                        )
                      }
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
        </>
      )}

      <Modal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
      >
        <Deposit
          cardId={isSelectedCard ?? ""}
          currency={isSelectedCurrency ?? ""}
          balance={selectedBalance}
        />
      </Modal>

      <Modal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
      >
        <Withdraw
          cardId={isSelectedCard ?? ""}
          currency={isSelectedCurrency ?? ""}
          balance={selectedBalance}
        />
      </Modal>

      <Toaster position="top-center" />
    </div>
  );
}
