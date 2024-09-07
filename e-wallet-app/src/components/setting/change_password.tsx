import React, { useState } from 'react'
import InputText from './input_text'

const ChangePassword:React.FC = () => {
    const [formData,setFromData] = useState({oldPassword:'',newPassword:'',confirmNewPassword:''})
    const handleInputChange = (field: string, value: string) => {
        setFromData((prevData) => ({ ...prevData, [field]: value }));
    };
    return (
        <form class={`bg-white p-4 border rounded-3xl font-semibold w-full max-w-2xl`}>
            <h1 class={`text-xl`}>Đổi mật khẩu</h1>
            <h1 class={`text-gray-400`}>Mật khẩu của bạn phải có tối thiểu 6 ký tự, đồng thời bao gồm cả chữ số, chữ cái và ký tự đặc biệt (!$@%).</h1>
            <InputText
                name="Mật khẩu cũ"
                field="oldPassword"
                value={formData.oldPassword}
                onChange={handleInputChange}
                disable={false}
                type='password'
            />
            <InputText
                name="Mật khẩu mới"
                field="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                disable={false}
                type='password'
            />
            <InputText
                name="Xác nhận mật khẩu mới"
                field="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleInputChange}
                disable={false}
                type='password'
            />
            <div class={`my-2 w-full`}>
                <button type={'submit'}  class={`w-full font-semibold text-sm bg-blue-default text-white p-3 rounded-full`}>Đổi mật khẩu</button>
            </div>
    </form>
  )
}

export default ChangePassword