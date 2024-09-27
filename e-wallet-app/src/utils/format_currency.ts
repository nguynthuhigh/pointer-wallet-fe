export const formatCurrency = (balance: any, currency: any) => {
  if (!currency) {
    return "error";
  }
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  });
  return formatter.format(balance);
};
export const unFormatCurrency = (formattedCurrency: string): number => {
  const numericString = formattedCurrency
    .replace(/[^\d.-]/g, "")
    .replace(/(?<=\.\d*)\./g, "");
  const numericValue = parseFloat(numericString);
  const roundedValue = Math.round(numericValue);
  if (isNaN(roundedValue)) {
    return 0;
  }
  return roundedValue;
};
