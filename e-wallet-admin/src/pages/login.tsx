import bgLogin from '../assets/png/BgLogin.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BoxInput } from '@/components/box/box-input';
import { LoaderCircle, Lock, Mail } from 'lucide-react';
import {motion} from 'framer-motion'
import toast from 'react-hot-toast';

const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const isLoading = true;
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailADM = 'namsang0902s@gmail.com';
        const passADM = '3210794685zA';
        if (email === emailADM && password === passADM){
            navigate('./dashboard');
            toast.success('Đăng nhập thành công')
        }

    }


    return (
        <>
        <div id="bg" className="text-white w-full px-[30px] flex flex-col justify-center bg-cover" style={{backgroundImage: `url(${bgLogin})`}}>
            <div className='flex mt-[50px] justify-between'>
            <div className="flex justify-center items-center mx-auto">
                <div className='w-[500px]'>
                    <div className='bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50 relative '>
                        <h1 className='text-[36px] font-bold mb-[5px] text-[#0094FF] text-left'>Welcome Back !</h1>
                        <p className='text-[18px] opacity-50 mb-[20px] text-white text-left'>Please enter your acount details</p>
                        <form onSubmit={handleLogin}>
                            <BoxInput
                                icon={Mail}
                                type= 'text'
                                name='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <BoxInput
                                icon={Lock}
                                type= 'password'
                                name='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale:0.95}}
                                className='bg-blue-500 w-full text-white px-5 py-2 rounded-lg outline-none'
                                type='submit'
                                disabled={isLoading}
                            >
                                {!isLoading ? <LoaderCircle className='size-6 animate-spin mx-auto'/> : 'Login'}
                            </motion.button>
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
