import React, { useEffect,useState } from 'react'
import CountUp from 'react-countup';
import {ChartDoughnut,ChartDoughnutLoading} from '../components/dashboard/chart';
import SideBar from '../components/dashboard/sidebar';
import { AssetBarLoading,AssetBar } from '../components/dashboard/assetsbar';
import RecentTransaction from '../components/dashboard/recent_transaction';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import partnerAPI from '../api/partner.api'
import Cookies from "universal-cookie";
const cookie = new Cookies()
const Dashboard = () => {
    const [privateKey,setPrivatekey] = useState('')
    const [partner, setPartner] = useState('')
    const [partnerWallet, setPartnerWallet] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        if(!cookie.get('token_auth')){
            navigate('/sign-in')
        }
        document.title = 'Dashboard'
        const fetchData = async () => {
          try {
            const partnerProfile = await partnerAPI.getProfilePartner();
            setPartner(partnerProfile.data.data.partner);
            setPrivatekey(partnerProfile.data.data.partner.privateKey);
            setPartnerWallet(partnerProfile.data.data.wallet)
            if(partnerProfile.data.data.partner?.name === undefined){
                navigate('/update-profile')
            }
          } catch (error) {
            console.log(error)
            navigate('/sign-in')
          }
          finally{
            setIsLoading(false)
          }
        };
        fetchData(); 
      },[]);
    return (
        <div className='flex'>
            <SideBar state="Dashboard"></SideBar>
            <div className='w-full p-4'>
                <div className='space-y-2'>
                    <h1 className='font-semi-4xl'>Welcome ,{isLoading ? '' :  <span className='text-color-default'>{partner.name}</span>}</h1>
                    <h1 className=''>Access & manage your account and transactions efficiently.</h1>
                </div>
                <div className='border rounded-xl p-6 shadow-sm flex'>
                    <div>
                        {isLoading ? <ChartDoughnutLoading/>: <ChartDoughnut vnd={partnerWallet.currencies[0].balance} usd={partnerWallet.currencies[1].balance*25000} eth={partnerWallet.currencies[2].balance*2500}></ChartDoughnut>}
                    </div>
                    <div className='px-4 w-full space-y-10'>
                        <div className='flex font-semi-lg'>
                            <h1>Statictis</h1>
                                <h1 className='ml-auto'>View more</h1>
                
                        </div>
                        <div className='h-fit mt-auto'>
                            <h1 className='text-gray-400'>VND Current Balance</h1>
                            <h1 className='font-bold font-inter text-4xl '> 
                                {isLoading ? '' : <CountUp  
                                    duration={2.5}
                                    prefix={'₫'}
                                    separator={','}
                                    start={0} 
                                    end={partnerWallet.currencies[0].balance}
                                    >
                                </CountUp>}
                            </h1>
                        </div>
                    </div>
                </div>
            <RecentTransaction></RecentTransaction>
            </div>
            <div className='w-[35%]'>
                {isLoading ? <AssetBarLoading></AssetBarLoading> : <AssetBar  partner={partner} wallet={partnerWallet}></AssetBar>}
            </div>
        </div>
  )
}

export default Dashboard