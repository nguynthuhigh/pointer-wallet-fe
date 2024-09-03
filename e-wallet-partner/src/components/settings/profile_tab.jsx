import React, { useState } from 'react'
import InputField from './input_field'
import UploadImage from './upload_image'
import { useMutation } from '@tanstack/react-query'
import { updateProfile } from '../../api/setting.api'
import toast, { Toaster } from 'react-hot-toast'
const ProfileTab = () => {
  const [data,setData] = useState({email:'',name:'',description:''})
  const [imageData, setImageData] = useState(null)
  const handleChange = (e)=>{
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }
  const handleImageChange = (file) =>{
    setImageData(file); 
  }
  const mutation = useMutation({
    mutationFn:async (formData)=>{
      console.log(formData)
      await updateProfile(formData)
    },
    onSuccess: () => {
      toast.success("Update Success!");
    },
    onError: () => {
      toast.error("Update Fail!");
    }
  })
  const handleUpdateProfile = (e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('image',imageData)
    formData.append('name',data.name)
    formData.append('description',data.description)
    mutation.mutate(formData)
  }
  return (
    <form className='p-4' onSubmit={handleUpdateProfile}> 
      <Toaster position='top-right'></Toaster>
      <div className=' flex w-full max-w-[900px]'>
        <div className='space-y-5'>
          <InputField value={data.name} onChange={handleChange} name="name" title="Name"></InputField>
          <InputField value={data.email} disable="disable" title="Email"></InputField>
          <div>
            <h1 className='block text-sm font-semibold mb-2'>Descriptions</h1>
            <textarea value={data.description} onChange={handleChange} name='description' className=' border border-gray-300 rounded-lg p-2'></textarea>
          </div>
        </div>
        <UploadImage handleImageChange={handleImageChange}></UploadImage>
        </div>
        <button type='submit' className='font-semibold text-sm bg-gray-50 hover:bg-gray-100 border p-1.5 rounded-lg'>Update profile</button>

    </form>
   
  )
}

export default ProfileTab