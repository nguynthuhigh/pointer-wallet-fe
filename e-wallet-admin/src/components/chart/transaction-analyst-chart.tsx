import { getTransaction1DAnalyst, getTransaction1MAnalyst, getTransaction1WAnalyst } from "@/api/analyst.api"
import { IGetTransaction1DAnalyst, IGetTransaction1MAnalyst, IGetTransaction1WAnalyst } from "@/interfaces/analyst"
import { useQuery } from "@tanstack/react-query"
import { AlignCenter } from "lucide-react"
import { useState } from "react"
import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
export const TransactionAnalystChart = () => {
    const [isOpen,setIsOpen] = useState<'1d' | '1w' | '1m'>('1d')

    const { data: Transaction1d, isLoading: Loading1d, isError: Error1d } = useQuery<IGetTransaction1DAnalyst>({
        queryKey: ['get-transactions-1d'],
        queryFn: () => getTransaction1DAnalyst()
    })
    const { data: Transaction1w, isLoading: Loading1w, isError: Error1w } = useQuery<IGetTransaction1WAnalyst>({
        queryKey: ['get-transactions-1w'],
        queryFn: () => getTransaction1WAnalyst()
    })
    const { data: Transaction1m, isLoading: Loading1m, isError: Error1m } = useQuery<IGetTransaction1MAnalyst>({
        queryKey: ['get-transactions-1m'],
        queryFn: () => getTransaction1MAnalyst()
    })

    if (Loading1d || Loading1w || Loading1m) return 'Loading...'
    if (Error1d || Error1w || Error1m) return 'Fetching data error'

    return (
        <>
            <div className="h-80 bg-gray-800 border-[1px] border-gray-700 rounded-[6px] " >
            <p className="text-2xl font-medium text-blue-500 p-3">Transaction Date</p>
                <p className="flex items-center ">
                    <p className="text-lg text-gray-400 px-3 hover:border-b active:border-b">1D</p>
                    <p className="text-lg text-gray-400 px-3 hover:border-b active:border-b">1W</p>
                    <p className="text-lg text-gray-400 px-3 hover:border-b active:border-b">1M</p>
                </p>
                <ResponsiveContainer width={'100%'} height={'80%'}>
                    <LineChart
                        data={Transaction1w}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                        <XAxis dataKey={'date'} stroke='#9CA3AF' />
                        <YAxis stroke='#9CA3AF' />
                        <Tooltip />
                        <Line
                            type='monotone'
                            dataKey="transaction"
                            stroke="#6366F1"
                        />
                        <Legend align= 'right'  verticalAlign= 'top' />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}