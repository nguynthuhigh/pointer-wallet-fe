import React, { useState } from 'react'
import InputField from './input_field'
const ProfileTab = () => {
  const [data,setData] = useState({email:'',name:'',description:''})
  const handleChange = (e)=>{
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }
  const handleUpdateProfile = (e)=>{
    e.preventDefault()
    console.log(123)
  }
  return (
    <form className='p-4' onSubmit={handleUpdateProfile}> 
      <div className=' flex w-full max-w-[900px]'>
        <div className='space-y-5'>
          <InputField value={data.name} onChange={handleChange} name="name" title="Name"></InputField>
          <InputField value={data.email} disable="disable" title="Email"></InputField>
          <div>
            <h1 className='block text-sm font-semibold mb-2'>Descriptions</h1>
            <textarea value={data.description} onChange={handleChange} name='description' className=' border border-gray-300 rounded-lg p-2'></textarea>
          </div>
        </div>
        <button type='upload' className='relative ml-auto'>
          <img
            alt=""
            className="object-cover  cursor-pointer rounded-full h-48 w-48"
            src="https://upload.wikimedia.org/wikipedia/commons/3/3c/V_in_the_Oval_Office_of_the_White_House%2C_May_31%2C_2022_%28cropped%29.jpg"
          />
          <img className='absolute  w-5' alt='' src='https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png'></img>
        </button>
        </div>
        <button type='submit' className='font-semibold text-sm bg-gray-50 hover:bg-gray-100 border p-1.5 rounded-lg'>Update profile</button>

    </form>
   
  )
}

export default ProfileTab