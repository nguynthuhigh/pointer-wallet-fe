import React from 'react'
import InputText from './input_text'
import { useState } from 'react';
import { User } from '../../types/user';
import UploadImage from './upload_image';
import DefaultAvatar from '../../assets/png/default_avatar.png'
import { editProfile } from '../../services/api/setting.api';
import { useMutation } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import Button from './button';
interface ProfileProps {
    data: User
}
const Profile: React.FC<ProfileProps> = (props) => {
    const [userData, setUserData] = useState<User>({ 
        full_name: props.data.full_name,
        email:props.data.email,
        avatar:props.data.avatar  || DefaultAvatar});
    const [image,setImage] = useState<File>()
    const handleInputChange = (field: string, value: string) => {
        setUserData((prevData) => ({ ...prevData, [field]: value }));
    };
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const {mutate} = useMutation({
        mutationFn: async (formData:any)=>{
            setIsLoading(true)
            await editProfile(formData)
        },
        onSuccess() {
            toast.success("Thay đổi thông tin thành công")
            setIsLoading(false)
        },
        onError(error:any) {
            toast.error(error.response.data.message)
            setIsLoading(false)
        },
    })
    const handleSubmit = async(e: SubmitEvent)=>{
        e.preventDefault()
        const formData = new FormData()
        if(image){
            formData.append('image',image)
        }
        formData.append('full_name',userData.full_name)
        mutate(formData)
    }
    const handleImageChange = (file:File)=>{
        setImage(file)
    }
  return (
    <form class={`mt-10 w-full`} onSubmit={handleSubmit}>
        <Toaster position='top-right'></Toaster>
        <div class={`flex w-full flex-col-reverse items-center`}>
            <div class={`w-full`}>
                <InputText
                    type='text'
                    name="Họ và tên"
                    field="full_name"
                    value={userData.full_name}
                    onChange={handleInputChange}
                    disable={false}
                    maxLength={30}
                />
                <InputText
                    type='text'
                    name="Email"
                    field="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    disable={true}
                    maxLength={30}
                />
            </div>
            <UploadImage handleImageChange={handleImageChange} image={userData.avatar}></UploadImage>
        </div>
        <Button isLoading={isLoading} name='Cập nhật'></Button>
    </form>
  )
}

export default Profile