import axiosInstance from "./axiosInstance"

export const getThisWeek = async () => {
    const response = await axiosInstance.get('/api/v1/admin-analyst/get-this-week-analyst')
    return response.data.data
}

export const getThisMonth = async () => {
    const response = await axiosInstance.get('/api/v1/admin-analyst/get-this-month-analyst')
    return response.data.data
}

export const getTypeTransactions = async () => {
    const response = await axiosInstance.get('/api/v1/admin-analyst/get-type-transaction-analyst')
    return response.data.data
}

export const getCustomerAnalyst = async () => {
    const response = await axiosInstance.get('/api/v1/admin-analyst/get-customer-analyst')
    return response.data.data
}

export const getPartnerAnalyst = async () => {
    const response = await axiosInstance.get('/api/v1/admin-analyst/get-partner-analyst')
    return response.data.data
}

export const getTransactionAnalyst = async () => {
    const response = await axiosInstance.get('/api/v1/admin-analyst/get-transaction-analyst')
    return response.data.data
}

export const getTransaction1DAnalyst = async ({date}: {date:Date | '' | null}) => {
    const response = await axiosInstance.get(`/api/v1/admin-analyst/get-transactions-1d?date=${date}`)
    return response.data.data
}

export const getTransaction1WAnalyst = async ({start,end} : {start:Date | '' | null, end:Date | '' | null }) => {
    const response = await axiosInstance.get(`/api/v1/admin-analyst/get-transactions-1w?start=${start}&end=${end}`)
    return response.data.data
}

export const getTransaction1MAnalyst = async ({start,end} : {start:Date | '' | null, end:Date | '' | null }) => {
    const response = await axiosInstance.get(`/api/v1/admin-analyst/get-transactions-1m?start=${start}&end=${end}`)
    return response.data.data
}