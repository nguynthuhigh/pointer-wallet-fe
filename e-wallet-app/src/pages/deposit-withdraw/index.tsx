import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spin, Card, Tabs, Button, Modal } from "antd";
import toast, { Toaster } from "react-hot-toast";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

import { Wallet, wallet } from "../../components/button/wallet";
import Deposit from "./deposit";
import Withdraw from "./withdraw";
import { useGetProfileQuery } from "../../redux/features/profile/profileApi";
import { useGetCreditCardsQuery } from "../../redux/features/credit-card/creditCardApi";
import Loading from "../loading";

export default function DepositWithdraw() {
  const { data: user, isLoading } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: cards, isLoading: isLoadingCards } = useGetCreditCardsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const walletData = user?.data.walletData;
  const cardData = cards?.data;

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

  if (isLoading || isLoadingCards) {
    return <Loading />;
  }

  useEffect(() => {
    if (cardData && cardData.length === 0) {
      toast.error("Vui lòng thêm thẻ tín dụng!", {
        duration: 5000,
        position: "top-center",
      });
    }
  }, [cardData]);

  const handleCardSelect = (cardId: string) => {
    setIsSelectedCard(cardId);
  };

  const handleCurrencySelect = (currency: string, balance: number) => {
    setIsSelectedCurrency(currency);
    setSelectedBalance(balance);
  };

  const filterCards =
    cardData &&
    cardData.filter(
      (card) => card.type === "visa" || card.type === "mastercard"
    );

  return (
    <Card title="Nạp/Rút Tiền" className="w-full max-w-4xl mt-2">
      {isLoading || isLoadingCards ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="small" />
        </div>
      ) : cardData && cardData.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-500 mb-4">
            Bạn chưa liên kết với bất kỳ thẻ nào!
          </p>
          <Button type="primary">
            <Link to="/credit-card">Liên kết thẻ</Link>
          </Button>
        </div>
      ) : (
        <Tabs
          defaultActiveKey="deposit"
          className="w-full mt-4"
          items={[
            {
              key: "deposit",
              label: "Nạp tiền",
              children: (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {filterCards &&
                      filterCards.map((card) => (
                        <div
                          key={card._id}
                          onClick={() => handleCardSelect(card._id ?? "")}
                          className={`rounded-[18px] shadow-lg cursor-pointer w-fit transition-all flex items-center justify-center ${
                            isSelectedCard === card._id
                              ? "border-4 border-blue-500"
                              : "border-2 border-gray-200"
                          } hover:bg-gray-200`}
                        >
                          <div className="max-md:hidden mx-auto w-fit">
                            <Cards
                              number={card.number}
                              expiry={`${card.expiryMonth}/${card.expiryYear}`}
                              cvc={card.cvc || 0}
                              name={card.name}
                            />
                          </div>
                          <div className="md:hidden w-full flex items-center p-2">
                            <img
                              className="w-10 h-fit"
                              src="https://static-00.iconduck.com/assets.00/visa-icon-2048x628-6yzgq2vq.png"
                            />
                            <div className="font-semibold ml-4">
                              <h1>{card.number}</h1>
                              <h1 className="text-sm">{card.type}</h1>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="mt-8 flex justify-center">
                    <Button
                      type="primary"
                      onClick={() => setIsDepositModalOpen(true)}
                    >
                      Nạp tiền
                    </Button>
                  </div>
                </>
              ),
            },
            {
              key: "withdraw",
              label: "Rút tiền",
              children: (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {filterCards &&
                      filterCards.map((card) => (
                        <div
                          key={card._id}
                          onClick={() => handleCardSelect(card._id ?? "")}
                          className={`rounded-[18px] shadow-lg cursor-pointer w-fit transition-all flex items-center justify-center ${
                            isSelectedCard === card._id
                              ? "border-4 border-blue-500"
                              : "border-2 border-gray-200"
                          } hover:bg-gray-200`}
                        >
                          <div className="max-md:hidden mx-auto w-fit">
                            <Cards
                              number={card.number}
                              expiry={`${card.expiryMonth}/${card.expiryYear}`}
                              cvc={card.cvc || 0}
                              name={card.name}
                            />
                          </div>
                          <div className="md:hidden w-full flex items-center p-2">
                            <img
                              className="w-10 h-fit"
                              src="https://static-00.iconduck.com/assets.00/visa-icon-2048x628-6yzgq2vq.png"
                            />
                            <div className="font-semibold ml-4">
                              <h1>{card.number}</h1>
                              <h1 className="text-sm">{card.type}</h1>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="mt-8 flex justify-center">
                    <Button danger onClick={() => setIsWithdrawModalOpen(true)}>
                      Rút tiền
                    </Button>
                  </div>
                </>
              ),
            },
          ]}
        />
      )}

      <Modal
        title="Nạp tiền"
        open={isDepositModalOpen}
        onCancel={() => setIsDepositModalOpen(false)}
        footer={null}
      >
        <Deposit
          cardId={isSelectedCard ?? ""}
          currency={isSelectedCurrency ?? ""}
          balance={selectedBalance}
        />
      </Modal>

      <Modal
        title="Rút tiền"
        open={isWithdrawModalOpen}
        onCancel={() => setIsWithdrawModalOpen(false)}
        footer={null}
      >
        <Withdraw
          cardId={isSelectedCard ?? ""}
          currency={isSelectedCurrency ?? ""}
          balance={selectedBalance}
        />
      </Modal>
      <Toaster position="top-center" />
    </Card>
  );
}
