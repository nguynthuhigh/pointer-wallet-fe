import logo from '../../assets/svg/logo_blue.svg'
import { useLocation } from 'react-router-dom';
import paymentAPI from '../../api/payment-gateway.api'
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabQrCode from './components/tab_qrcode';
import TabInfo from './components/tab_info';
import TabCard from './components/tab_card'
export default function PaymentGateway(){
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const [isLoading,setIsLoading] = useState(true)
    const [dataTransaction,setDataTransaction] = useState(null)
    const [currency,setCurrency] = useState('')
    const [isTab,setIsTab] = useState(true)
    const navigate = useNavigate()
    
    useEffect(()=>{
        const fetchTransaction = async ()=>{
            try {
                const response = await paymentAPI.PaymentGateway(token);
                if(response.status===200){
                    setDataTransaction(response.data.data)
                    setCurrency(response?.data.data.currency?.symbol)
                    setIsLoading(false)
                }
                if(response.status === 201){
                    window.location.replace(response.data.data)
                }
                
            } catch (error) {
                console.log(error)
                navigate('/*')
            }
        }
        fetchTransaction()
    },[])
    if(isLoading){
        return(<div>Loading transaction....</div>)
    }
    const handleTab = (e)=>{
        e.preventDefault();
        setIsTab(!isTab)
    }
    return(
        <section className={`bg-background-default bg-no-repeat  bg-cover bg-center font-inter '`}>
                <div className="h-[92px]  fixed w-full z-20 bg-white">
                    <div className="flex px-2 py-3 max-w-[1200px] mx-auto items-center">
                        <div>
                            <img className='ml-10' alt='' src={logo}></img>
                        </div>
                        <div className='text-[20px] ml-5 '>
                            Cổng thanh toán pressPay
                        </div>
                        {isTab ? <button disabled onClick={handleTab} className='bg-gray-100 w-fit flex items-center ml-auto transition delay-150 duration-300 ease-in-out border-[1.5px] px-4 py-2 rounded-lg  my-5 text-[#0094ff]  border-[#0094ff] font-semibold'>
                            Thẻ thanh toán quốc tế  <span className='text-[8px]'>(bảo trì)</span><img alt='' className='w-[30px] mx-[2px] border-[1px] border-gray-300 p-1 rounded-[5px]' src='https://static-00.iconduck.com/assets.00/visa-icon-2048x628-6yzgq2vq.png'></img>
                            <img alt='' className='w-[20px] mx-[2px] border-[1px] border-gray-300 p-1 rounded-[5px]' src='https://static-00.iconduck.com/assets.00/mastercard-icon-2048x1587-tygju446.png'></img>
                            <img alt='' className='w-[20px] mx-[2px] border-[1px] border-gray-300 p-1 rounded-[5px]' src='https://static-00.iconduck.com/assets.00/jcb-icon-2048x1537-sqmx1xp9.png'></img>
                        </button> : <button onClick={handleTab} className='w-fit flex items-center ml-auto transition delay-150 duration-300 ease-in-out border-[1.5px] px-4 py-2 rounded-lg  my-5 text-[#0094ff]  border-[#0094ff] font-semibold'>
                            Thanh toán với Qr Code
                        </button>}
                    </div>
                </div>

                <div className="max-w-[1200px] mx-auto h-[740px]  pt-10">
                    <div className="">
                        <div className='flex justify-between  py-20 inset-0 px-[100px] top-0 left-0 z-10'>
                            <TabInfo currency={currency} dataTransaction={dataTransaction}></TabInfo>
                            {isTab ? <TabQrCode dataTransaction={dataTransaction}></TabQrCode> : <TabCard dataTransaction={dataTransaction}></TabCard>}
                        </div>
                    </div>
                </div>
        </section>
    )
}

