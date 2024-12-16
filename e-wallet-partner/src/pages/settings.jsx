import React, { useState } from 'react'
import SideBar from '../components/dashboard/sidebar'
import HeaderDashboard from '../components/header/header_dashboard'
import ProfileTab from '../components/settings/profile_tab'
import SecurityTab from '../components/settings/security_tab'
const Settings = () => {
  const [isSelect,setIsSelect]= useState('profile')
  const handleSelect = (state)=>{
    setIsSelect(state)
  }
  const contentTab = ()=>{
    if(isSelect === 'profile'){
      return <ProfileTab></ProfileTab>
    }
    if(isSelect === 'security'){
      return <SecurityTab></SecurityTab>
    }
    return <h1>1</h1>
  }
  return (
    <div className='flex'>
        <SideBar state="Settings"></SideBar>
        <div className='px-5 w-full'>
          <HeaderDashboard title="Settings" description="Change your information or security"></HeaderDashboard>
          <div className='flex font-semibold'>
            <button className={`px-2 ${isSelect === 'profile' && 'border-b-2 border-blue-700 text-blue-700 '}`} onClick={()=>{handleSelect('profile')}}>Edit Profile</button>
            <button className={`px-2 ${isSelect === 'security' && 'border-b-2 border-blue-700 text-blue-700 '}`} onClick={()=>{handleSelect('security')}}>Security</button>
          </div>
            {contentTab()}
        </div>
    </div>
  )
}

export default Settings