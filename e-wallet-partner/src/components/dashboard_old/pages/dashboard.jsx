import Header from '../../header/header_dashboard'
import LogoVND from '../../../assets/svg/logo_vnd.svg'
import LogoETH from '../../../assets/svg/logo_eth.svg'
import LogoUSD from '../../../assets/svg/logo_usd.svg'
import {ItemInfo,ItemInfoLoading} from '../components/item_info';
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import partnerAPI from '../../../api/partner.api'
import { ItemBalance,ItemBalanceLoading } from '../components/item_balance';
import LastestPayment from '../components/lastest_payment'
export default function Dashboard(){
    const [privateKey,setPrivatekey] = useState('')
    const [partner, setPartner] = useState('')
    const [partnerWallet, setPartnerWallet] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
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
    
    return(
        <div>
            <Header index={"dashboard"}>

            </Header>
            <div className='max-w-[1200px] mx-auto p-4'>
                <div className='flex items-center'>
                    <img alt="" className='w-[120px] h-[120px] rounded-full' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"></img>
                    {!isLoading ? <div className='p-4'>
                        <div>
                            <h1 className=' text-[#8E8E8E]'>Name</h1>
                            <h1 className='text-3xl font-bold'>{partner.name}</h1>
                        </div>
                        <div className='grid mt-4 gap-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
                            <ItemInfo title="Wallet Address" info={partnerWallet?.address}/>
                            <ItemInfo title="Email" info={partner?.email}/>
                            <ItemInfo title="Private Key" info={privateKey}/>
                        </div>
                    </div> :
                    <div className='p-4 animate-pulse'>
                        <div>
                            <ItemInfoLoading></ItemInfoLoading>
                        </div>
                        <div className='grid mt-4 gap-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
                            <ItemInfoLoading></ItemInfoLoading>
                            <ItemInfoLoading></ItemInfoLoading>
                            <ItemInfoLoading></ItemInfoLoading>
                        </div> 
                    </div>}
                   
                </div>
                <div className='mt-5 font-bold text-3xl'>Balance</div>
                {!isLoading ? <div className='grid  gap-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-5'>
                    <ItemBalance logo={LogoVND} from="#12FFF7" end={partnerWallet?.currencies[0]?.balance} prefix="₫" separator="," decimal="" decimals="" currency="Vietnamese Dong"/>
                    <ItemBalance logo={LogoUSD} from="#12FFF7" to="#B3FFAB" end={partnerWallet?.currencies[1]?.balance} prefix="$" separator="," decimal="." decimals="2"  currency="US Dollar"/>
                    <ItemBalance logo={LogoETH} from="#EF32D9" to="#89FFFD" end={partnerWallet?.currencies[2]?.balance} suffix=" ETH" separator="," decimal="." decimals="2"  currency="Ethereum"/>
                </div>:
                <div className='grid  gap-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-5'>
                    <ItemBalanceLoading></ItemBalanceLoading>
                    <ItemBalanceLoading></ItemBalanceLoading>
                    <ItemBalanceLoading></ItemBalanceLoading>
                </div>}
                <div>
                    <LastestPayment></LastestPayment>
                </div>
            </div>
        </div>
    )
}