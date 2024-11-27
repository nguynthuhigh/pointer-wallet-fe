import { formatCurrency } from "../../utils/format_currency";

const FormatTypeCurrency = ({ ...props }) => {
  const amount = formatCurrency(
    props.item.amount,
    props?.item?.currency?.symbol ? props.item.currency.symbol : "VND"
  );
  const data = props.item;

  if (data.type === "payment") {
    return (
      <h1 className="w-full font-semibold text-base text-end text-red-500">
        -{amount}
      </h1>
    );
  }

  if (data.type === "transfer" && data.sender?._id === props?.userID) {
    return (
      <h1 className="w-full font-semibold text-base text-end text-red-500">
        -{amount}
      </h1>
    );
  }

  if (data.type === "transfer" && data.sender?._id !== props?.userID) {
    return (
      <h1 className="w-full font-semibold text-base text-end text-green-500">
        +{amount}
      </h1>
    );
  }

  if (data.type === "refund" || data.type === "deposit") {
    return (
      <h1 className="w-full font-semibold text-base text-end text-green-500">
        +{amount}
      </h1>
    );
  }

  if (data.type === "withdraw") {
    return (
      <h1 className="w-full font-semibold text-base text-end text-red-500">
        -{amount}
      </h1>
    );
  }

  if (data.type === "withdraw-partner") {
    return (
      <h1 className="w-full font-semibold text-base text-end text-green-500">
        +{amount}
      </h1>
    );
  }

  return (
    <h1 className="w-full font-semibold text-base text-end text-gray-500">
      {amount}
    </h1>
  );
};

export default FormatTypeCurrency;
