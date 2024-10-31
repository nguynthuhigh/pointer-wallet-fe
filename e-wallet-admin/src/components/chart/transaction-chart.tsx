import axiosInstance from "@/api/axiosInstance"
import { useQuery } from "@tanstack/react-query"




export const TransactionChartRegister = () => {
    const {data:transactions} = useQuery({
        queryKey: ['transactions-chart'],
        queryFn: async () => {
            const respone = await axiosInstance(`api/v1/admin/get-transactions`)
            return respone.data.data
        }
    
    })
    console.log(transactions)
    return (
        <>
            <div>San</div>
        </>
    )
}