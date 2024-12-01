import { useState } from 'react';
import { InputBox } from '@/components/box/box-input';
import { LoaderCircle, Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { loginAdmin } from '@/api/login.api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' });
import bgLogin from '../assets/png/BgLogin.png'
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationKey: ['login-admin'],
        mutationFn: () => loginAdmin({
            email: email,
            password: password
        }),
        onSuccess: (data) => {
            setTimeout(() => {
                setIsLoading(false)
                navigate('/dashboard')
                toast.success('Đăng nhập thành công!')
            },1500)
            cookies.set('token', data.data.token)
        },
        onError: () => {
            setIsLoading(false)
            toast.error('Đăng nhập thất bại')
        }
    })

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        mutation.mutate();
    }

    
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ backgroundImage: `url(${bgLogin})` }}
                className="w-full h-screen bg-cover flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
            >
                <div className="p-8 border border-gray-400 rounded-lg w-[400px] bg-gray-700 bg-opacity-50">
                    <p className="text-4xl font-medium mb-3 text-center bg-gradient-to-r from-blue-400 to-sky-500 text-transparent bg-clip-text ">
                        Welcome Back!
                    </p>
                    <p className='mb-4 text-center text-lg'>Enter your account details</p>
                    <form onSubmit={handleLogin}>
                        <InputBox
                            name='Email'
                            type="text"
                            icon={Mail}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputBox
                            name='Password'
                            type="password"
                            icon={Lock}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <motion.button
                            className=' w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-sky-600 text-white
                                font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 focus:outline-none focus:ring-2
                                focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading 
                            ? (
                                <div>
                                    <LoaderCircle className="size-6 animate-spin mx-auto" />
                                </div>
                            ) 
                            : (
                                'Login'
                            )}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
            <Toaster />
        </>
    );
}
export default Login;
