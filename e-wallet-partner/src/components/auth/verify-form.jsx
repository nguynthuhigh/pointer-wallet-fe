import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import { Loading } from "./loading"
export default function VerifyForm(){
    const [isLoading,setIsLoading] = useState(false)
    const location = useLocation()
    const [errorShow,setErrorShow] = useState(null)
    const {infoUser} = location.state || {}
    const navigate = useNavigate()
    
    const cookies = new Cookies()
    const [verifyInfo,setVerifyInfo] = useState({otp:'',email:infoUser.email})
    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === 'otp' &&value.length <=6){
            setVerifyInfo({
                ...verifyInfo,
                [name]: value,
            });
        }
    };
    const handleVerify =async (e)=>{
        setIsLoading(true)
        e.preventDefault()
        try {
            const response =await axios.post(process.env.REACT_APP_LOCAL_HOST + '/api/v1/partner/verify',verifyInfo,{
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            if(response.status === 200){
                cookies.set('token_auth',response.data.data)
                navigate('/dashboard')
                
            }
        } catch (error) {
            setIsLoading(false)
            setErrorShow(error.response.data.message)
        }
    }
    return(
        <main class="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
        <div class="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
            <div class="flex justify-center">

                <div class="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
                    <header class="mb-8">
                        <h1 class="text-2xl font-bold mb-1">We have sent OTP to </h1><h1 className="text-color-default font-semibold">{infoUser.email}</h1>
                        <p class="text-[15px] font-semibold text-gray">Enter the 6 digits you received from the email</p>
                    </header>
                    <p className="text-red-500 mb-2">{errorShow}</p>
                    <form id="otp-form" onSubmit={handleVerify}>
                        <div class="flex items-center justify-center gap-3">
                            <input
                                name='otp'
                                type="text"
                                class="w-[60%] h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                pattern="\d*" maxlength="6" 
                                placeholder="••••••"
                                value={verifyInfo.otp}
                                onChange={handleChange}/>
                        </div>
                        <div class="max-w-[260px] mx-auto mt-4">
                            {isLoading ? <button disabled type="submit"
                                class="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-gray-200 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-blue-bold focus:outline-none focus:ring focus:ring-black focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150">
                                <Loading/></button> :   <button type="submit"
                                class="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-color-default px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-blue-bold focus:outline-none focus:ring focus:ring-black focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150">
                                Confirm</button>}
                        </div>
                    </form>
                    <div class="text-sm text-slate-500 mt-4">Didn't receive OTP? <a class="font-medium text-color-default hover:text-indigo-600" href="#0">resend</a></div>
                </div>

            </div>
        </div>
    </main>
    )
}