export interface ICreditCard {
  message: string;
  data: CreditCard[] | [];
}
export interface ICreditCardAD {
  message: string;
  data: null;
}
export interface ICreditCardDetail {
  message: string;
  data: CreditCard;
}

export interface CreditCard {
  _id: string;
  number: string;
  name: string;
  expiryMonth: string;
  expiryYear: string;
  cvc?: string;
  type: string;
}
