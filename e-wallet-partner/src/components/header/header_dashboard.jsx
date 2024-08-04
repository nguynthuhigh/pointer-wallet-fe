import arrow_right from '../../assets/svg/arrow_right.svg'
import { Link,useNavigate } from "react-router-dom"
import { useEffect,useState } from 'react'
import Cookies from "universal-cookie"
import DropDown from './component/dropdown'
export default function Home({index}){
    const cookie = new Cookies()
    const navigate = useNavigate()

    const handleLogout = ()=>{
        cookie.remove('token_auth')
        navigate('/')
    }
 
    return(
        <div className='w-full  z-10 my-4 top-0 bg-color-default'>
     
            <div className='max-w-[1200px] p-4 mx-auto font-semibold text-white text-lg'>
       
                <DropDown/>
            </div>
        </div>
    )
}