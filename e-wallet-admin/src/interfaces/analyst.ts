
export interface IGetThisWeek {
    date: string,
    transaction: number
}

export interface IGetThisMonth {
    data: string,
    transaction: number
} 

export interface IGetTypeTransactions {
    name: string,
    value: number
}

export interface IGetCustomerAnalyst {
    totalCustomer: number,
    totalCustomerToday: number,
    totalCustomerActive: number,
    totalCustomerInactive: number,
}

export interface IGetPartnerAnalyst {
    totalPartner: number,
    totalPartnerToday: number,
    totalPartnerActive: number,
    totalPartnerInactive: number,
}

export interface IGetTransactionAnalyst {
    totalTransaction: number,
    totalTransactionToday: number,
    transactionCompleted: number,
    transactionRate: number,
}

export interface IGetTransaction1DAnalyst {
    date: string,
    transactions: number
}

export interface IGetTransaction1WAnalyst {
    date: string,
    transactions: number
}

export interface IGetTransaction1MAnalyst {
    date: string,
    transactions: number
}