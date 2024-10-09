import SideBar from '../components/sidebar/sidebar'
import TotalStatistic from '../components/dashboard/total_statistic'
import TotalUser from '../assets/svg/total_user.svg'
import TotalTx from '../assets/svg/total_tx.svg'
import TotalPartner from '../assets/svg/total_partner.svg'
import TotalVol from '../assets/svg/total_vol.svg'
import { useQuery, useQueryErrorResetBoundary } from '@tanstack/react-query'
import axiosInstance from '@/components/API/axiosInstance'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BarChart, Bar,ResponsiveContainer, Tooltip, CartesianGrid, XAxis, Legend, YAxis,PieChart,Pie,Cell} from 'recharts';
import PaginateComponents from '@/components/paginate/paginateComponent/PaginateComponents'
import TransactionHistory, { formatDate } from '@/components/transaction/TransactionHistory'
import { ITransaction } from '@/interface/transaction'
import { useContext, useState } from 'react'
import moment from 'moment';
import { DateFrom } from '@/components/Date/DateFrom/dateFrom'
import { DateTo } from '@/components/Date/DateTo/dateTo'
import { AreaCard } from '@/components/Chart/AreaCard'
import { AreaChart } from '@/components/Chart/AreaChart'
import { AreaProgressChart } from '@/components/Chart/AreaProgressChart'
const DashBoard = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedFromDate,setSelectedFromDate] = useState<Date | null>(null)
  const [selectedToDate,setSelectedToDate] = useState<Date | null>(null)
  //Handle
    
  // const itemsPerPage = 10;
  // const {data,isLoading,isError} = useQuery({
  //   queryKey:['admin-transactions',currentPage],
  //   queryFn: async () => {
  //     const response = await axiosInstance.get(`/api/v1/admin/get-transactions`)
  //     return response.data.data
  //   }
  // })
  // console.log(data)
  // if (isLoading) return 'Loading...'
  // if(isError) return 'Error Fetching Data'

  // const getNumber = (index:number) => {
  //   const customID = (currentPage - 1) * itemsPerPage + index + 1;
  //   return `${customID.toString().padStart(2,'0')}`
  // }
  // const handlePageClick = (e: {selected: number}) => {
  //   setCurrentPage(e.selected + 1);
  // }

  //TotalUsers
  const {data:totalUsers} = useQuery({
    queryKey: ['admin-users-total'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v1/user/get-users`,{
        params: {
          page:1,
          page_limit: 500
        }
      })
      return response.data.data.data.length
    }
  })

  //TotalPartners
  const {data:totalPartners} = useQuery({
    queryKey: ['admin-partners-total'],
    queryFn: async () => {
      const response = await axiosInstance.get(`api/v1/partner-management/get-partners`,{
        params: {
          page:1,
          page_limit:500
        }
      })
      return response.data.data.data.length
    }
  })

  //TotalTransactions
  const {data:totalTransactions} = useQuery({
    queryKey: ['admin-transactions-total'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v1/user/get-transactions`,{
        params: {
          page:1,
          page_limit:500
        }
      })
      return response.data.data.transactions.length
    }
  })



  return (  
      <div className='flex bg-gray-50 h-full'>
          <SideBar state={"Chart Dashboard"} ></SideBar>
          <div className='p-5 w-full ml-[220px]'>
            <div className='flex justify-between items-center'> 
              <div >
                <div id="Title" className='text-3xl font-bold'>Dashboard</div>
                <div id="detail" className='text-[#0094FF] text-lg'>Access & manage your service pressPay!</div>
              </div>
              
              <div className='flex gap-x-[10px]'>
                <div id="FromDate" className=' relative z-20'>
                  <DateFrom selectedFromDate={selectedFromDate} setSelectedFromDate={setSelectedFromDate}/>
                </div>
                <div id="ToDate" className=' relative z-20'>
                  <DateTo selectedToDate={selectedToDate} setSelectedToDate={setSelectedToDate}/>
              </div>
            </div>
            </div>
            <div className='flex gap-x-[30px] mt-2'>
              <AreaCard title='Total Users' value={totalUsers} textInfo='Users Growth Rate: +2,5%' color='#0094FF'/>
              <AreaCard title='Total Partners' value={totalPartners} textInfo='Partners Growth Rate: +1,2%' color='#F59E0B'/>
              <AreaCard title='Total Vouchers' value={50} textInfo='Redeemed Vouchers: 40' color='#C11574'/>
              <AreaCard title='Total Transactions' value={totalTransactions} textInfo='Transactions Success Rate: 90%' color='#039855'/>
            </div>
            <div className='flex justify-between gap-4'>
              <div className='w-[70%]'>
                <AreaChart/>
              </div>
              <div className='w-[30%]'>
                <AreaProgressChart/>
              </div>
            </div>
            
            {/* <div >
              <Table>
                    <TableHeader className="uppercase" >
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
                    {data.map((transactions:ITransaction,index:number) => (
                        <TableRow key={index}>
                            <td className="pl-3">{getNumber(index)}</td>
                            <TransactionHistory {...transactions}/>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableFooter>
                    <TableRow>
                       <PaginateComponents pageCount={data.pageCount} handlePageClick={handlePageClick}/>
                    </TableRow>
                    </TableFooter>
                </Table>
            </div> */}
            
          </div>
          
      </div>
  )
}
export default DashBoard