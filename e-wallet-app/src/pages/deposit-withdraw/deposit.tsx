import { useState } from "react";
import toast from "react-hot-toast";
import Cards from "react-credit-cards-2";
import { useSelector } from "react-redux";
import CurrencyInput from "react-currency-input-field";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { formatCurrency } from "../../utils/format_currency";
import { RootState } from "../../redux/store";
import DrawerBottom from "./drawer_security";

interface DepositProps {
  cardId: string | null;
  currency: string | null;
  balance: number;
}

export default function Deposit({ cardId, currency, balance }: DepositProps) {
  const [amount, setAmount] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const cardData = useSelector(
    (state: RootState) => state.cards.cardState.cards
  );
  const walletAddress = useSelector(
    (state: RootState) => state.user.userState.walletData.address
  );

  const MIN_DEPOSIT = currency === "USD" ? 10 : 10000;
  const MAX_DEPOSIT = currency === "USD" ? 1000 : 10000000;

  const handleAmountChange = (value: string | undefined) => {
    if (currency === "VND") {
      const numericValue = value
        ? parseFloat(value.replace(/[^0-9.-]+/g, ""))
        : 0;
      if (numericValue % 1 !== 0) {
        toast.error("Số tiền nạp bằng VND phải là số chẵn!");
        return;
      }
    }
    setAmount(value || "");
  };

  const selectedCard = cardData.find((card) => card._id === cardId);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("Đã sao chép địa chỉ ví!");
  };

  const handleConfirmDeposit = () => {
    const numericAmount = parseFloat(amount.replace(/[^0-9.-]+/g, ""));

    if (numericAmount < MIN_DEPOSIT) {
      toast.error(`Số tiền nạp tối thiểu là ${MIN_DEPOSIT.toLocaleString()}!`);
      return;
    }

    if (numericAmount > MAX_DEPOSIT) {
      toast.error(`Số tiền nạp tối đa là ${MAX_DEPOSIT.toLocaleString()}!`);
      return;
    }

    if (currency === "VND" && numericAmount % 100 !== 0) {
      toast.error("Số tiền nạp phải là số chẵn!");
      return;
    }

    if (currency !== "ETH" && selectedCard) {
      setDrawerOpen(true);
    }
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold w-full text-center">Nạp tiền</h2>

      <div className="mt-4">
        {currency === "ETH" ? (
          <div className="mb-4 text-center flex items-center space-x-5">
            <span className="font-semibold">Địa chỉ ví: </span>
            <div className="mt-2 flex items-center justify-center max-w-xs w-full">
              <input
                type="text"
                value={walletAddress}
                readOnly
                className="border p-2 rounded w-full text-center bg-gray-100 cursor-pointer"
                onClick={handleCopyAddress}
              />
              <button
                onClick={handleCopyAddress}
                className="ml-2 bg-blue-500 text-white px-3 py-2 rounded-lg whitespace-nowrap"
              >
                Sao chép
              </button>
            </div>
          </div>
        ) : selectedCard ? (
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

        {currency !== "ETH" && (
          <>
            <div className="mb-4">
              <span className="font-semibold">Tiền tệ: </span>
              {currency}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Số dư: </span>
              {balance ? formatCurrency(balance, currency) : 0}
            </div>
          </>
        )}
      </div>

      {currency !== "ETH" && (
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
            maxLength={10}
          />
        </div>
      )}

      {currency !== "ETH" && (
        <div className={`w-full text-center`}>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            disabled={!amount}
            onClick={handleConfirmDeposit}
          >
            Xác nhận nạp tiền
          </button>
        </div>
      )}

      <DrawerBottom
        onClose={() => setDrawerOpen(false)}
        state={drawerOpen}
        data={{
          currency: currency!,
          cardID: cardId!,
          security_code: "",
          amount: amount!,
          isDeposit: true,
        }}
      />
    </div>
  );
}
