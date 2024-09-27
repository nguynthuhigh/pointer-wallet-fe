import vndIcon from "../../assets/png/vnd_icon.png";
import usdIcon from "../../assets/png/usd_icon.png";
import ethIcon from "../../assets/png/eth_icon.png";
import { formatCurrency } from "../../utils/format_currency";

interface Wallet {
  img: string;
  currency: string;
}

export const wallet: Wallet[] = [
  {
    img: vndIcon,
    currency: "VND",
  },
  {
    img: usdIcon,
    currency: "USD",
  },
  {
    img: ethIcon,
    currency: "ETH",
  },
];

type Props = {
  balance: number;
  isSelected: boolean;
  isLoading: boolean;
  icon: string;
  currency: string;
  onClick: () => void;
};

export const Wallet: React.FC<Props> = ({
  balance,
  icon,
  currency,
  isSelected,
  isLoading,
  onClick,
}) => {
  return (
    <div
      className={`${
        isSelected ? "border-[#0094FF] shadow-lg" : "border-gray-300"
      } px-4 py-2 border-2 rounded-xl bg-white transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#F0F9FF] hover:border-[#0094FF] hover:shadow-lg`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <img
          src={icon}
          alt={currency + " Icon"}
          className="w-10 h-10 object-contain"
        />
        <div className="ml-3">
          <div className="text-lg font-semibold text-gray-800">{currency}</div>
          {isLoading ? (
            <div
              className={` w-full h-5 rounded-full animate-pulse bg-gray-400`}
            ></div>
          ) : (
            <div className="text-sm text-gray-600 max-w-16 truncate">
              {formatCurrency(balance, currency)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
