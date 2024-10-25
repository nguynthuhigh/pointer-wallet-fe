import { useState } from "react"
import {motion} from 'framer-motion'
export const SideBar1 = () => {
    const [isSideBarOpen,setIsSideBarOpen] = useState(true)
    return (
        <>
            <motion.div 
                className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSideBarOpen ? 'w-64' : 'w-20'}`}
                animate = {{width: isSideBarOpen ? 256 : 80}}     
            >       
            <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
                
            </div>

            </motion.div>
        </>
    )
}