import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import CreditCard from "../../assets/svg/cCard.svg";
import HeaderDefault from "../../components/header/header_default";
import { Wallet, wallet } from "../../components/button/wallet";
import Modal from "../credit-card/components/modal";
import Deposit from "./deposit";
import Withdraw from "./withdraw";
import { useGetProfileQuery } from "../../redux/features/profile/profileApi";
import { useGetCreditCardsQuery } from "../../redux/features/credit-card/creditCardApi";

export default function DepositWithdraw() {
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetProfileQuery(undefined, {
    pollingInterval: 20000,
    skipPollingIfUnfocused: true,
  });
  const { data: cards, isLoading: isLoadingCards } = useGetCreditCardsQuery(
    undefined,
    {
      pollingInterval: 20000,
      skipPollingIfUnfocused: true,
    }
  );
  const walletData = user?.data.walletData;
  const cardData = cards?.data;
  useEffect(() => {
    if (cardData && cardData.length === 0) {
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
  }, [cards?.data]);
  const [isSelectedCard, setIsSelectedCard] = useState<string | null>(null);
  const [isSelectedCurrency, setIsSelectedCurrency] = useState<string | null>(
    "VND"
  );
  const [selectedBalance, setSelectedBalance] = useState<number>(
    walletData?.currencies?.[0]?.balance || 0
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
  const filterCards =
    cardData &&
    cardData.filter(
      (card) => card.type === "visa" || card.type === "mastercard"
    );
  return (
    <div className="p-4 border bg-white sm:m-2 rounded-xl shadow-lg h-fit w-full">
      <HeaderDefault title="Nạp/Rút" />
      {cardData?.length === 0 ? (
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
          {isLoadingCards ? (
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
                      balance={walletData?.currencies?.[index]?.balance || 0}
                      isSelected={isSelectedCurrency === value.currency}
                      isLoading={isLoading}
                      onClick={() =>
                        handleCurrencySelect(
                          value.currency,
                          walletData?.currencies?.[index]?.balance || 0
                        )
                      }
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="font-semibold text-gray-600 text-lg mb-2">
                  Chọn thẻ tín dụng
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 self-center justify-items-center align-items-center">
                  {filterCards &&
                    filterCards.map((card) => (
                      <div
                        key={card._id}
                        onClick={() => handleCardSelect(card._id ?? "")}
                        className={` rounded-[18px] shadow-lg cursor-pointer w-fit transition-all flex items-center justify-center ${
                          isSelectedCard === card._id
                            ? "border-4 border-blue-500"
                            : "border-2 border-gray-200"
                        } hover:bg-gray-200`}
                      >
                        <div class={`max-md:hidden mx-auto w-fit`}>
                          <Cards
                            number={card.number}
                            expiry={`${card.expiryMonth}/${card.expiryYear}`}
                            cvc={card.cvc || 0}
                            name={card.name}
                          />
                        </div>

                        <div class={`md:hidden w-full flex items-center p-2`}>
                          <img
                            class={`w-10 h-fit`}
                            src={`https://static-00.iconduck.com/assets.00/visa-icon-2048x628-6yzgq2vq.png`}
                          ></img>
                          <div class={`font-semibold ml-4`}>
                            <h1>{card.number}</h1>
                            <h1 class={`text-sm`}>{card.type}</h1>
                          </div>
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
