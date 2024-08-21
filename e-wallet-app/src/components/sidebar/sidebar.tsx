import React, { useState } from 'react'
import SideBarPart from './sidebar_part'
import Icon from '../../assets/svg/send_money.svg'
const SideBar = ({...props}) => {
    const [selected,setSelected] = useState<string>(props.state)
    const handleSelect = (state:string)=>{
        setSelected(state)
    }
    return (
    <div className='max-w-[250px] mt-2 rounded-r-lg border w-full h-full bg-white pr-4 max-lg:hidden shadow-lg mr-2'>
        <img ></img>
        <SideBarPart link='/' selected={selected} handleSelect = {()=>{handleSelect('Trang chủ')}} name='Trang chủ' icon={Icon}></SideBarPart>
        <SideBarPart link='/transfer' selected={selected} handleSelect = {()=>{handleSelect('Chuyển tiền')}} name="Chuyển tiền" icon={Icon}></SideBarPart>
        <SideBarPart link='/dashboard' selected={selected} handleSelect = {()=>{handleSelect('Cài đặt')}} name='Thanh toán' icon={Icon}></SideBarPart>
        <SideBarPart link='/dashboard' selected={selected} handleSelect = {()=>{handleSelect('Thông tin thẻ')}} name='Thông tin thẻ' icon={Icon}></SideBarPart>
        <SideBarPart link='/dashboard' selected={selected} handleSelect = {()=>{handleSelect('Dashboard')}} name='Cài đặt' icon={Icon}></SideBarPart>
        <SideBarPart link='/dashboard' selected={selected} handleSelect = {()=>{handleSelect('Dashboard')}} name='Dashboard' icon={Icon}></SideBarPart>
        <SideBarPart link='/dashboard' selected={selected} handleSelect = {()=>{handleSelect('Dashboard')}} name='Dashboard' icon={Icon}></SideBarPart>

    </div>
  )
}

export default SideBar