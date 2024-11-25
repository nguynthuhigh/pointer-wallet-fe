
export interface IGetThisWeek {
    date: string,
    transaction: number
}

export interface IGetThisMonth {
    start: string,
    end: string,
    transaction: number
} 

export interface IGetTypeTransactions {
    name: string,
    value: number
}

export interface IGetCustomerAnalyst {
    totalCustomer: string,
    totalCustomerToday: string,
    totalCustomerActive: string,
    totalCustomerInactive: string,

}