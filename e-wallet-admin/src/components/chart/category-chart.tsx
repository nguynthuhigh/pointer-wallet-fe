import { getTypeTransactions } from '@/api/analyst.api'
import { IGetTypeTransactions } from '@/interfaces/analyst'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

export const CategoryChart = () => {

    const {data:getTypeTransaction,isLoading,isError} = useQuery<IGetTypeTransactions[]>({
        queryKey: ['get-type-transaction-analyst'],
        queryFn: () => getTypeTransactions()
    })
    console.log(getTypeTransaction)
    if (isLoading) return 'Loading...'
    if (isError || !getTypeTransaction || getTypeTransaction.length === 0) return 'Fetching data error'

    const colors = ['#EC4899','#8B5CF6','#10B981','#F59E0B','#FF1813']
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-[6px] p-6 border border-gray-700 '
            >
                <p
                    className='text-2xl font-medium mb-4 text-gray-100 '
                >
                    Type Transactions
                </p>
                <div className='h-80'>
                    <ResponsiveContainer width={"100%"} height={"100%"}>
                        <PieChart>
                            <Pie
                                data={getTypeTransaction}
                                dataKey='value'
                                cx={"50%"}
                                cy={"50%"}
                                labelLine={false}
                                outerRadius={100}
                                fill='#8884d8'
                                label = {({name,percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                            {getTypeTransaction.map((_,index:number) => (
                                <Cell   
                                    key={`cell-${index}`} 
                                    fill={colors[index % colors.length]} 
                                />
                            ))}    
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(31,41,55,0.8)',
                                    borderColor: '#4B5563'
                                }}
                                itemStyle={{color: '#E5E7EB'}}
                            />
                            <Legend/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </>
    )
}