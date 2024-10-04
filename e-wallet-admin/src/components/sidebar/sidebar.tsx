import { useState } from 'react'
import SideBarPart from './sidebar_part'
import Logo from "../../assets/png/logo.png";
import { RxDashboard } from "react-icons/rx";
import { TbUsers } from "react-icons/tb";
import { PiTicketBold } from "react-icons/pi";
import { FaHandshake } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { FaChartBar } from "react-icons/fa";
import { FaRegHandshake } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { PiMessengerLogoBold } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import Admin from '../../assets/png/Admin.jpg'
import { MdContactSupport } from "react-icons/md";
import { MdCurrencyExchange } from "react-icons/md";

const SideBar = ({...props}) => {
    const [selected, setSelected] = useState<string>(props.state)
    const handleSelect = (state: string) => {
        setSelected(state)
    }
    return (
        <div className='max-w-[270px]  bg-[#FFFFFF] border-r-[1px] h-screen fixed flex flex-col'>
            <div id="Logo" className='flex justify-center cursor-pointer mt-[20px] mb-[20px]'>
                <img src={Logo} className='w-max h-[50px]'/>
            </div>
            <div className='border-b-[3px] mx-4 rounded-[8px] mb-3'></div>
            <div className=' uppercase text-xs text-[#1A3E5F] mb-3 mx-4 font-bold'>Main menu</div>
            <div className='flex flex-col w-fit gap-y-[16px] text-md mx-[12px] text-[#ADB5BD]'>
                <SideBarPart link='/dashboard' selected={selected} handleSelect={() => { handleSelect('Chart Dashboard') }} name='Chart Dashboard' icon={<FaChartBar size={20}  />} />
                <SideBarPart link='/listUser' selected={selected} handleSelect={() => { handleSelect('Users') }} name='Users' icon={<TbUsers size={20}/>} />
                <SideBarPart link='/listVoucher' selected={selected} handleSelect={() => { handleSelect('Vouchers') }} name='Vouchers' icon={<PiTicketBold size={20}/>} />
                <SideBarPart link='/listPartner' selected={selected} handleSelect={() => { handleSelect('Partners') }} name='Partners' icon={<FaRegHandshake size={20} />} /> 
                <SideBarPart link='/listTransaction' selected={selected} handleSelect={() => { handleSelect('Transactions') }} name='Transactions' icon={<MdCurrencyExchange size={20} />} /> 

            </div>
            <div className='border-b-[3px] mx-4 rounded-[8px] mt-[20px] mb-3'></div>
            <div className=' uppercase text-xs text-[#1A3E5F] mb-3 mx-4 font-bold'>Other</div>

            <div className='flex flex-col w-fit gap-y-[16px] text-md mx-[12px] text-[#ADB5BD]'>
                <SideBarPart link='/setting' selected={selected} handleSelect={() => { handleSelect('Setting') }} name='Setting' icon={<IoMdSettings size={20}  />} />
                <SideBarPart link='/contactUs' selected={selected} handleSelect={() => { handleSelect('Administrator') }} name='Contact Us' icon={<PiMessengerLogoBold size={20}  />} />
                <SideBarPart link='/LoginAdmin' selected ={selected} handleSelect ={() => handleSelect('LoginAdmin')} name = 'Logout' icon = {<TbLogout2 size = {20}/>}/>                     
            </div>

            <div className='mt-auto'>
                <div className='flex items-center justify-center border-[1px] h-[50px] border-[#0094FF] text-black rounded-[8px] mb-3 mx-[12px] cursor-pointer'>
                    <div id='Photo' className='mr-1'>
                        <img src={Admin} className='rounded-full size-[35px] border-[1px] border-[#0094FF] object-cover'/>
                    </div>
                    <div id="NameEmail" >
                        <div className='text-sm text-[#1A3E5F]'>Super Admin</div>
                        <div className='text-[11px] text-[#0094FF]'>namsang0902s@gmail.com</div>
                    </div>
                </div>
                
            </div>
            </div>
    )
}

export default SideBar
