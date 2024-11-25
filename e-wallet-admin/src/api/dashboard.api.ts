import axiosInstance from "./axiosInstance"

export async function getTotalDashboard() {
    const response = await axiosInstance.get('/api/v1/admin-analyst/get-total-dashboard')
    return response.data.data
}