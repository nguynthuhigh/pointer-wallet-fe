import logo from '../../assets/svg/logo_blue.svg'
import { useLocation } from 'react-router-dom';
import {paymentAPI} from '../../services/api/payment.api'
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageNotFound from '../page_not_found';
import Loading from '../loading';
import DrawerBottom from './drawer_bottom';
type Transaction = {
    _id: string | undefined
}
export const PaymentGateway: React.FC = ()=>{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const [isLoading,setIsLoading] = useState(true)
    const [dataTransaction,setDataTransaction] = useState<Transaction | null>()
    const [currency,setCurrency] = useState('')
    const [isTab,setIsTab] = useState(true)
    
    useEffect(()=>{
        const fetchTransaction = async ()=>{
            try {
                const response = await paymentAPI(token);
                if(response.status===200){
                    setDataTransaction(response.data.data)
                    setCurrency(response?.data.data.currency?.symbol)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error)
                return <PageNotFound></PageNotFound>
            }
        }
        fetchTransaction()
    },[])
    if(isLoading){
        return(<Loading></Loading>)
    }
    const handleTab = (e:Event)=>{
        e.preventDefault();
        setIsTab(!isTab)
    }
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handlePayment = ()=>{

    }
    const handleClose = ()=>{
        setIsOpen(!isOpen)
    }
    return(
       <div>
        <button onClick={handleClose}>Thanh toán</button>
        {!isLoading && <DrawerBottom id={dataTransaction?._id ? dataTransaction?._id : ''}  state={isOpen} onClose={handleClose}></DrawerBottom>}
       </div>
    )
}