import React, { useState } from 'react'
import SideBarPart from './sidebar_part'
import UserIcon from '../../assets/svg/user.svg'
const SideBar = ({...props}) => {
    const [selected,setSelected] = useState<string>(props.state)
    const handleSelect = (state:string)=>{
        setSelected(state)
    }
    return (
    <div className='max-w-[220px] w-full'>
        <SideBarPart link='/test' selected={selected} handleSelect = {()=>{handleSelect('Manage User')}} name="Manage User" icon={UserIcon}></SideBarPart>
        <SideBarPart link='/dashboard' selected={selected} handleSelect = {()=>{handleSelect('Dashboard')}} name='Dashboard' icon={UserIcon}></SideBarPart>
    </div>
  )
}

export default SideBar