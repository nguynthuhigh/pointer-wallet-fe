import React from 'react'
import InputText from './input_text'
import { useState } from 'react';
import { User } from '../../types/user';
import UploadImage from './upload_image';

const Profile: React.FC = ({...props}) => {
    const [userData, setUserData] = useState<User>({ full_name: '',email:'12312',avatar:'https://cdn.popsww.com/blog/sites/2/2021/03/nobita-khoc-loc-1920x1080.jpg' });
    const [image,setImage] = useState<File>()
    const handleInputChange = (field: string, value: string) => {
        setUserData((prevData) => ({ ...prevData, [field]: value }));
    };
    const handleSubmit = (e: SubmitEvent)=>{
        e.preventDefault()
        const formData = new FormData()
        if(image){
            formData.append('image',image)
        }
        formData.append('full_name',userData.full_name)
        formData.append('image',userData.email)
        console.log(formData.get('image'))
    }
    const handleImageChange = (file:File)=>{
        setImage(file)
    }
  return (
    <form class={`mt-10 w-full`} onSubmit={handleSubmit}>
        <div class={`flex w-full flex-col-reverse items-center`}>
            <div class={`w-full`}>
                <InputText
                    type='text'
                    name="Họ và tên"
                    field="full_name"
                    value={userData.full_name}
                    onChange={handleInputChange}
                    disable={false}
                />
                <InputText
                    type='text'
                    name="Email"
                    field="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    disable={true}
                />
            </div>
            <UploadImage handleImageChange={handleImageChange} image={userData.avatar}></UploadImage>
        </div>
        <button  class={`mr-auto font-semibold text-sm bg-blue-default text-white p-2 rounded-lg`}>Cập nhật</button>
    </form>
  )
}

export default Profile