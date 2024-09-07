import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import ChangePassword from './change_password';
import ChangeSecurityCode from './change_security_code';
import Select from './select';
const Security:React.FC = () => {
  const [isOpen,setIsOpen] = useState({password:false,security_code:false})
  const handleOpenModal = (field:string)=>{
    setIsOpen((prevState)=>({...prevState,[field]:!prevState[field as keyof typeof prevState]}))
  }
  return (
    <div class={`font-semibold mt-5 h-fit`}>
     <div class={`space-y-2`}>
        <h1 class={`text-lg`}>Đăng nhập</h1>
        <h1 class={`text-sm font-medium text-gray-500`}>Quản lý đổi mật khẩu, mã bảo mật.</h1>
        <div class={`border p-2 rounded-lg  `}>
          <Select name='Đổi mật khẩu' handleOpenModal={handleOpenModal} field='password'></Select>
          <Popup  modal={true} open={isOpen.password}>
            <ChangePassword></ChangePassword>
          </Popup>
          <Select handleOpenModal={handleOpenModal} name='Đổi mã bảo mật' field='security_code'></Select>
          <Popup  modal={true} open={isOpen.security_code}>
            <ChangeSecurityCode/>
          </Popup>
        </div>
     </div>
     <div class={`space-y-2 mt-5`}>
        <h1 class={`text-lg`}>Kiểm tra bảo mật</h1>
        <h1 class={`text-sm font-medium text-gray-500`}>Các thiết bị đã đăng nhập</h1>
        <div class={`border p-2 rounded-lg`}>
          soon...
        </div>
      </div>
    </div>
  )
}

export default Security