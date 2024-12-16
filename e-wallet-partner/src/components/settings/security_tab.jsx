import React from 'react'
import InputField from './input_field'
import { useState } from 'react'
const SecurityTab = () => {
  const [data,setData] = useState({email:'',name:'',description:''})
  const handleChange = (e)=>{
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }
  return (
    <form className='space-y-[20px] lg:w-[300px] mt-3'>
      <InputField title='Old password'></InputField>
      <InputField title='New password'></InputField>
      <InputField title='Confirm new password'></InputField>
      <button type='submit' className='font-semibold text-md hover:bg-blue-400 hover:text-white border border-gray-300 px-5 py-2 rounded-[6px]'>Update profile</button>
    </form>
  )
}

export default SecurityTab