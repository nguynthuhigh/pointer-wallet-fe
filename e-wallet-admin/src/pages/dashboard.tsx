import React from 'react'
import SideBar from '../components/sidebar/sidebar'

const DashBoard = () => {
  return (
    <div className='flex'>
        <SideBar state="Dashboard"></SideBar>
        <div>DashBoard</div>
    </div>
  )
}

export default DashBoard