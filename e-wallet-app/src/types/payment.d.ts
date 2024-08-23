export type ApplyVoucher = {
    transactionID:string | null | undefined,
    code:string
}
export type TransactionSend = {
    transactionID:string,
    security_code:string,
    voucher_code:string
}
export type TransactionPayment = {
    _id: string,
    createdAt:Date,
    orderID:string,
    message:string,
    createdAt:Date,
    partnerID:{
        _id:string,
        image:string
        name:string,
    }
    amount:number,
    currency:{
        symbol:string
    }
}
