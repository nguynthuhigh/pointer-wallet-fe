import bgLogin from '../assets/png/BgLogin.png';
import logoP from '../assets/png/LogoP.png';
import logo from '../assets/png/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineLock } from "react-icons/md";
import { FaRegRegistered } from "react-icons/fa6";
import { useState } from 'react';


const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailADM = 'namsang0902s@gmail.com';
        const passADM = '3210794685zA';

        if (email === emailADM && password === passADM){
            navigate('./dashboard');
        }
    }

    return (
        <>
        <div id="bg" className="text-white h-[100vh] px-[30px] flex flex-col bg-cover" style={{backgroundImage: `url(${bgLogin})`}}>
           <div className='flex justify-between items-center '>
            <div className='flex items-center justify-center flex-1'>
                <div id='LogoP' className=' flex-shrink-0'>
                        <div style={{backgroundImage: `url(${logoP})`}} className="size-[150px] bg-no-repeat bg-contain "></div>
                    </div>
                    <div id="Logo" className=' flex-shrink-0' >
                        <div style={{backgroundImage: `url(${logo})`}} className='w-[500px] h-[120px] bg-no-repeat bg-contain'></div>
                    </div>
            </div> 
            <div id="nav" className='text-[30px] text-black cursor-pointer font-poppins flex-1 flex justify-center'>
                <ul className='flex gap-20'>
                    <li className='relative group'>
                        <span className='py-1 pb-2 transition-transform duration-300 group-hover:translate-y-[-10px] block hover:text-[#FFFFFF]'>Home</span>
                        <div className=' absolute bottom-[-8px] right-0 left-0 bg-[#FFFFFF] h-[8px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300'></div>
                    </li>                  
                    <li className=' relative group'>
                        <span className='py-1 pb-2 transition-transform duration-300 group-hover:translate-y-[-10px] block hover:text-[#FFFFFF]'>About</span>
                        <div className=' absolute bottom-[-8px] right-0 left-0 bg-[#FFFFFF] h-[8px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300'></div>
                    </li>
                    <li className=' relative group'>
                        <span className='py-1 pb-2 transition-transform duration-300 group-hover:translate-y-[-10px] block hover:text-[#FFFFFF]'>Services</span>
                        <div className=' absolute bottom-[-8px] right-0 left-0 bg-[#FFFFFF] h-[8px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300'></div>
                    </li>
                    <li className=' relative group'>
                        <span className='py-1 pb-2 transition-transform duration-300 group-hover:translate-y-[-10px] block hover:text-[#FFFFFF]'>Contact Us</span>
                        <div className=' absolute bottom-[-8px] right-0 left-0 bg-[#FFFFFF] h-[8px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300'></div>
                    </li>
                </ul>
            </div>
            </div>
            <div className='flex mt-[50px] justify-between'>
            <div className='w-1/2 font-merryweather text-[100px] flex justify-center items-center flex-col'>
                <span className='font-poppins'>THE</span>
                <span className='text-[#0094FF]'>POINTER</span>
                <div className='flex items-center gap-x-[8px]'>
                    <span className='font-poppins'>WALLET</span>
                    <FaRegRegistered className='text-[40px]'/>
                </div>
                <span className='text-[32px] text-[#0094FF] font-poppins '>/ Administrator / </span>
            </div>
            <div className="flex justify-center items-center mx-auto">
                <div className='w-[500px]'>
                    <div className='bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50 relative '>
                        <h1 className='text-[36px] font-bold mb-[5px] text-[#0094FF] text-left font-poppins'>Welcome Back !</h1>
                        <p className='text-[18px] opacity-50 mb-[20px] text-white text-left font-poppins'>Please enter your acount details</p>
                        <form onSubmit ={handleLogin}action="" className='h-[350px]'>
                            <div className='relative my-6 font-poppins'>
                                <input type="email" id ='emailADM' placeholder=' ' onChange = {(e) => setEmail(e.target.value)}className='block w-full py-2 px-0 text-[20px] text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' />
                                <label htmlFor="" className=' absolute text-[20px] text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Email</label>
                                <HiOutlineMail className=' absolute top-4 right-4 size-[24px]'/>
                            </div>
                            <div className='relative my-6'>
                                <input type="password" id ='passwordADM' placeholder=' ' onChange ={(e) => setPassword(e.target.value)}className='block w-full py-2 px-0 text-[20px] text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' />
                                <label htmlFor="" className=' absolute text-[20px] text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Password</label>
                                <MdOutlineLock className=' absolute top-4 right-4 size-[24px]'/>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-2 items-center'>
                                    <input type="checkbox" name="" id="" className='size-5 rounded-full appearance-none border-2 border-gray-300 checked:bg-[#0094FF] checked:border-white focus:outline-none'/>
                                    <label htmlFor="Remember Me" className='text-[16px]'>Remember Me</label>
                                </div>
                                <Link to='' className='text-[#0094FF] text-[16px] '>Forgot Password?</Link>
                            </div>
                            <button type='submit' className='w-full bg-[#0094FF] text-[24px] text-white mb-4 mt-6 rounded-[16px] py-2 hover:bg-[#D9EFFF] hover:text-[#0094FF] transition-colors duration-300'>Login</button>
                            <div className='text-center mt-[15px] text-[20px]'>
                                <span>Don't have an account yet? <Link to ='' className='text-[#0094FF]'>Sign Up</Link></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}
export default Login;
