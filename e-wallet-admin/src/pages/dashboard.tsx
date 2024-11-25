import { useQuery } from '@tanstack/react-query'
import { AreaCard } from '@/components/chart/area-card'
import { HeaderComponent } from '@/components/header/header'
import {motion} from 'framer-motion'
import { Users } from 'lucide-react'
import { Handshake, TicketPercent, DollarSign } from 'lucide-react'
import { TransactionChart } from '@/components/chart/transaction-chart'
import { CategoryChart } from '@/components/chart/category-chart'
import { getTotalDashboard } from '@/api/dashboard.api'
import { IDashboardTotal } from '../interfaces/dashboard-item';

const DashBoard = () => {
  const {data:dashboard,isLoading,isError} = useQuery<IDashboardTotal>({
    queryKey: ['get-total-dashboard'],
    queryFn: () => getTotalDashboard()
  })
  if (isLoading) return 'Loading...'
  if (isError) return 'Fetching data error'

  return (
    <div className='flex-1 mx-auto overflow-auto h-screen'>
      <HeaderComponent title='Dashboard' />
      <main className='max-w-7xl mx-auto px-4 py-6 space-y-6'>
        <motion.div
            className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'
            initial = {{opacity: 0, y: 20}}
            animate = {{opacity:1 , y: 0}}
            transition={{duration:1.5}}
        >
          <AreaCard 
              name='Total Customers'
              icon={Handshake}
              value= {dashboard?.totalCustomer || 0}
              color='#3b82f6'
          />
          <AreaCard 
              name='Total Partners'
              icon={Users}
              value= {dashboard?.totalPartner || 0}
              color='#ec4899'
          />
          <AreaCard 
              name='Total Vouchers'
              icon={TicketPercent}
              value= {dashboard?.totalVoucher || 0}
              color='#f59e0b'
          />
          <AreaCard 
              name='Total Transactions'
              icon={DollarSign}
              value= {dashboard?.totalTransaction || 0}
              color='#10b981'
          />
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <TransactionChart/>
            <CategoryChart/>
        </div>
      </main>
    </div>

  )
}
export default DashBoard