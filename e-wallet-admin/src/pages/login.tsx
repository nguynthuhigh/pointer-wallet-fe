import { useState } from 'react';
import {  InputBox } from '@/components/box/box-input';
import { LoaderCircle, Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { loginAdmin } from '@/api/login.api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationKey: ['login-admin'],
        mutationFn: () => loginAdmin({
            email: email,
            password: password
        }),
        onSuccess: (data) => {
            Cookies.set('token',data.data.token)
        }
    })

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        setTimeout(() => {
            mutation.mutate();
            toast.success('Đăng nhập thành công!')
            setIsLoading(false)
            navigate('/dashboard')

        },2000)
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="w-full flex items-center justify-center  bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
            >
                <div className="p-8 border rounded-lg w-[400px]">
                    <p className="text-3xl font-medium mb-6 text-center bg-gradient-to-r from-blue-400 to-sky-500 text-transparent bg-clip-text">
                        Welcome Back!
                    </p>
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
                            className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-sky-600 text-white
                                font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 focus:outline-none focus:ring-2
                                focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? <LoaderCircle className="size-6 animate-spin mx-auto" /> : 'Login'}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
            <Toaster />
        </>
    );
}
export default Login;
