import SideBar from '../components/sidebar/sidebar'
import TotalUser from '../assets/svg/total_user.svg'
import TotalTx from '../assets/svg/total_tx.svg'
import TotalPartner from '../assets/svg/total_partner.svg'
import TotalVol from '../assets/svg/total_vol.svg'
import { useQuery, useQueryErrorResetBoundary } from '@tanstack/react-query'
import axiosInstance from '@/api/axiosInstance'
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
import { BarChart, Bar, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, Legend, YAxis, PieChart, Pie, Cell } from 'recharts';
import PaginateComponents from '@/components/paginate/paginate-component/paginate-component'
import TransactionHistory, { formatDate } from '@/components/transaction/transaction-history'
import { ITransaction } from '@/interfaces/transaction'
import { useContext, useState } from 'react'
import moment from 'moment';
import { DateFrom } from '@/components/date/date-from'
import { DateTo } from '@/components/date/date-to'
import { AreaCard } from '@/components/chart/area-card'
import { AreaChart } from '@/components/chart/area-chart'
import { AreaProgressChart } from '@/components/chart/area-progress-chart'
import { HeaderComponent } from '@/components/header/header'
import {motion} from 'framer-motion'
import { Users } from 'lucide-react'
import { BarChart2, Settings, MenuIcon, Handshake, TicketPercent, DollarSign } from 'lucide-react'
import { TransactionChartRegister } from '@/components/chart/transaction-chart'

const DashBoard = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(null)
  const [selectedToDate, setSelectedToDate] = useState<Date | null>(null)
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
  const { data: totalUsers } = useQuery({
    queryKey: ['admin-users-total'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v1/user/get-users`, {
        params: {
          page: 1,
          page_limit: 500
        }
      })
      return response.data.data.data.length
    }
  })

  //TotalPartners
  const { data: totalPartners } = useQuery({
    queryKey: ['admin-partners-total'],
    queryFn: async () => {
      const response = await axiosInstance.get(`api/v1/partner-management/get-partners`, {
        params: {
          page: 1,
          page_limit: 500
        }
      })
      return response.data.data.data.length
    }
  })

  //TotalTransactions
  const { data: totalTransactions } = useQuery({
    queryKey: ['admin-transactions-total'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v1/user/get-transactions`, {
        params: {
          page: 1,
          page_limit: 500
        }
      })
      return response.data.data.transactions.length
    }
  })

  //TotalVouchers
  const {data: totalVouchers} = useQuery({
    queryKey: ['admin-vouchers-total'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v1/admin/get-vouchers`, {
        params: {
          page:1,
          page_limit: 10
        }
      })
      return response.data.data.vouchers.length
    }
  })



  return (
    <div className='flex-1 mx-auto overflow-auto h-screen'>
      
      <HeaderComponent title='Dashboard' />
      <main className='max-w-7xl mx-auto px-4 py-6'>
        <motion.div
            className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 '
            initial = {{opacity: 0, y: 20}}
            animate = {{opacity:1 , y: 0}}
            transition={{duration:1.5}}
        >

          <AreaCard 
              name='Total Customers'
              icon={Handshake}
              value={totalUsers}
              color='#ec4899'
          />
          <AreaCard 
              name='Total Partners'
              icon={Users}
              value={totalPartners}
              color='#3b82f6'
          />
          <AreaCard 
              name='Total Vouchers'
              icon={TicketPercent}
              value= {totalVouchers}
              color='#f59e0b'
          />
          <AreaCard 
              name='Total Transactions'
              icon={DollarSign}
              value={totalTransactions}
              color='#10b981'
          />
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <TransactionChartRegister/>
        </div>
      </main>
    </div>

  )
}
export default DashBoard