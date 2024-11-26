import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query';
import { getThisMonth, getThisWeek } from '@/api/analyst.api';
import { useState } from 'react';
import { processMonth, processWeek } from '../../utils/format-date';
export const TransactionChart = () => {
    const [isClick, setIsClick] = useState<'week' | 'month'>('week')

    const {data:thisWeek,isLoading: isLoadingWeek,isError:isErrorWeek} = useQuery({
        queryKey: ['get-this-week-analyst'],
        queryFn: () => getThisWeek(),
    })

    const {data:thisMonth,isLoading: isLoadingMonth,isError:isErrorMonth} = useQuery({
        queryKey: ['get-this-month-analyst'],
        queryFn: () => getThisMonth(),
    })

    const isLoading = isLoadingWeek || isLoadingMonth 
    const isError = isErrorWeek || isErrorMonth
    
    if (isLoading) return 'Loading...'
    if (isError) return 'Fetching data error'
    
    const formatMonth = processMonth(thisMonth)
    const formatWeek = processWeek(thisWeek)

    return (    
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-[6px] p-6 border border-gray-700 '
            >
                <div className='flex flex-col mb-3'>
                    <p  
                        className='text-2xl font-medium mb-4 text-gray-100 '
                    >
                        Transaction Overview
                    </p>
                    <div className='space-x-[8px] rounded-[6px]'>
                        <button
                            onClick={() => setIsClick('week')}
                            className={`px-4 py-2 rounded-[6px] font-medium ${isClick === 'week' ? 'bg-blue-500 text-white' : ''}`}
                        >
                            This Week
                        </button>
                        <button 
                        onClick={() => setIsClick('month')}
                        className={`px-4 py-2 rounded-[6px] font-medium ${isClick === 'month' ? 'bg-blue-500 text-white' : ''}`}
                        >
                            This Month
                        </button>
                    </div>
                </div>
                <div className='h-80'>
                    <ResponsiveContainer width={"100%"} height={"100%"}>
                        <BarChart 
                            data={isClick === 'week' ? formatWeek : formatMonth }
                            width={100}
                        >
                            <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
                            <XAxis dataKey={isClick === 'week' ? 'date' : 'label'} stroke='#9CA3AF' />
                            <YAxis stroke='#9CA3AF' />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(31,42,55,0.8)',
                                    borderColor: '#4B5563'
                                }}
                                itemStyle={{ color: '#E5E7EB' }}
                            />
                            <Bar
                                type='monotone'
                                dataKey="transaction"
                                stroke='#3b82f6'
                                strokeWidth={2}
                                fill='#3b82f6'
                            />
                            <Legend/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </>
    )
}