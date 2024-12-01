import { getTransaction1DAnalyst, getTransaction1MAnalyst, getTransaction1WAnalyst } from "@/api/analyst.api"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { DateFrom } from "../date/date-from"
import { DateTo } from "../date/date-to"
export const TransactionAnalystChart = () => {
    const today = new Date();
    const [isOpen, setIsOpen] = useState<'1d' | '1w' | '1m'>('1d')
    const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(null);
    const [selectedToDate, setSelectedToDate] = useState<Date | null>(null);

    const { data: Transaction1d, isLoading: Loading1d, isError: Error1d } = useQuery({
        queryKey: ['get-transactions-1d', selectedFromDate],
        queryFn: () => getTransaction1DAnalyst({
            date: selectedFromDate || today
        })
    })
    const { data: Transaction1w, isLoading: Loading1w, isError: Error1w } = useQuery({
        queryKey: ['get-transactions-1w', selectedFromDate, selectedToDate],
        queryFn: () => getTransaction1WAnalyst({
            start: selectedFromDate,
            end: selectedToDate
        })
    })
    const { data: Transaction1m, isLoading: Loading1m, isError: Error1m } = useQuery({
        queryKey: ['get-transactions-1m', selectedFromDate, selectedToDate],
        queryFn: () => getTransaction1MAnalyst({
            start: selectedFromDate,
            end: selectedToDate
        })
    })

    if (Loading1d || Loading1w || Loading1m) return 'Loading...'
    if (Error1d || Error1w || Error1m) return 'Fetching data error'

    const clearFilters = () => {
        setSelectedFromDate(null);
        setSelectedToDate(null)
    }
    return (
        <>
            <div className="bg-gray-800 backdrop-opacity-70 backdrop-blur-md  shadow-lg border border-gray-700 p-6 rounded-[6px]">
                <div className="flex justify-between mb-5">
                    <div className="">
                        <p
                            className='text-3xl font-medium text-gray-100'
                        >
                            Transaction Date
                        </p>
                        <div className='space-x-[8px] rounded-[6px] flex items-end mt-3'>
                            <button
                                onClick={() => {
                                    setIsOpen('1d')
                                    setSelectedFromDate(null)
                                    setSelectedToDate(null)
                                }}
                                className={`px-4 py-2 rounded-[6px] font-medium ${isOpen === '1d' ? 'bg-blue-500 text-white' : null}`}
                            >
                                1d
                            </button>
                            <button
                                onClick={() => {
                                    setIsOpen('1w')
                                    setSelectedFromDate(null)
                                    setSelectedToDate(null)
                                }}
                                className={`px-4 py-2 rounded-[6px] font-medium ${isOpen === '1w' ? 'bg-blue-500 text-white' : null}`}
                            >
                                1w
                            </button>
                            <button
                                onClick={() => {
                                    setIsOpen('1m')
                                    setSelectedFromDate(null)
                                    setSelectedToDate(null)
                                }}
                                className={`px-4 py-2 rounded-[6px] font-medium ${isOpen === '1m' ? 'bg-blue-500 text-white' : ''}`}
                            >
                                1m
                            </button>
                        </div>
                    </div>
                    <div className="flex items-end space-x-[20px] ">
                        <DateFrom
                            selectedFromDate={selectedFromDate}
                            setSelectedFromDate={setSelectedFromDate}
                        />
                        <DateTo
                            selectedToDate={selectedToDate}
                            setSelectedToDate={setSelectedToDate}
                        />
                        <button
                            className="bg-blue-500 h-[42px] w-[100px] rounded-[6px] font-semibold uppercase text-center"
                            onClick={clearFilters}>
                            Delete
                        </button>
                    </div>
                </div>
                <div className="h-80">
                    <ResponsiveContainer
                        width='100%'
                        height='100%'
                    >
                        <LineChart
                            width={500}
                            height={400}
                            data={isOpen === '1d' ? Transaction1d : isOpen === '1w' ? Transaction1w : Transaction1m}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke='#4B5563' />
                            <XAxis dataKey='date' stroke='#9CA3AF' />
                            <YAxis stroke='#9CA3AF' />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(31,42,55,0.8)',
                                    borderColor: '#4B5563'
                                }}
                                itemStyle={{ color: '#E5E7EB' }}
                            />
                            <Line
                                type='monotone'
                                dataKey='transactions'
                                stroke="#6366F1"
                                strokeWidth={3}
                                dot={{ fill: '#6366F1', strokeWidth: 3, r: 5 }}
                                activeDot={{ r: 8, strokeWidth: 3 }}
                            />
                            <Legend />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </>
    )
}