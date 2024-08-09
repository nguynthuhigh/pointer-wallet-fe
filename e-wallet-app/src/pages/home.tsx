import { useEffect, useState } from 'preact/compat';
import CashInIcon from '../assets/svg/cashin.svg'
import VNDIcon from '../assets/png/vnd_icon.png'
import USDIcon from '../assets/png/usd_icon.png'
import ETHIcon from '../assets/png/eth_icon.png'
import ButtonFeature from '../components/home/button_feat';
import {ItemCurrency,ItemCurrencyLoading} from '../components/home/item_currency';
import Settings_Icon from '../assets/svg/settings.svg';
import HistoryIcon from '../assets/svg/history_trans.svg'
import Cookies from "universal-cookie";
import { useNavigate } from 'react-router-dom';
import { getProfileAPI } from '../services/api/user.api';
import { formatCurrency } from '../utils/format_currency';
const Home = () => {
  const navigate = useNavigate()
  const cookies = new Cookies()
  type TypeUser = {
    _id: string,
    email: string,
    full_name: string,
    avatar:string
  }
  type TypeWallet = {
    currencies: [
        {
            balance: number,
        },
        {
            balance: number,
        },
        {
            balance: number,
        }
    ]
}
  const [userData,setUserData] = useState<TypeUser | null>()
  const [walletData,setWalletData] = useState<TypeWallet>()
  const [isLoading,setIsLoading] = useState<Boolean>(true)
  useEffect(() => {
    const fetchProfile=async()=>{
      try {
        const token =  await cookies.get('token_auth')
        if(!token){
          navigate('/auth/login')
          //redirect to welcome etc
        }
        
        const response =  await getProfileAPI(cookies.get('token_auth'))
        if(response.status === 200){
          setWalletData(response.data.data.walletData)
          setUserData(response.data.data.userData)
          console.log(response.data.data.userData)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
        navigate('/auth/login')
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, []);

  return (
    <div class={`p-4`}>
      <div className="flex">
        {isLoading ? <div className={`rounded-full w-[50px] h-[50px] animate-pulse`}></div> : <img src={userData?.avatar}
            className={`rounded-full w-[50px] h-[50px] object-cover`}></img>}
        <div class={`mx-3 h-full my-auto`}>
            <h1 className={`text-gray-500 text-sm`}>Chào buổi sáng</h1>
            
            {isLoading ? <div class={`w-[200px] h-4 bg-gray-200 rounded-full animate-spin`}></div> : <h1 class={`font-semibold text-lg`}>{userData?.full_name}</h1>}
        </div>
        <img class={`ml-auto hover:rotate-90 w-6 h-6 cursor-pointer`} src={Settings_Icon}></img>
      </div>
      <div>
      {isLoading ? <div class={`w-[200px] h-4 bg-gray-200 rounded-full animate-spin`}></div> : <h1 className={`font-semibold text-4xl  my-6`}>{formatCurrency(walletData?.currencies[0].balance,'VND')}</h1>}

        
      </div>
      <div className="grid grid-flow-row grid-cols-5 gap-1">
        <ButtonFeature image={CashInIcon} title="Gửi"></ButtonFeature>
        <ButtonFeature image={HistoryIcon} title="Nhận"></ButtonFeature>
        <ButtonFeature link='/scan-qrcode' image={CashInIcon} title="Quét mã"></ButtonFeature>
        <ButtonFeature image={CashInIcon} title="Nạp/Rút"></ButtonFeature>
        <ButtonFeature link='/transaction/history' image={HistoryIcon} title="Lịch sử"></ButtonFeature>
      </div>
      <div class={`h-[1px] w-full bg-button-hover my-5`}></div>
      <h1 class={`my-5 text-2xl font-semibold`}>Tài sản</h1>
      {isLoading ? <ItemCurrencyLoading></ItemCurrencyLoading> : <><ItemCurrency image={VNDIcon} item={walletData?.currencies[0]} symbol={'VND'} name="Vietnamese Dong"></ItemCurrency>
      <ItemCurrency image={USDIcon} item={walletData?.currencies[1]} symbol={'USD'} name="US Dollar"></ItemCurrency>
      <ItemCurrency image={ETHIcon} item={walletData?.currencies[2]} symbol={'ETH'} name="Ethereum"></ItemCurrency></>}
    </div>
  );
}

export default Home;
