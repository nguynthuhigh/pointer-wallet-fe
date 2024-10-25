import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaArrowUpLong } from "react-icons/fa6";
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ITransaction } from '@/interfaces/transaction';
import TransactionHistory from '../transaction/transaction-history';
import { useState } from 'react';
export const AreaChart = () => {
    const data1 = [
        {
          month: '6d ago',
          Completed: 90,
          Fail: 120,
          
        },
        {
          month: '5d ago',
          Completed: 30,
          Fail: 70,
          
        },
        {
          month: '4d ago',
          Completed: 20,
          Fail: 50,
         
        },
        {
          month: '3d ago',
          Completed: 40,
          Fail: 30,
          
        },
        {
          month: '2d ago',
          Completed: 90,
          Fail: 70,
          
        },
        {
          month: '1d ago',
          Completed: 50,
          Fail: 30,
          
        },
        {
          month: 'Today',
          Completed: 40,
          Fail: 40,
          
        }
      ];
    const [selected,setSelected] = useState<string>('week')
    const handleClickSelected = (option:string) => {
      setSelected(option)
    }
    const itemsPerPage = 20
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {data,isLoading,isError} = useQuery({
      queryKey: ['chart-transactions'],
      queryFn: async () => {
        const response = await axiosInstance.get(`/api/v1/admin/get-transactions`,{
          params:{
            page:1,
            page_limit: itemsPerPage
          }
        })
        return response.data.data.transactions
      }
    })
    if (isLoading) return 'Loading...'
    if (isError) return 'Fetching Data Error'
    console.log('API Data Transactions', data)


    const formatX = (value:number) => {
        return `${value}K`
    }
    const formatTooltip = (value:number) => {
        return `${value}K`
    }
    const formatLengend = (value:string) => {
        return value.charAt(0).toUpperCase() + value.slice(1)
    }
    // const handlePageClick = (e: {selected:number}) => {
    //   setCurrentPage(e.selected + 1)
    // };
    const getNumber = (index:number) => {
      const customNumber = (currentPage - 1) * itemsPerPage + index + 1
      return customNumber.toString().padStart(2,'0')
    }
    
  return (
    <>      
        <div style={{background: '#FFFFFF',borderRadius: '8px',border: '1px solid #0094FF', marginTop: '20px'}}>
            <div className='ml-5 mt-5'>
                <p className='font-semibold text-2xl'>Total Transactions</p>
                <div className='flex items-center mt-2'>
                    <div className='flex items-center font-bold text-3xl'>$50.4K <FaArrowUpLong/> </div>
                    <div className='text-lg text-green-600 font-semibold'>5% than last month</div>
                </div>
                <div className='text-sm font-semibold flex gap-x-[10px] cursor-pointer'>
                  <p className={`border-[1px] bg-[#0094FF] px-2 py-1 rounded-[8px] text-black my-2  ${selected === 'week' ? 'bg-[#0094FF] text-white border-[#0094FF] border-[1px] hover:shadow-md hover:shadow-[#0094FF]/50 duration-300 transition-all' : 'bg-transparent text-black'}`} onClick={() => handleClickSelected('week')}>This Week</p>
                  <p className={`border-[1px] bg-[#0094FF] px-2 py-1 rounded-[8px] text-black my-2  ${selected === 'month' ? 'bg-[#0094FF] text-white border-[#0094FF] border-[1px] hover:shadow-md hover:shadow-[#0094FF]/50 duration-300 transition-all' : 'bg-transparent text-black'}`} onClick={() => handleClickSelected('month')}>This Month</p>
                </div>
            </div>

            <div className='h-[250px]'>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                width={400}
                height={200}
                data={data1}
                margin={{
                    top: 5,
                    right: 10,
                    left: 5,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="4 5" />
                <XAxis padding={{left: 10}} dataKey='month' tickSize={0} axisLine={false}/>
                <YAxis padding={{bottom: 10, top: 10}} tickFormatter={formatX} tickCount={12} axisLine={false} tickSize={0} />
                <Tooltip formatter={formatTooltip} cursor={{fill: 'transparent'}} />
                <Legend iconType='circle' iconSize={8} verticalAlign='bottom' align='center' formatter={formatLengend} wrapperStyle={{ fontSize: '20px', fontWeight: 'bold'}}  />
                <Bar dataKey="Completed"  fill="#0094FF" activeBar={true} isAnimationActive={true} barSize={24} radius={[4,4,4,4]} />
                <Bar dataKey="Fail" fill="#FF1717" activeBar={true} isAnimationActive={true} barSize={24} radius={[4,4,4,4]}/>
                </BarChart>
            </ResponsiveContainer>
            </div> 
        </div>
        <div>
        <Table>
                <TableHeader className="uppercase sticky" >
                    <TableRow>
                        <TableHead className="text-[#1A3E5F] font-bold">No.</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold">Messenger</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold ">Amount</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold">Status</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold">Join Date</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold">Type</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((transactionDetail: ITransaction, index: number) => (
                        <TableRow key={index}>
                            <td className="pl-3">{getNumber(index)}</td>
                            <TransactionHistory {...transactionDetail} />
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        {/* <PaginateComponents pageCount={data.pageCount} handlePageClick={handlePageClick} /> */}
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
            
    </>
  )
}

