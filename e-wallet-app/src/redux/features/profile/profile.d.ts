export interface IProfile {
  message: string;
  data: Data;
}

export interface Data {
  userData: UserData;
  walletData: WalletData;
}

export interface UserData {
  _id: string;
  avatar: string;
  email: string;
  password: string;
  inactive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  security_code: string;
  full_name: string;
}

export interface WalletData {
  _id: string;
  address: string;
  mnemonic: string;
  balance: number;
  userID: string;
  partnerID: any;
  currencies: Currency[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Currency {
  balance: number;
  currency: Currency2;
  _id: string;
}

export interface Currency2 {
  _id: string;
  symbol: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
