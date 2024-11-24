import { HeaderComponent } from '@/components/header/header'
import AdminAvatar from '../assets/png/Admin.jpg'
import { motion } from 'framer-motion'
export const Setting = () => {
    return (
        <>
            <div className="flex-1">
                <HeaderComponent title="Setting" />
                <main className="max-w-7xl mx-auto px-4 py-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1}}
                        className="bg-gray-800 backdrop-opacity-70 backdrop-blur-md px-5 py-6 rounded-[6px] ">
                        <div className="flex flex-col space-y-[20px]">
                            <div className="space-y-[10px]">
                                <p className="text-gray-400 font-medium text-lg">Profile Picture</p>
                                <div className="flex items-center space-x-[20px]">
                                    <img src={AdminAvatar} className="rounded-full size-[100px]" />
                                    <button className="bg-blue-500 text-gray-100 px-5 py-3 rounded-[6px] font-medium">Change Picture</button>
                                </div>
                            </div>
                            <div className="space-y-[10px]">
                                <p className="text-gray-400 font-medium text-lg">Role</p>
                                <div className="flex items-center space-x-[20px]">
                                    <input type="text" placeholder="Admin" disabled={true} className="bg-transparent w-full border px-5 py-3 rounded-[6px] border-gray-700" />
                                </div>
                            </div>
                            <div className="space-y-[10px]">
                                <p className="text-gray-400 font-medium text-lg">Profile Name</p>
                                <div className="flex items-center space-x-[20px]">
                                    <input type="text" placeholder="Admin" className="bg-transparent w-full border px-5 py-3 rounded-[6px] border-gray-700 outline-none focus:border-blue-500" />
                                </div>
                            </div>
                            <div className="space-y-[10px]">
                                <p className="text-gray-400 font-medium text-lg">Email</p>
                                <div className="flex items-center space-x-[20px]">
                                    <input type="text" placeholder="@gmail.com" className="bg-transparent w-full border px-5 py-3 rounded-[6px] border-gray-700 outline-none focus:border-blue-500" />
                                </div>
                            </div>
                            <div className="space-y-[10px] flex justify-end">
                                <button className="bg-gray-600 hover:bg-blue-500 text-gray-100 px-5 py-3 rounded-[6px] font-medium transition-colors duration-300 ">Save changes</button>
                            </div>
                        </div>
                    </motion.div>

                </main>
            </div>
        </>
    )
}