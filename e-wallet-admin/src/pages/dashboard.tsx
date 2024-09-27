import SideBar from '../components/sidebar/sidebar'
import TotalStatistic from '../components/dashboard/total_statistic'
import TotalUser from '../assets/svg/total_user.svg'
import TotalTx from '../assets/svg/total_tx.svg'
import TotalPartner from '../assets/svg/total_partner.svg'
import TotalVol from '../assets/svg/total_vol.svg'
const DashBoard = () => {
  return (
    <div className='flex bg-gray-50 h-full'>
        <SideBar state={"Dashboard"}></SideBar>
        <div className='p-5 w-full'>
          <div className='grid lg:grid-cols-4 gap-5 md:grid-cols-2 sm:grid-cols-1'>
            <TotalStatistic image={TotalUser} color={'bg-indigo-100'} title="Total User" value={2000}></TotalStatistic>
            <TotalStatistic image={TotalPartner} color={'bg-yellow-50'} title="Total Partner" value={100}></TotalStatistic>
            <TotalStatistic image={TotalVol} color={'bg-green-50'} title="Total Volumns" value={20000}></TotalStatistic>
            <TotalStatistic image={TotalTx} color={'bg-orange-100'} title="Total Transaction" value={2200}></TotalStatistic>
          </div>
        </div>
    </div>
  )
}

export default DashBoard