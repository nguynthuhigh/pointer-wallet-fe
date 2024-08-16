export const convertCurrency = (amount:number, currency:string) => {
    if (currency === "VND") return amount;
    if (currency === "USD") return (amount * 25200);
    if (currency === "ETH") return (amount * 25000 * 3500);
  };