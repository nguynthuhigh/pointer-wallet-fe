export const symbolCurrency = (currency:string) => {
    if (currency === "VND") return 'đ';
    if (currency === "USD") return '$';
    if (currency === "ETH") return 'ETH';
    return ' '
  };