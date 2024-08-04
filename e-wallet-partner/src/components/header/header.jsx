import logo_white from '../../assets/svg/logo_white.svg'
import arrow_right from '../../assets/svg/arrow_right.svg'
import { Link } from "react-router-dom"
import { useEffect,useState } from 'react'
import partnerAPI from '../../api/partner.api'
import Cookies from "universal-cookie";
const Button = ({...props})=>{
    return ( 
        <Link className='ml-auto' to={props.link}><div className='w-[100px] border-[1px] border-white  h-[30px] justify-center text-[12px]  rounded-full items-center flex   bg-white text-color-default font-semibold'>
            <h1>{props.name}</h1>
            <img alt='' className='w-[4px] h-[7px] ml-2' src={arrow_right}></img>
            </div>
        </Link>
    )
}

export default function Home({...props}){
    const cookie = new Cookies()
    const [dashboard,setDashboard] = useState({link:'',name:''}) 
        useEffect(()=>{
            const token =cookie.get('token_auth')
            if(token){

            const fetchData = async () => {
                try {
                const partnerProfile = await partnerAPI.getProfilePartner();
                if(partnerProfile.status === 200){
                    setDashboard({name:'Dashboard',link:'/dashboard'})
                }
                } catch (error) {
                    setDashboard({name:'SignIn',link:'/sign-in'})
                }
            };
            fetchData(); }
            else{
                setDashboard({name:'SignIn',link:'/sign-in'})
            }
        },[])
    
    return(
        <div className={`w-full fixed z-10 py-4 ${!props.color ? '' : 'bg-color-default'}`}>
            <div className='flex items-center px-4 max-w-[1250px] mx-auto'>
                <Link to='/'>
                    <img alt='logo_presspay' src={logo_white}></img>
                </Link>
                <div className='max-md:hidden flex ml-10 w-[50%] justify-between text-[20px] font-semibold text-white'>
                    <Link to='/docs'>Documents</Link>
                    <Link >Community</Link>
                    <Link to='/download-app'>Download App</Link>
                    <Link to='/demo'>Payment Gateway</Link>
                </div>
                   <Button name={dashboard.name} link={dashboard.link}></Button>
            </div>
        </div>
    )
}