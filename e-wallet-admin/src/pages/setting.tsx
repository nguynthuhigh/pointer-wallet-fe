import { HeaderComponent } from '@/components/header/header'
import AdminAvatar from '../assets/png/Admin.jpg'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { getAdmin } from '@/api/login.api'
export const Setting = () => {
    const {data,isLoading,isError} = useQuery({
        queryKey: ['get-admin-info'],
        queryFn: () => getAdmin()
    })
    console.log(data)
    if(isLoading) return 'Loading...'
    if (isError) return 'Fetching data error'
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
                                    <div className="bg-transparent w-full border px-5 py-3 rounded-[6px] border-gray-700">
                                    {data.data[0].role}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="space-y-[10px]">
                                <p className="text-gray-400 font-medium text-lg">Profile Name</p>
                                <div className="flex items-center space-x-[20px]">
                                    <div  className="bg-transparent w-full border px-5 py-3 rounded-[6px] border-gray-700 outline-none focus:border-blue-500">
                                        {data.data[0].role}
                                    </div>
                                </div>
                            </div> */}
                            <div className="space-y-[10px]">
                                <p className="text-gray-400 font-medium text-lg">Image</p>
                                <div className="flex items-center space-x-[20px]">
                                    <div className="bg-transparent w-full border px-5 py-3 rounded-[6px] border-gray-700 outline-none focus:border-blue-500">
                                    {data.data[0].email}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="space-y-[10px] flex justify-end">
                                <button className="bg-gray-600 hover:bg-blue-500 text-gray-100 px-5 py-3 rounded-[6px] font-medium transition-colors duration-300 ">Save changes</button>
                            </div> */}
                        </div>
                    </motion.div>

                </main>
            </div>
        </>
    )
}