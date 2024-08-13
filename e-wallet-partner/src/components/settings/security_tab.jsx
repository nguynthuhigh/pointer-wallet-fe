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
    <form className='space-y-4 p-4 w-full max-w-[200px]'>
      <InputField title='Old password'></InputField>
      <InputField title='New password'></InputField>
      <InputField title='Confirm new password'></InputField>
      <button type='submit' className=' mt-2 font-semibold text-sm bg-gray-50 hover:bg-gray-100 border p-1.5 rounded-lg'>Update password</button>
    </form>
  )
}

export default SecurityTab