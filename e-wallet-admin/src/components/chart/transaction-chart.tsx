import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion'
import { useState } from 'react';
export const TransactionChart = () => {
    const [isClick, setIsClick] = useState<'week' | 'month'>('week')

    const data = [
        {
            name: "6d ago", transaction: 30
        },
        {
            name: "5d ago", transaction: 40
        },
        {
            name: "4d ago", transaction: 10
        },
        {
            name: "3d ago", transaction: 12
        },
        {
            name: "2d ago", transaction: 19
        },
        {
            name: "1d ago", transaction: 26
        },
        {
            name: "today", transaction: 7
        }
    ];
    const data1 = [
        {
            name: "3 weeks ago", transaction: 30
        },
        {
            name: "2 weeks ago", transaction: 40
        },
        {
            name: "1 week ago", transaction: 10
        },
        {
            name: "this month", transaction: 10
        },
       
    ];
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
                        className='text-2xl font-medium mb-4 text-gray-100'
                    >
                        Transaction Overview
                    </p>
                    <div className=' space-x-[8px] px-2 rounded-[6px]'>
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
                        <LineChart data={isClick === 'week' ? data : data1}>
                            <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
                            <XAxis dataKey={"name"} stroke='#9CA3AF' />
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
                                dataKey='transaction'
                                stroke='#6366F1'
                                strokeWidth={3}
                                dot={{ fill: '#6366F1', strokeWidth: 2, r: 5 }}
                                activeDot={{ r: 8, strokeWidth: 2 }}
                            />
                            <Legend/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </>
    )
}