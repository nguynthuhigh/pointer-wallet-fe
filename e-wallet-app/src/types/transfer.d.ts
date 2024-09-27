export type User = {
  _id: string;
  full_name: string;
  email: string;
  avatar: string;
};
export type DataSend = {
  amount: number;
  message: string;
  receiver: string;
  currency: string;
  security_code: string;
};
export type Currency = [{
  _id: string;
  balance: number;
  currency: string;
}];
export type TypeWallet = {
  _id: string;
  balance: number;
};

export type TransactionData = {
  amount: number;
  message: string;
  currency: {
    symbol: string;
  };
  sender: {
    email: string;
    full_name: string;
    avatar: string;
  };
  receiver: {
    email: string;
    full_name: string;
    avatar: string;
  };
  createdAt: date;
};
export type Card = {
  number: string;
  name: string;
  cvv: number;
  expiryMonth: number;
  expiryYear: number;
  type: string;
};
