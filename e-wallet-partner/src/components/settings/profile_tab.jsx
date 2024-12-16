import React, { useState } from 'react'
import InputField from './input_field'
import UploadImage from './upload_image'
import { useMutation } from '@tanstack/react-query'
import { updateProfile } from '../../api/setting.api'
import toast, { Toaster } from 'react-hot-toast'
const ProfileTab = () => {
  const [data, setData] = useState({ email: '', name: '', description: '' })
  const [imageData, setImageData] = useState(null)
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }
  const handleImageChange = (file) => {
    setImageData(file);
  }
  const mutation = useMutation({
    mutationFn: async (formData) => {
      console.log(formData.get('image'))
      await updateProfile(formData)
    },
    onSuccess: () => {
      toast.success("Update Success!");
    },
    onError: () => {
      toast.error("Update Fail!");
    }
  })
  const handleUpdateProfile = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', imageData)
    formData.append('name', data.name)
    formData.append('description', data.description)
    mutation.mutate(formData)
  }
  return (
    <form className='mt-3' onSubmit={handleUpdateProfile}>
      <Toaster/>
      <div className='space-y-[20px] lg:w-[300px]'>
        <UploadImage handleImageChange={handleImageChange}></UploadImage>
        <InputField value={data.name} onChange={handleChange} name="name" title="Name"></InputField>
        <div>
          <h1 className='block text-md font-semibold mb-1'>Descriptions</h1>
          <textarea value={data.description} onChange={handleChange} name='description' className=' border border-gray-300 rounded-[6px] p-2 w-full'></textarea>
        </div>
        <button type='submit' className='font-semibold text-md hover:bg-blue-400 hover:text-white border border-gray-300 px-5 py-2 rounded-[6px]'>Update profile</button>
      </div>
      
    </form>

  )
}

export default ProfileTab