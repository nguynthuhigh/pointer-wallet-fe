import React from 'react'

const UserInfo = () => {
  return (
    <div class={`border rounded-xl p-4`}>
    <div>
        <h1  class={`text-gray-400`}>Mô tả</h1>
        <h1>12312312 ABCDASDA</h1>
      </div>
      <hr></hr>
      <div>
        <h1  class={`text-gray-400`}>Thông tin giao dịch</h1>
          <div class={`flex items-center justify-between my-3`}>
            <h1>Mã giao dịch</h1>
            <h1>123123123123</h1>
          </div>  
        <div class={`flex items-center justify-between my-3`}>
          <h1>Người nhận </h1>
          <h1>Nguyễn Minh Nguyên</h1>
        </div>  
        <div class={`flex items-center justify-between my-3`}>
          <h1>Email</h1>
          <h1>12312@gmail.com</h1>
        </div>
        
      </div>
      <div>
      </div>
     
    </div>
  )
}

export default UserInfo