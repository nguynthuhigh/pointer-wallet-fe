export interface ITransaction{
    _id: string;
    title?: string;
    message?: string;
    amount: number;
    status: string;
    type: string;

    currency?: {
      _id: string;
      symbol: string;
      name: string;
    };
    receiver?: {
      _id:string;
      email:string;
    }
    sender?: {
      _id:string;
      email: string;
      full_name:string;
      avatar:string;
    }
    createdAt: string;
    updatedAt?: string
}