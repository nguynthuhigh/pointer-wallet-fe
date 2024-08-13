import React from 'react'
import SideBar from '../components/sidebar/sidebar'

const Home = () => {
  return (
    <div className='flex'>
        <SideBar state={"Manage User"}></SideBar>
        <div className='w-full'>Sidebar test</div>
    </div>
  )
}

export default Home