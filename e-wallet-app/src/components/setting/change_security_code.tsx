import React, { useState } from 'react'
import InputText from './input_text'
import { useMutation } from '@tanstack/react-query';
import { changeSecurityCode } from '../../services/api/setting.api';
import toast from 'react-hot-toast';
import CloseIcon from '../../assets/svg/plus.svg'
type FormData = {
    old_code: string;
    new_code: string;
    confirm_code: string;
  }
interface ChangeSecurityCodeProps {
    handleOpenModal:(field:string)=> void
}
const ChangePassword:React.FC<ChangeSecurityCodeProps> = ({handleOpenModal}) => {
    const [formData,setFromData] = useState<FormData>({old_code:'',new_code:'',confirm_code:''})
    const [error,setError] = useState<string>()
    const handleInputChange = (field: string, value: string) => {
        if(field === 'confirmNewPassword'){
            if(formData.new_code !== value){
                setError("Mật khẩu mới không khớp")
            }
            else{
                setError('')
            }
        }
        setFromData((prevData) => ({ ...prevData, [field]: value }));
    };
    const {mutate} = useMutation({
        mutationFn: async(formData:FormData)=>{
            await changeSecurityCode(formData)
        },
        onSuccess: ()=>{
            toast.success("Đổi mật khẩu thành công")
            return handleOpenModal('security_code')
        },
        onError: (error:any)=>{
            toast.error(error.response.data.message)
        }
    })
    const handleSubmit = (e:Event)=>{
        e.preventDefault()
        if(!formData.new_code || !formData.old_code || !formData.confirm_code){
            return toast.error("Vui lòng nhập mật khẩu.")
        }
        if(!formData.new_code || !formData.old_code || !formData.confirm_code){
            return toast.error("Mã bảo mật phải có 6 ký tự là chữ số.")
        }
        if(error){
            return toast.error("Mật khẩu không khớp vui lòng nhập lại.")
        }
        mutate(formData)
    }
    return (
        <div class={`bg-white p-4 border rounded-3xl font-semibold w-full max-w-2xl`}>
             <div class={`flex `}>
                <div>
                <h1 class={`text-xl`}>Đổi mã bảo mật</h1>
                <h1 class={`text-gray-400`}>Mã bảo mật của bạn phải có 6 ký tự là chữ số.</h1>
                </div>
                <button onClick={()=>{handleOpenModal('security_code')}} class={`bg-gray-200 w-fit h-fit p-1 ml-2 rounded-full`}><img class='rotate-45 ' src={CloseIcon}></img></button>
            </div>
            <form onSubmit={handleSubmit}>
            <InputText
                name="Mã bảo mật cũ"
                field="old_code"
                value={formData.old_code}
                onChange={handleInputChange}
                disable={false}
                type='password'
                pattern="[0-9]*"
                maxLength={6}
            />
            <InputText
                name="Mã bảo mật mới"
                field="new_code"
                value={formData.new_code}
                onChange={handleInputChange}
                disable={false}
                type='password'
                pattern="[0-9]*"
                maxLength={6}
            />
            <h1 class={`font-semibold text-red-500`}>{error}</h1>
            <InputText
                name="Xác mã bảo mật mới"
                field="confirm_code"
                value={formData.confirm_code}
                onChange={handleInputChange}
                disable={false}
                type='password'
                pattern="[0-9]*"
                maxLength={6}
            />
            <div class={`my-2 w-full`}>
                <button type={'submit'}  class={`w-full font-semibold text-sm bg-blue-default text-white p-3 rounded-full`}>Đổi mã bảo mật </button>
            </div>
        </form>
    </div>
  )
}

export default ChangePassword