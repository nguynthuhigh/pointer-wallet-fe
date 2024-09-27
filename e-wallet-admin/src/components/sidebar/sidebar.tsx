import { useState } from 'react'
import SideBarPart from './sidebar_part'
import Logo from "../../assets/png/logo.png";
import { RxDashboard } from "react-icons/rx";
import { LuUser } from "react-icons/lu";
import { PiTicketBold } from "react-icons/pi";
import { FaHandshake } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";

const SideBar = ({...props}) => {
    const [selected, setSelected] = useState<string>(props.state)
    const handleSelect = (state: string) => {
        setSelected(state)
    }
    return (
        <div className='max-w-[270px] bg-white border-r-4 h-screen flex flex-col'>
            <div id="Logo" className='flex justify-center cursor-pointer mt-[20px] mb-[16px]'>
                <img src={Logo} className='w-max h-[60px]' />
            </div>
            <div className='flex flex-col w-full gap-y-[16px] px-[20px] flex-grow'>
                <SideBarPart link='/dashboard' selected={selected} handleSelect={() => { handleSelect('Dashboard') }} name='Dashboard' icon={<RxDashboard size={24} />} />
                <SideBarPart link='/listUser' selected={selected} handleSelect={() => { handleSelect('Users') }} name='Users' icon={<LuUser size={24} />} />
                <SideBarPart link='/listVoucher' selected={selected} handleSelect={() => { handleSelect('Vouchers') }} name='Vouchers' icon={<PiTicketBold size={24} />} />
                <SideBarPart link='/listPartner' selected={selected} handleSelect={() => { handleSelect('Partners') }} name='Partners' icon={<FaHandshake size={24} />} />
                <div className='mt-auto'>
                <SideBarPart link='/LoginAdmin' selected ={selected} handleSelect ={() => handleSelect('LoginAdmin')} name = 'Logout' icon = {<TbLogout2 size = {24}/>}/> 
                </div>
            </div>
        </div>
    )
}

export default SideBar
