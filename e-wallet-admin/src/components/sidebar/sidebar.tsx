import { useState } from "react"
import { AnimatePresence, motion } from 'framer-motion'
import { ISidebarItems } from "@/interfaces/sidebar-items"
import { BarChart2, Users, Settings, MenuIcon, Handshake, TicketPercent, DollarSign } from 'lucide-react'
import LogoPressPay from '../../assets/png/Logo.png'
import LogoP from '../../assets/png/LogoP.png'
import { Link, useLocation } from "react-router-dom"
export const SideBar = () => {
    const SideBarItems: ISidebarItems[] = [
        {
            name: 'Dashboard', icon: BarChart2, color: '#6366f1', path: '/dashboard'
        },
        {
            name: 'Customers', icon: Users, color: '#ec4899', path: '/customer-list'
        },
        {
            name: 'Partners', icon: Handshake, color: '#3b82f6', path: '/partner-list'
        },
        {
            name: 'Vouchers', icon: TicketPercent, color: '#f59e0b', path: '/voucher-list'
        },
        {
            name: 'Transactions', icon: DollarSign, color: '#10b981', path: '/transaction-list'
        }
    ]
    const location = useLocation()
    const [isSideBarOpen, setIsSideBarOpen] = useState(true)
    return (
        <>
            <motion.div
                className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSideBarOpen ? 'w-60' : 'w-20'}`}
                animate={{ width: isSideBarOpen ? 'w-60' : 'w-20' }}
            >
                <div className="h-full bg-gray-800 bg-opacity-70 backdrop-blur-md p-4 flex flex-col border-r border-gray-700 shadow-lg">
                    <div id="Logo" className='flex justify-center items-center'>
                        {isSideBarOpen
                            ? (<img src={LogoPressPay} className="h-[50px]" />)

                            : (<div className="flex items-center ">
                                <img src={LogoP} className=" size-[50px]" />
                            </div>)
                        }
                    </div>
                    <div id="Menu" className="flex justify-center items-center my-3">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                            className="p-2 rounded-full hover:bg-gray-300 transition-colors duration-300 max-w-fit"
                        >
                            <MenuIcon />
                        </motion.button>
                    </div>

                    <nav>
                        {SideBarItems.map(items => (
                            <Link key={items.path} to={items.path}>
                                <motion.div
                                    whileHover={{ x: 10 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`flex items-center text-md px-2 py-4 font-medium rounded-lg  transition-colors duration-300 mb-2 
                                    ${location.pathname === items.path ? 'bg-gray-200' : 'hover:bg-gray-500'}
                                    ${!isSideBarOpen ? 'justify-center' : ''}`
                                    }
                                >
                                    <items.icon 
                                        style={{ color: items.color, minWidth: '20px' }} />
                                    <AnimatePresence>
                                        {isSideBarOpen && (
                                            <motion.span
                                                className="ml-4 whitespace-nowrap text-gray-400"
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                transition={{ duration: 0.2, delay: 0.3 }}
                                            >
                                                {items.name}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </Link>
                        ))}
                    </nav>
                </div>
            </motion.div>
        </>
    )
}