import wallet_ic from '../../../assets/svg/wallet_ic.svg'
import home_ic from '../../../assets/svg/home_ic.svg'
import logo_blue from '../../../assets/svg/logo_blue.svg'
import { Link,useNavigate } from 'react-router-dom'
import Cookies from "universal-cookie"

const ItemButton = ({...props})=>{
    return(
        <li>
            <button  onClick={props.action} to={props.link} class="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <img alt=''  src={props.icon}></img>
               <span class="ms-3">{props.title}</span>
            </button>
         </li>
    )
}
const ItemLink = ({...props})=>{
    return(
        <li>
            <Link  to={props.link} class="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <img alt='' className='w-[15px]' src={props.icon}></img>
               <span class="ms-3">{props.title}</span>
            </Link>
         </li>
    )
}
export default function MenuBar(){
    const cookie = new Cookies()
    const navigate = useNavigate()

    const handleLogout = ()=>{
        cookie.remove('token_auth')
        navigate('/')
    }
    return(
        <>
            


   <div class="h-full w-[25%] px-3 py-4 overflow-y-auto bg-gray-10 dark:bg-gray-800">
        <Link to='/' class="flex items-center ps-2.5 mb-5">
            <img src={logo_blue} class="h-12 me-3 " alt="pressPay Logo" />
        </Link>
      <ul class="space-y-2 font-medium">
         <ItemLink title="Home" link='/dashboard' icon={home_ic}></ItemLink>
         <ItemLink title="Payment" link='/dashboard/payment' icon={wallet_ic}></ItemLink>

        
      </ul>
      <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
        <ItemButton title="Logout" action={handleLogout}></ItemButton>
         </ul>
      
   </div>
        </>

    )
}