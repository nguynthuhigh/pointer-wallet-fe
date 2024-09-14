import { useState } from "react";
import toast from "react-hot-toast";
import Cards from "react-credit-cards-2";
import CurrencyInput from "react-currency-input-field";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import DrawerBottom from "./drawer_security";

interface DepositProps {
  cardId: string | null;
  currency: string | null;
}

export default function Withdraw({ cardId, currency }: DepositProps) {
  const [amount, setAmount] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const cardData = useSelector(
    (state: RootState) => state.cards.cardState.cards
  );

  const handleAmountChange = (value: string | undefined) => {
    setAmount(value || "");
  };
  const selectedCard = cardData.find((card) => card._id === cardId);

  const handleConfirmDeposit = () => {
    if (selectedCard) {
      setDrawerOpen(true);
    }
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold w-full text-center">Rút tiền</h2>

      <div className="mt-4">
        {selectedCard ? (
          <div className="flex justify-center mb-4">
            <Cards
              number={selectedCard.number}
              expiry={`${selectedCard.expiryMonth}/${selectedCard.expiryYear}`}
              cvc={selectedCard.cvv}
              name={selectedCard.name}
            />
          </div>
        ) : (
          toast.error("Không tìm thấy thẻ!")
        )}

        <div className="mb-4">
          <span className="font-semibold">Tiền tệ: </span>
          {currency}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="amount" className="font-semibold block mb-2">
          Số tiền:
        </label>
        <CurrencyInput
          name="amount"
          placeholder="Nhập số tiền"
          value={amount}
          decimalsLimit={2}
          onValueChange={handleAmountChange}
          className="border p-2 rounded w-full focus:border-blue-500"
          intlConfig={{ locale: "vi-VN", currency: currency || "VND" }}
        />
      </div>

      <div className={`w-full text-center`}>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          disabled={!amount}
          onClick={handleConfirmDeposit}
        >
          Xác nhận rút tiền
        </button>
      </div>

      <DrawerBottom
        onClose={() => setDrawerOpen(false)}
        state={drawerOpen}
        data={{
          currency: currency!,
          cardID: cardId!,
          security_code: "",
          amount: amount!,
          isDeposit: false,
        }}
      />
    </div>
  );
}
