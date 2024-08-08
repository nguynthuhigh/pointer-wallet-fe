import logo from '../../assets/svg/logo_blue.svg'
import { useLocation } from 'react-router-dom';
import {paymentAPI} from '../../services/api/payment.api'
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageNotFound from '../page_not_found';
import Loading from '../loading';
import DrawerBottom from './drawer_bottom';
import ApplyVoucher from './apply_voucher';
type Transaction = {
    _id: string | undefined
    partnerID:{
        image:string
    }
}
export const PaymentGateway: React.FC = ()=>{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const [isLoading,setIsLoading] = useState(true)
    const [dataTransaction,setDataTransaction] = useState<Transaction | null>()
    const [currency,setCurrency] = useState('')
    const [isTab,setIsTab] = useState(true)
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenVoucher, setIsOpenVoucher] = useState<boolean>(false);

    // useEffect(()=>{
    //     const fetchTransaction = async ()=>{
    //         try {
    //             const response = await paymentAPI(token);
    //             if(response.status===200){
    //                 setDataTransaction(response.data.data)
    //                 console.log(response.data.data)
    //                 setCurrency(response?.data.data.currency?.symbol)
    //                 setIsLoading(false)
    //             }
    //         } catch (error) {
    //             console.log(error)
    //             return <PageNotFound></PageNotFound>
    //         }
    //     }
    //     fetchTransaction()
    // },[])
    // if(isLoading){
    //     return(<Loading></Loading>)
    // }
    const handleTab = (e:Event)=>{
        e.preventDefault();
        setIsTab(!isTab)
    }
    const handlePayment = ()=>{

    }
    const handleClose = ()=>{
        setIsOpen(!isOpen)
    }
    const handleOpenVoucher = ()=>{
        setIsOpenVoucher(!isOpenVoucher)
    }
    return(
       <div>
        <div class={`p-6 mt-20`} >
            <div class={`flex items-center`}>
                <div class={`font-semibold space-y-2`}>
                    <h1 class={`text-lg`}>Hóa đơn từ pressPay Wallet</h1>
                    <h1 class={`text-6xl`}>$999</h1>
                    <h1 class={`text-gray-400 font-`}>2024-08-08 23:47:51</h1>
                </div>
                <img class={`w-20 h-20 object-cover rounded-xl ml-auto`} src={`https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg`}></img>
            </div>
            <div class={`border-b-2 border-dashed my-4`}></div>
            <div class={`space-y-2`}>
                <h1 class={`font-semibold text-xl my-5`}>Thông tin sản phẩm</h1>
                <div class={`flex `}>
                    <h1 class={`w-[50%] text-gray-400`}>Tên sản phẩm</h1>
                    <h1 class={`w-[50%] font-semibold`}>Áo postman 123123 123123123123</h1>
                </div>
                <div class={`flex`}>
                    <h1 class={`w-[50%] text-gray-400`}>Mã đơn hàng</h1>
                    <h1  class={`w-[50%] font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis`}>order000000111111111111111111111111111111111111111	</h1>
                </div>
                <div class={`flex`}>
                    <h1 class={`w-[50%] text-gray-400`}>Giao dịch hết hạn sau</h1>
                    <h1 class={`font-semibold`}>5p</h1>
                </div>
            </div>
            <div class={`border-b-2 border-dashed my-4`}></div>
            <h1 class={`font-semibold text-xl my-2`}>Ưu đãi</h1>
            <button class={`border border-blue-default border-dashed rounded-xl w-full p-3 text-blue-default font-semibold`} onClick={handleOpenVoucher}>Chọn thẻ quà tặng</button>
            <div class={`border-b-2 border-dashed my-4`}></div>
            <div class={`flex `}>
                    <h1 class={` text-gray-400`}>Tổng tiền</h1>
                    <h1 class={`ml-auto font-semibold`}>123123</h1>
                </div>
            <button class={`bg-blue-default text-lg font-semibold text-white w-full py-2 rounded-lg my-4`} onClick={handleClose}>Thanh toán</button>
        </div>
        {/* {!isLoading && <DrawerBottom id={dataTransaction?._id ? dataTransaction?._id : ''}  state={isOpen} onClose={handleClose}></DrawerBottom>} */}
        {isLoading && <DrawerBottom id={'123123'}  state={isOpen} onClose={handleClose}></DrawerBottom>}
        {isLoading && <ApplyVoucher  id={'123123'}  state={isOpenVoucher} onClose={handleOpenVoucher}></ApplyVoucher>}
       </div>
    )
}