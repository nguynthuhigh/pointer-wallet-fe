const FormatTitle = ({ ...props }) => {
  const transactionData: any = props?.item;

  if (
    transactionData?.type === "transfer" &&
    transactionData?.sender?._id === props?.userID
  ) {
    return (
      <h1 className="font-semibold text-base overflow-hidden w-full">
        Chuyển tiền đến{" "}
        {transactionData?.receiver?.full_name || "người dùng không xác định"}
      </h1>
    );
  }

  if (
    transactionData?.type === "transfer" &&
    transactionData?.sender?._id !== props?.userID
  ) {
    return (
      <h1 className="font-semibold text-base overflow-hidden w-full">
        Nhận tiền từ{" "}
        {transactionData?.sender?.full_name || "người dùng không xác định"}
      </h1>
    );
  }

  if (transactionData?.type === "payment") {
    return (
      <h1 className="font-semibold text-base overflow-hidden w-full">
        {transactionData?.title || "Giao dịch thanh toán"}
      </h1>
    );
  }

  if (transactionData?.type === "refund") {
    return (
      <h1 className="font-semibold text-base overflow-hidden w-full">
        {transactionData?.title || "Hoàn tiền"}
      </h1>
    );
  }

  if (transactionData?.type === "deposit") {
    return (
      <h1 className="font-semibold text-base overflow-hidden w-full">
        {transactionData?.title || "Nạp tiền"}
      </h1>
    );
  }

  if (transactionData?.type === "withdraw") {
    return (
      <h1 className="font-semibold text-base overflow-hidden w-full">
        {transactionData?.title || "Rút tiền"}
      </h1>
    );
  }

  if (transactionData?.type === "withdraw-partner") {
    return (
      <h1 className="font-semibold text-base overflow-hidden w-full">
        {transactionData?.title || "Rút tiền đối tác"}
      </h1>
    );
  }

  return (
    <h1 className="font-semibold text-base overflow-hidden w-full">
      Không có tiêu đề
    </h1>
  );
};

export default FormatTitle;
